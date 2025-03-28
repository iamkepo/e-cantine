import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { toggleTheme, useThemeStore } from '../stores/themeStore';
import { modal } from '../stores/appStore';
import CartComponent from '../components/CartComponent';
import { changeLang, translateElements, useLangStore } from '../stores/langStore';
import { capitalize } from '../helpers/functions';


const NavLayout: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const { lang } = useLangStore();
    
  useEffect(() => {
    if (window.location.href == window.location.origin+"/") {
      navigate("/"+lang)
    }

    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.classList = theme + '-theme';
    }
    translateElements()
  }, [theme, navigate, lang]);

  const handleChangeLang = (value: string) => {
    changeLang(value);
    window.location.replace(window.location.href.replace(`${params?.lang}`, value))
  };
  return (
    <>
      <div className="col col-lg-4 fixed-bottom mx-auto" style={{ zIndex: '1000'}}>
        <div className={`card text-bg-secondary shadow-lg mb-5 p-3`}>
          <div className={`d-flex align-items-center justify-content-around`}>
            <Link className={`btn btn-${theme}`} to='/'>
              <i className={`bi bi-house fs-6`}></i> Home
            </Link>
            <Link className={`btn btn-${theme}`} to='category'>
              <i className={`bi bi-list fs-6`}></i> Produits
            </Link>
            <button type="button" className={`btn btn-${theme}`} onClick={() => modal.open(<CartComponent />, 'xl')}>
              <i className={`bi bi-cart fs-6`}></i>
            </button>
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

export default NavLayout;