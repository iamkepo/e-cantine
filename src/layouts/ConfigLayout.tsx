import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";


import { listStep } from '../core/constants';
import { useCartStore } from '../stores/cartStore';
import { useLangStore } from '../stores/langStore';

const ConfigLayout: React.FC = () => {  
  const navigate = useNavigate();
  const { subtotal } = useCartStore();
  const { lang } = useLangStore();

  useEffect(() => {
  }, [subtotal, navigate]);
  
  return (
    <div className="col-12 p-3">
      <div className="steps-horizontal mx-auto">
        {listStep.map((item) => (
          <div
            key={item.id}
            className={`step-horizontal ${window.location.pathname.includes(item.path)  ? 'active' : ''}`} // Pass list to updateSteps
          >
            <Link className={`step-icon`} to={'/'+lang+'/client/'+item.path}>
              <i className={`bi bi-${item.icon}`}></i>
            </Link>
            <div className={`${window.location.pathname.includes(item.path) ? 'text-primary' : 'step-description'}`}>
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