"use client";
import React, { useEffect } from 'react';
import { useThemeStore } from '@/stores/themeStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { useLangStore } from '@/stores/langStore';
import { useCartStore } from '@/stores/cartStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const route = usePathname();
  const { lang } = useLangStore();
  const { user } = useAuthStore();
  const { theme } = useThemeStore();
  const { cart } = useCartStore();
    
  useEffect(() => {
  }, [cart.length, route]);

  const routeMatch = (path: string): boolean => {
    return route.includes(path);
  };
  
  return (
    <div className="col-12 col-md-10 col-lg-10 mx-auto p-3">
      <div className={`col-12 mb-3 ${routeMatch('my') ? 'text-center text-lg-start' : 'text-start'}`}>
        <Link className="fs-1" href={'/'+lang}>
          <span className="text-primary">E</span>-
          <span className="text-secondary">Cantine</span>
        </Link>
      </div>
      <div className={`col col-lg-${user ? '8' : '4'} fixed-bottom mx-auto`}>
        <div className={`card text-bg-${theme} shadow-lg mb-md-3 mb-0 p-3`}>
          <div className={`d-flex align-items-center justify-content-around`}>
            <Link className={`btn btn-${route === '/'+lang ? 'primary' : theme} border-1 border-primary`} href={'/'+lang}>
              <i className={`bi bi-list fs-6`}></i> 
              <span className='d-none d-md-inline-block ms-2'>Accueil</span>
            </Link>
            
            <Link className={`btn btn-${routeMatch('cart') ? 'primary' : 'outline-secondary'} position-relative`} href={'/'+lang+'/my/cart'}>
              <i className={`bi bi-cart fs-6`}></i>
              <span className='d-none d-md-inline-block ms-2'>Panier</span>
              { cart.length > 0 ?
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.length}
                  <span className="visually-hidden">unread messages</span>
                </span>
                :
                false
              }
            </Link>
            { user ? (
              <>
                <div className="btn-group" role="group">
                  <Link className={`btn btn-${routeMatch('orders') ? 'primary' : 'outline-secondary'}`} href={'/'+lang+'/my/orders'}>
                    <i className="bi bi-file-earmark"></i>
                    <span className='d-none d-md-inline-block ms-2'>Commandes</span>
                  </Link>
                  <Link className={`btn btn-${routeMatch('history') ? 'primary' : 'outline-secondary'}`} href={'/'+lang+'/my/history'}>
                    <i className="bi bi-graph-up"></i>
                    <span className='d-none d-md-inline-block ms-2'>Historique</span>
                  </Link>
                </div>
                <div className="btn-group" role="group">
                  <Link className={`btn btn-${routeMatch('friends') ? 'primary' : 'outline-secondary'}`} href={'/'+lang+'/my/friends'}>
                    <i className="bi bi-people"></i>
                    <span className='d-none d-md-inline-block ms-2'>Amis</span>
                  </Link>
                  <Link className={`btn btn-${routeMatch('profile') ? 'primary' : 'outline-secondary'}`} href={'/'+lang+'/my/profile'}>
                    <i className={`bi bi-person fs-6`}></i>
                    <span className='d-none d-md-inline-block ms-2'>Profil</span>
                  </Link>
                </div>
              </>
            ) : (
              <Link className={`btn btn-${routeMatch('login') ? 'primary' : 'outline-secondary'}`} href={'/'+lang+'/login'}>
                <i className={`bi bi-box-arrow-in-right fs-6`}></i> 
                <span className='d-none d-md-inline-block ms-2'>Connexion</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="col-12 h-100 mt-3">
        {children}
      </div>

      <br /><br /><br /><br />
      <br /><br /><br /><br />
    </div>
  );
};

export default ClientLayout;