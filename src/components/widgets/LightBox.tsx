"use client";
import React from 'react';

interface LightBoxProps {
  prev?: () => void;
  next?: () => void;
  children?: React.ReactNode;
}

const LightBox: React.FC<LightBoxProps> = ({ prev, next, children }) => {

  return (
    <div className={`w-100 d-flex align-items-center justify-content-between position-relative`}>
      <i 
        role="button"
        className="bi bi-chevron-left fs-4 cursor-pointer position-absolute top-50 start-0 translate-middle-y"
        style={{ zIndex: '1000' }} 
        onClick={prev}
      ></i>
      {children}
      <i 
        role="button"
        className="bi bi-chevron-right fs-4 cursor-pointer position-absolute top-50 end-0 translate-middle-y" 
        style={{ zIndex: '1000' }} 
        onClick={next}
      ></i>
    </div>
  );
};

export default LightBox;