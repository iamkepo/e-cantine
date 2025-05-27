"use client";
import React, { useEffect, useState } from 'react';

interface LoaderComponentProps {
  counter?: number; // durée en ms
  callback: () => void;
}

const LoaderComponent: React.FC<LoaderComponentProps> = ({ counter = 2000, callback }) => {
  const [time, setTime] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime >= 100) {
          clearInterval(interval);
          setDone(true); // ✅ Séparer le moment de l'appel
          return 100;
        }
        return prevTime + 1;
      });
    }, counter / 100);

    return () => clearInterval(interval);
  }, [counter]);

  useEffect(() => {
    if (done) {
      callback(); // ✅ Appelé une fois que le rendu est fini
    }
  }, [done, callback]);


  return (
    <div className="progress" style={{ height: '8px' }}>
      <div 
        className="progress-bar bg-primary" 
        role="progressbar" 
        aria-valuenow={time} 
        aria-valuemin={0} 
        aria-valuemax={100} 
        style={{width: `${time}%`}}
      />
    </div>
  );
};

export default LoaderComponent;