"use client";
import React from "react";

interface BlockSkeletonProps {
  image?: boolean;
  multiple?: boolean;
  count: number;
  className?: string;
}

const BlockSkeleton: React.FC<BlockSkeletonProps> = ({ image = false, multiple = false, count, className = ''}) => {
  return (
    Array.from({ length: count }).map((_, i) => (
      <div key={i} className={className}>
        {image && <div className="skeleton-img"></div>}
        { multiple ? 
          <>
            <div className="skeleton-title mb-2"></div>
            <div className="skeleton-text w-75 mb-2"></div>
            <div className="skeleton-text w-50"></div>
          </>
          : 
          <div className="skeleton-title px-5"></div>
        }
      </div>
    ))
  );
};

export default BlockSkeleton;