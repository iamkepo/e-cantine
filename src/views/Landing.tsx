import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../stores/themeStore";

export function Landing() {
  const { theme } = useThemeStore();
  const navigate = useNavigate();

  return (
    <div className='vh-100 vw-100 d-flex flex-column align-items-center justify-content-center'>
      <button 
        type="button" 
        className={`btn btn-${theme}`}
        onClick={() => navigate('/category')}
      >
        start
      </button>
    </div>
  );
}