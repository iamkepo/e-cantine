"use client";
import React from 'react';

interface SpinnerComponentProps {
  done?: boolean;
}

const SpinnerComponent: React.FC<SpinnerComponentProps> = ({ done = false }) => {

return (
  <div className="col-12 d-flex justify-content-center align-items-center">
    <div className={done ? "d-none" : "spinner-border"} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
)
}

export default SpinnerComponent;
