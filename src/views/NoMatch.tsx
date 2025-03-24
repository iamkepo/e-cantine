import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../stores/themeStore";

export function NoMatch() {
  const { theme } = useThemeStore();
  const navigate = useNavigate();

  return (
    <div className='vh-100 vw-100 d-flex flex-column align-items-center justify-content-center'>
      <h1 className='text-primary mb-3'>404</h1>

      <button 
        type="button" 
        className={`btn btn-${theme}`}
        onClick={() => navigate('/')}
      >
        Home
      </button>
    </div>
  );
}