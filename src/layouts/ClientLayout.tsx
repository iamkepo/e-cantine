import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useThemeStore } from '../stores/themeStore';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useLangStore } from '../stores/langStore';


const ClientLayout: React.FC = () => {
  //router
  const navigate = useNavigate();
  const { lang } = useLangStore();
  const { user, logout } = useAuthStore();
  const { theme } = useThemeStore();
  const { cart } = useCartStore();
    
  useEffect(() => {
  }, [cart]);

  
  return (
    <div className="col-12 col-md-8 col-lg-10 mx-auto mt-3">
      <h1 className='fs-1'>
        <span className="text-primary">E</span>-
        <span className="text-secondary">Cantine</span>
      </h1>
      <div className={`col col-lg-${user ? '7' : '4'} fixed-bottom mx-auto`} style={{ zIndex: '10000'}}>
        <div className={`card text-bg-${theme} shadow-lg mb-3 p-3`}>
          <div className={`d-flex align-items-center justify-content-around`}>
            <Link className={`btn btn-${window.location.pathname == '/fr' ? 'primary' : 'outline-secondary'}`} to='/'>
              <i className={`bi bi-house fs-6`}></i> Home
            </Link>
            <Link className={`btn btn-${window.location.pathname.includes('filter') ? 'primary' : theme} border-1 border-primary`} to='filter'>
              <i className={`bi bi-list fs-6`}></i> Produits
            </Link>
            {
              cart.length > 0 ?
              <Link className={`btn btn-${window.location.pathname.includes('cart') ? 'primary' : 'outline-secondary'} position-relative`} to='cart'>
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
                  <Link className={`btn btn-${window.location.pathname.includes('orders') ? 'primary' : 'outline-secondary'}`} to={'/'+lang+'/client/orders'}>
                    <i className="bi bi-file-earmark me-2"></i>
                    My orders
                  </Link>
                  <Link className={`btn btn-${window.location.pathname.includes('plan') ? 'primary' : 'outline-secondary'}`} to={'/'+lang+'/client/plan'}>
                    <i className="bi bi-people me-2"></i>
                    My plan
                  </Link>
                  <Link className={`btn btn-${window.location.pathname.includes('history') ? 'primary' : 'outline-secondary'}`} to={'/'+lang+'/client/history'}>
                    <i className="bi bi-graph-up me-2"></i>
                    History
                  </Link>
                </div>
                <button className={`btn btn-outline-danger`} onClick={() => {logout(); navigate('/'+lang+'/client/filter')}}>
                  <i className={`bi bi-box-arrow-right fs-6`}></i>
                </button>
              </>
            ) : (
              <Link className={`btn btn-${window.location.pathname.includes('login') ? 'primary' : 'outline-secondary'}`} to={'/'+lang+'/login'}>
                <i className={`bi bi-person fs-6`}></i>
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