import React, { useState, useRef, useEffect } from 'react';
import BrandingLogo from './BrandingLogo';
import { DndContext, closestCorners, useSensors, useSensor, PointerSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import menuIcon from '../assets/menu.png';
import drag from '../assets/drag.png';
import up from '../assets/up.png';
import down from '../assets/down.png';
import remove from '../assets/remove.png';

// Custom hook to detect clicks outside
function useOutsideAlerter(ref, callback) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [ref, callback]);
}

function CourseItem({ course, id, index, handleMoveUp, handleMoveDown, handleRemove }) {
    const [showActions, setShowActions] = useState(false);
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const dropdownRef = useRef(null);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    useOutsideAlerter(dropdownRef, () => setShowActions(false));

    const handleActionClick = (action) => {
        setShowActions(false); 
        action(); 
    };

    return (
        <tr
            ref={setNodeRef}
            style={style}
            className="shadow-lg cursor-pointer"
            {...attributes}
            {...listeners}
        >
            <td><img src={drag} className='w-6' alt="Drag handle" /></td>
            <td className="px-6 py-4 whitespace-nowrap font-bold">{course.title}</td>
            <td className="px-6 py-4 whitespace-nowrap">{course.price}</td>
            <td className="px-6 py-4 whitespace-nowrap text-green-900 font-bold">
                <div className='bg-green-200 rounded-md py-1 w-min border border-green-800'>
                    <div className='ml-1 mr-1'>{course.type}</div>
                </div>
            </td>
            <td className="relative px-6 py-4 whitespace-nowrap">
                <button
                    onClick={() => setShowActions(!showActions)}
                    className="mr-2"
                >
                    <img src={menuIcon} alt="menu" className="w-6" />
                </button>
                {showActions && (
                    <div
                        ref={dropdownRef}
                        className="absolute right-0 mt-2 w-48 border border-gray-300 rounded shadow-lg"
                        style={{ minWidth: '100%', backgroundColor: 'white' }}
                    >
                        <button
                            className="flex w-full px-4 py-3 text-blue-500 hover:bg-gray-100"
                            onClick={() => handleActionClick(() => handleMoveUp(index))}
                        >
                        <img src={up} className='w-6'/>    Move Up
                        </button>
                        <button
                            className="flex w-full px-4 py-2 text-blue-500 hover:bg-gray-100"
                            onClick={() => handleActionClick(() => handleMoveDown(index))}
                        >
                         <img src={down} className='w-6'/>    Move Down
                        </button>
                        <button
                            className="w-full px-4 py-2 text-red-500 hover:bg-gray-100 flex"
                            onClick={() => handleActionClick(() => handleRemove(id))}
                        >
                        <img src={remove} className='w-6'/>     Remove
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
}

function CourseList() {
    const [courses, setCourses] = useState([
        { id: 1, title: "Interview preparation with javascript 2.0", price: "Rs. 9000/-", type: "Course" },
        { id: 2, title: "Aptitude - Average, Mixtures & Allegation", price: "Free", type: "Mock Test" },
        { id: 3, title: "Aptitude - Simple & Compound Interest", price: "Free", type: "Mock Test" },
        { id: 4, title: "Aptitude - Partnership", price: "Free", type: "Mock Test" },
        { id: 5, title: "Aptitude - Time & Work", price: "Free", type: "Mock Test" }
    ]);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
    );

    const handleMoveUp = (index) => {
        if (index > 0) {
            setCourses(arrayMove(courses, index, index - 1));
        }
    };

    const handleMoveDown = (index) => {
        if (index < courses.length - 1) {
            setCourses(arrayMove(courses, index, index + 1));
        }
    };

    const handleRemove = (id) => {
        setCourses(courses.filter(course => course.id !== id));
    };

    return (
        <div className="min-h-screen w-full bg-green-300 flex flex-col items-center justify-center">
            <div className="p-5 mb-10 text-center">
                <div className='text-green-600 text-6xl font-bold'>Chai aur Code</div>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
                <div className="bg-white p-5 rounded-lg shadow-lg">
                    <div className='font-bold text-3xl mb-4'>Manage Bundle</div>
                    <div className='mb-4'>Change orders of the products based on priority</div>
                    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                        <SortableContext items={courses} strategy={verticalListSortingStrategy}>
                            <table className="min-w-full divide-y divide-gray-200">
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {courses.map((course, index) => (
                                        <CourseItem
                                            key={course.id}
                                            id={course.id}
                                            course={course}
                                            index={index}
                                            handleMoveUp={handleMoveUp}
                                            handleMoveDown={handleMoveDown}
                                            handleRemove={handleRemove}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </SortableContext>
                    </DndContext>
                    <BrandingLogo />
                </div>
            </div>
        </div>
    );

    function handleDragEnd(event) {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = courses.findIndex(course => course.id === active.id);
            const newIndex = courses.findIndex(course => course.id === over.id);
            setCourses(arrayMove(courses, oldIndex, newIndex));
        }
    }
}

export default CourseList;
