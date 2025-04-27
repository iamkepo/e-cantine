import React from 'react';
import { Outlet, useParams } from "react-router-dom";
import ModalComponent from '../components/ModalComponent';
import ToastComponent from '../components/ToastComponent';
import { toggleTheme, useThemeStore } from '../stores/themeStore';
import { changeLang, translateElements, useLangStore } from '../stores/langStore';
import { capitalize } from '../helpers/functions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ContainerLayout: React.FC = () => {
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
    <section className="container-fluid vh-100 p-0">
      <div className="btn-group position-fixed top-0 end-0 m-3 shadow-lg" role="group" style={{ zIndex: '10000'}}>
        <button type="button" className={`btn btn-${theme} border-1 border-secondary`} onClick={toggleTheme}>
          <i className={`bi bi-${theme === "dark" ? "moon" : "sun"} fs-6`}></i>
        </button>

        <button
          type="button"
          className={`btn btn-${theme} border-1 border-secondary`}
          onClick={()=> handleChangeLang(lang == 'r' ? 'en' : 'fr')}
        >
          {capitalize(params?.lang as string)}
        </button>
      </div>
      <div className="row h-100">
        <div className="col-12">
          <Outlet />
        </div>
        <ModalComponent />
        <ToastComponent />
      </div>
    </section>
  );
};

export default ContainerLayout;