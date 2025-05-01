"use client";
import React from 'react';
import { useThemeStore } from '@/stores/themeStore';

interface LightBoxProps {
  prev?: () => void;
  next?: () => void;
  children?: React.ReactNode;
}

const LightBox: React.FC<LightBoxProps> = ({ prev, next, children }) => {
  const { theme } = useThemeStore();

  return (
    <div className={`w-100 text-bg-${theme} d-flex align-items-center justify-content-between`}>
      <i 
        role="button"
        className="bi bi-chevron-left me-3 fs-4 cursor-pointer" 
        onClick={prev}
      ></i>
      {children}
      <i 
        role="button"
        className="bi bi-chevron-right ms-3 fs-4 cursor-pointer" 
        onClick={next}
      ></i>
    </div>
  );
};

export default LightBox;