import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useThemeStore } from '../stores/themeStore';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useLangStore } from '../stores/langStore';


const ClientLayout: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useLangStore();
  const { user } = useAuthStore();
  const { theme } = useThemeStore();
  const { cart } = useCartStore();
    
  useEffect(() => {
  }, [cart.length, navigate]);

  const routeMatch = (path: string): boolean => {
    return window.location.pathname.includes(path);
  };
  
  return (
    <div className="col-12 col-md-8 col-lg-10 mx-auto mt-3 px-3">
      <Link className='fs-1' to={'/'+lang}>
        <span className="text-primary">E</span>-
        <span className="text-secondary">Cantine</span>
      </Link>
      <div className={`col col-lg-${user ? '8' : '4'} fixed-bottom mx-auto`}>
        <div className={`card text-bg-${theme} shadow-lg mb-md-3 mb-0 p-3`}>
          <div className={`d-flex align-items-center justify-content-around`}>
            <Link className={`btn btn-${window.location.pathname == '/' ? 'primary' : 'outline-secondary'}`} to='/'>
              <i className={`bi bi-house fs-6`}></i> 
              <span className='d-none d-md-inline-block'>Accueil</span>
            </Link>
            <Link className={`btn btn-${routeMatch('filter') ? 'primary' : theme} border-1 border-primary`} to='filter'>
              <i className={`bi bi-list fs-6`}></i> 
              <span className='d-none d-md-inline-block'>Plats</span>
            </Link>
            {
              cart.length > 0 ?
              <Link className={`btn btn-${routeMatch('cart') ? 'primary' : 'outline-secondary'} position-relative`} to='cart'>
                <i className={`bi bi-cart fs-6`}></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.length}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </Link>
              :
              false
            }
            { user ? (
              <>
                <div className="btn-group" role="group">
                  <Link className={`btn btn-${routeMatch('orders') ? 'primary' : 'outline-secondary'}`} to={'/'+lang+'/client/orders'}>
                    <i className="bi bi-file-earmark me-2"></i>
                    <span className='d-none d-md-inline-block'>Commandes</span>
                  </Link>
                  <Link className={`btn btn-${routeMatch('plan') ? 'primary' : 'outline-secondary'}`} to={'/'+lang+'/client/plan'}>
                    <i className="bi bi-people me-2"></i>
                    <span className='d-none d-md-inline-block'>Plans</span>
                  </Link>
                  <Link className={`btn btn-${routeMatch('history') ? 'primary' : 'outline-secondary'}`} to={'/'+lang+'/client/history'}>
                    <i className="bi bi-graph-up me-2"></i>
                    <span className='d-none d-md-inline-block'>Historique</span>
                  </Link>
                </div>
                <Link className={`btn btn-${routeMatch('profile') ? 'primary' : 'outline-secondary'}`} to={'/'+lang+'/client/profile'}>
                  <i className={`bi bi-person fs-6`}></i>
                </Link>
              </>
            ) : (
              <Link className={`btn btn-${routeMatch('login') ? 'primary' : 'outline-secondary'}`} to={'/'+lang+'/login'}>
                <i className={`bi bi-box-arrow-in-right fs-6`}></i> 
                <span className='d-none d-md-inline-block'>Connexion</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      <Outlet />
      
      <br /><br /><br /><br />
      <br /><br /><br /><br />
    </div>
  );
};

export default ClientLayout;