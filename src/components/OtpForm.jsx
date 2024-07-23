import React, { useState, useRef, useEffect } from 'react';
import BrandingLogo from './BrandingLogo';

function OtpForm() {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [status, setStatus] = useState('');
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const { value } = e.target;
        if (/^[0-9]$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (index < 3) {
                inputRefs.current[index + 1].focus();
            }
            if (newOtp.join('').length === 4) {
                if (newOtp.join('') === '1234') {
                    setStatus('Verified');
                } else {
                    setStatus('Not Verified');
                }
            } else {
                setStatus('');
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            // If the current input is empty, focus the previous one
            if (otp[index] === '') {
                if (index > 0) {
                    const newOtp = [...otp];
                    newOtp[index - 1] = '';
                    setOtp(newOtp);
                    inputRefs.current[index - 1].focus();
                }
            } else {
                // Clear the current input
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
            }
        }
    };
    

    useEffect(() => {
        // Disable the scrollbar
        document.body.style.overflow = 'hidden';
        return () => {
            // Re-enable the scrollbar on cleanup
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="min-h-screen w-full bg-blue-500 flex flex-col items-center justify-center">
            <div className="p-5 mb-10 text-center">
                <div className='text-white text-6xl font-bold'>Chai aur Code</div>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
                <div className="bg-white p-5 rounded-lg shadow-lg">
                    <div className='font-bold text-3xl mb-4'>Mobile Phone Verification</div>
                    <div className='text-gray-400 mb-4'>Enter the 4-digit verification code that was sent to your phone number.</div>
                    <div className="flex flex-col items-center">
                        <div className="flex flex-1 items-center space-x-2">
                            {otp.map((value, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={value}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    className="w-12 h-12 text-center text-2xl border rounded"
                                />
                            ))}
                        </div>
                        <div className={`mt-4 text-lg text-center py-2 px-12 rounded-lg ${status === 'Verified' ? 'bg-green-500 text-white' : status === 'Not Verified' ? 'bg-red-500 text-white' : 'bg-blue-950 text-white'}`}>
                            {status || 'Verify Account'}
                        </div>
                        <div className='flex'> <div className='text-gray-400 mr-2'>Didn't Receive Code? </div><div className='text-blue-950 font-bold'>Resend</div></div>
                        <BrandingLogo />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OtpForm;
