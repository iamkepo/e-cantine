import React, { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { useFilterStore } from "../stores/filterStore"; // Import store
import { listStep } from '../helpers/constants';

const ConfigLayout: React.FC = () => {  
  const { currentStep } = useFilterStore(); // Access currentStep from the store

  useEffect(() => {
    console.log("Current Step:", currentStep); // Debug log
  }, [currentStep]);

  return (
    <div className="col-12 p-3">
      <div className="steps-horizontal mx-auto">
        {listStep.map((item) => (
          <div
            key={item.id}
            className={`step-horizontal ${currentStep >= item.id ? 'active' : ''}`} // Pass list to updateSteps
          >
            <div className="step-icon">
              <i className={`bi bi-${item.icon}`}></i>
            </div>
            <div className="step-description">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      <Outlet />
    </div>
  );
};

export default ConfigLayout;