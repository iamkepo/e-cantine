import React from 'react';
import { Outlet } from "react-router-dom";
import { handleSetting, useSettingStore } from '../stores/settingStore';


const ConfigLayout: React.FC = () => {  
  const { budget, counter, type } = useSettingStore();

  return (
    <div className="col-12 p-3">

      <div className="text-center">
        <h1>
          Simple, transparent pricing
          <button
            type="button"
            className={`btn ${budget === 'vip' ? 'btn-primary' : 'btn-outline-primary'} ms-3`}
            onClick={() => handleSetting('budget', budget === 'vip' ? 'normal' : 'vip')}
            aria-label={`Switch to ${budget === 'vip' ? 'normal' : 'vip'} budget`}
          >
            {budget} {budget === 'vip' && <i className="bi bi-patch-check-fill"></i>}
          </button>
        </h1>
        <p className="fs-4">
          Pour 
          <i 
            role="button"
            className="bi bi-dash-circle-fill mx-3" 
            onClick={() => handleSetting('counter', counter - 1)}
            style={{ cursor: 'pointer' }}
          ></i>
          {counter}
          <i 
            role="button"
            className="bi bi-plus-circle-fill mx-3" 
            onClick={() => handleSetting('counter', counter + 1)}
            style={{ cursor: 'pointer' }}
          ></i>
          person{counter > 1 ? "s" : ""}
        </p>
      </div>
      <ul className="nav nav-tabs justify-content-center">
        <li className="nav-item">
          <button className={`nav-link text-bg-${type == 'classic' ? 'primary' : 'secondary'}`} type="button" onClick={()=> handleSetting('type', 'classic')}>Classic</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link text-bg-${type == 'vegetalien' ? 'primary' : 'secondary'}`} type="button" onClick={()=> handleSetting('type', 'vegetalien')}>Végétalien</button>
        </li>
      </ul>

      <Outlet />
      
    </div>
  );
};

export default ConfigLayout;