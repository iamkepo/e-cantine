import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";


import { listStep } from '../helpers/constants';
import { useCartStore } from '../stores/cartStore';

const ConfigLayout: React.FC = () => {  
  const navigate = useNavigate();
  const { step } = useParams();
  const { subtotal } = useCartStore();


  useEffect(() => {
  }, [step, subtotal, navigate]);
  
  return (
    <div className="col-12 p-3">
      <div className="steps-horizontal mx-auto">
        {listStep.map((item) => (
          <div
            key={item.id}
            className={`step-horizontal ${parseInt(step as string) >= item.id ? 'active' : ''}`} // Pass list to updateSteps
          >
            <Link className={`step-icon`} to={''+item.id}>
              <i className={`bi bi-${item.icon}`}></i>
            </Link>
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