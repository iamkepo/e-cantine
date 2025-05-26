"use client";
import React, { useEffect, useState } from 'react';

interface LoaderComponentProps {
  counter?: number; // durée en ms
  callback: () => void;
}

const LoaderComponent: React.FC<LoaderComponentProps> = ({ counter = 2000, callback }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const step = counter / 100;
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          callback(); // ✅ Appelé ici à la fin
          return 100;
        }
        return prev + 1;
      });
    }, step);

    return () => clearInterval(interval); // Nettoyage classique
  }, [callback, counter]);

  return (
    <div className="progress">
      <div 
        className="progress-bar bg-primary progress-bar-striped progress-bar-animated" 
        role="progressbar" 
        aria-valuenow={time} 
        aria-valuemin={0} 
        aria-valuemax={100} 
        style={{width: `${time}%`}}
      ></div>
    </div>
  );
};

export default LoaderComponent;