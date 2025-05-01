"use client";
import React from 'react';
import { useThemeStore } from '@/stores/themeStore';


const Counter: React.FC<{
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}> = ({ value, onIncrement, onDecrement }) => {
  const { theme } = useThemeStore();

  return (
    <div className="input-group input-group-sm" style={{ width: '100px' }}>
      <button
        className={`btn text-bg-secondary btn-sm`}
        type="button"
        onClick={() => onDecrement()}
      >
        <i className="bi bi-dash"></i>
      </button>
      <input
        type="text"
        className={`form-control form-control-sm text-center text-bg-${theme}`}
        value={value}
        min={0}
        max={100}
        step={1}
        readOnly
      />
      <button
        className={`btn text-bg-secondary btn-sm`}
        type="button"
        onClick={() => onIncrement()}
      >
        <i className="bi bi-plus"></i>
      </button>
    </div>
  );
};

export default Counter;