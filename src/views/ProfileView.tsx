import React from "react";
import { useThemeStore } from "../stores/themeStore";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useLangStore } from "../stores/langStore";


const ProfileView: React.FC = () => {
  const { theme } = useThemeStore();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const { lang } = useLangStore();
  const { user } = useAuthStore();
  return (
    <div className={`card text-bg-${theme} mb-3`}>
      <div className="card-body">
        <h4 className="card-title">Profile</h4>
        <p className="card-text">
          Email: {user?.email}
        </p>
        <p className="card-text">
          Preferences: 
        </p>
        <button className={`btn btn-danger`} onClick={() => {logout(); navigate('/'+lang+'/client')}}>
          <i className={`bi bi-box-arrow-right fs-6`}></i> Déconnexion
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
