"use client";
import React from "react";

interface BlockSkeletonProps {
  multiple?: boolean;
  count: number
  className?: string;
}

const BlockSkeleton: React.FC<BlockSkeletonProps> = ({ multiple = false, count, className = ''}) => {
  return (
    Array.from({ length: count }).map((_, i) => (
      multiple ? (
        <div key={i} className={className}>
          <div className="skeleton-title mb-2"></div>
          <div className="skeleton-text w-75 mb-2"></div>
          <div className="skeleton-text w-50"></div>
        </div>
      ) : (
        <div key={i} className={className}>
          <div className="skeleton-title px-5"></div>
        </div>
      )
    ))
  );
};

export default BlockSkeleton;