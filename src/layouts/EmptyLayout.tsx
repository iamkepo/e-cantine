import React, { useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { toggleTheme, useThemeStore } from '../stores/themeStore';
import ModalComponent from '../components/ModalComponent';
import ToastComponent from '../components/ToastComponent';
import { modal } from '../stores/appStore';
import CartComponent from '../components/CartComponent';


const EmptyLayout: React.FC = () => {
  const { theme } = useThemeStore();
  const navigate = useNavigate();
    
  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.classList = theme + '-theme';
    }
  }, [theme]);

  return (
    <section className={`container-full vh-100`}>
      <div className="col col-md-4 col-lg-6 fixed-bottom mx-auto" style={{ zIndex: '1000'}}>
        <div 
          className={`card text-bg-${theme} shadow border-2 border-primary mb-3`} 
          
        >
          <div className={`d-flex align-items-center justify-content-around p-3`}>
            <i 
              role="button" 
              className={`bi bi-house fs-5`}
              onClick={() => navigate('/')}
            ></i>
            <i 
              role="button" 
              className={`bi bi-list fs-5`}
              onClick={() => navigate('/category')}
            ></i>
            <i 
              role="button" 
              className={`bi bi-cart fs-5`}
              onClick={() => modal.open(<CartComponent />, 'xl')}
            ></i>
            <i 
              role="button" 
              className={`bi bi-${theme === "dark" ? "sun" : "moon"} fs-5`}
              onClick={toggleTheme}
            ></i>
          </div>
        </div>
      </div>
      <Outlet />
      
      <ModalComponent />
      <ToastComponent />
      <br /><br /><br /><br />
    </section>
  );
};

export default EmptyLayout;