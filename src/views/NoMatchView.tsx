import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../stores/themeStore";
import { useEffect } from "react";
import { translateElements, useLangStore } from "../stores/langStore";

export default function NoMatchView() {
  const { lang } = useLangStore();
  const { theme } = useThemeStore();
  const navigate = useNavigate();
  
  useEffect(() => {    
    if (window.location.href == window.location.origin+"/") {
      navigate("/"+lang)
    }
    translateElements()
  }, [lang, navigate]);

  return (
    <div className='vh-100 vw-100 d-flex flex-column align-items-center justify-content-center'>
      <h1 className='text-primary mb-3' data-translate='NoMatch_title'></h1>

      <button 
        type="button" 
        className={`btn btn-${theme}`}
        onClick={() => navigate('/'+lang)}
        data-translate='NoMatch_btn'
      >
      </button>
    </div>
  );
}