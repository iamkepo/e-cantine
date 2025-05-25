"use client";
import React from 'react';
import { IArticle } from '@/core/interfaces';

interface LightBoxProps {
  list: IArticle[];
  index: number;
  open: (article: IArticle, i: number) => void;
  children?: React.ReactNode;
}

const LightBox: React.FC<LightBoxProps> = ({ list, index, open, children }) => {
  const prevLightBox = (i: number) => {
    if (i < 0) {
      i = list.length - 1;
    }
    open(list[i], i);
  };

  const nextLightBox = (i: number) => {
    if (i >= list.length) {
      i = 0;
    }
    open(list[i], i);
  };
  return (
    <div className={`w-100 d-flex align-items-center justify-content-between position-relative`}>
      <i 
        role="button"
        className="bi bi-chevron-left fs-4 cursor-pointer position-absolute top-50 start-0 translate-middle-y"
        style={{ zIndex: '1000' }} 
        onClick={() => prevLightBox(index - 1)}
      ></i>
      {children}
      <i 
        role="button"
        className="bi bi-chevron-right fs-4 cursor-pointer position-absolute top-50 end-0 translate-middle-y" 
        style={{ zIndex: '1000' }} 
        onClick={() => nextLightBox(index + 1)}
      ></i>
    </div>
  );
};

export default LightBox;