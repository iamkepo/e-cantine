import React, { useEffect, useState } from 'react';

interface LoaderComponentProps {
  counter?: number;
  callback: () => void;
}

const LoaderComponent: React.FC<LoaderComponentProps> = ({ counter, callback }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (counter) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime < 100 ? (prevTime + 1) : 100);
      }, counter / 100); // Adjust the division for appropriate speed

      // Clear the interval on component unmount
      return () => {clearInterval(interval); callback()};
    }
  }, [callback, counter]);

  return (
    <div className='p-3 text-center'>
      <h3 className='mb-3'>Chargement...</h3>
      <p className='fs-6 fw-medium'>Veuillez patienter...</p>
      <svg width="100" height="100" viewBox="0 0 100 100" className="circular-progress">
        <circle className="bg"></circle>
        <circle className="fg"></circle>
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="18" fill="black">
          {time}%
        </text>
      </svg>
    </div>
  );
};

export default LoaderComponent;