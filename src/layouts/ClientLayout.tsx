import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { toggleTheme, useThemeStore } from '../stores/themeStore';
import { changeLang, translateElements, useLangStore } from '../stores/langStore';
import { capitalize } from '../helpers/functions';
import { useCartStore } from '../stores/cartStore';


const ClientLayout: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const { lang } = useLangStore();
  const { cart } = useCartStore();
    
  useEffect(() => {
    if (window.location.href == window.location.origin+"/") {
      navigate("/"+lang)
    }

    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.classList = theme + '-theme';
    }
    translateElements()
  }, [theme, navigate, lang, cart]);

  const handleChangeLang = (value: string) => {
    changeLang(value);
    window.location.replace(window.location.href.replace(`${params?.lang}`, value))
  };
  
  return (
    <>
      <div className="col col-lg-4 fixed-bottom mx-auto" style={{ zIndex: '10000'}}>
        <div className={`card text-bg-${theme} shadow-lg mb-3 p-3`}>
          <div className={`d-flex align-items-center justify-content-around`}>
            <Link className={`btn btn-${window.location.pathname == '/fr' ? 'primary' : theme}`} to='/'>
              <i className={`bi bi-house fs-6`}></i> Home
            </Link>
            <Link className={`btn btn-${window.location.pathname.includes('category') ? 'primary' : theme} border-1 border-primary`} to='category'>
              <i className={`bi bi-list fs-6`}></i> Produits
            </Link>
            {
              cart.length > 0 ?
              <Link className={`btn btn-${window.location.pathname.includes('cart') ? 'primary' : theme} position-relative`} to='cart'>
                <i className={`bi bi-cart fs-6`}></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.length}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </Link>
              :
              false
            }
            <div className="btn-group" role="group">
              <button type="button" className={`btn btn-${theme}`} onClick={toggleTheme}>
                <i className={`bi bi-${theme === "dark" ? "moon" : "sun"} fs-6`}></i>
              </button>

              <button
                type="button"
                className={`btn btn-${theme}`}
                onClick={()=> handleChangeLang(lang == 'r' ? 'en' : 'fr')}
              >
                {capitalize(params?.lang as string)}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Outlet />
      
    </>
  );
};

export default ClientLayout;