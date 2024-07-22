import React from 'react';
import ChaiCodeLogo from '../assets/chaicodelogo.png'; // Import the image

function BrandingLogo() {
  return (
    <a href="https://chaicode.com" target="_blank" rel="noopener noreferrer">
      <img
        src={ChaiCodeLogo}  
        alt="Branding Logo"
        className="fixed bottom-4 right-4 w-24 h-24 border rounded-xl"
      />
    </a>
  );
}

export default BrandingLogo;
