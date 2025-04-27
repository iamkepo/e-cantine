import { Link } from "react-router-dom";
import { useThemeStore } from "../stores/themeStore";

export default function LandingView() {
  const { theme } = useThemeStore();

  return (
    <section className={`vh-100 vw-100 text-bg-${theme}`}>
      <div className="col-10 mx-auto pt-5">
        <div className="row align-items-center mt-5">
          <div className="col-lg-6 pt-5">
            <h1 className="fs-1 text-primary mb-3">Planifiez vos repas</h1>
            <p className="fs-5 mb-3">Créez des repas sur mesure, des plats sains et des plats savoureux. Planifiez vos repas avec notre plateforme de gestion des repas.</p>
            
            <div className="hero-buttons">
              <Link to="client/category" className="btn btn-primary me-3 mb-2">Commencer</Link>
            </div>

            <div className="hero-stats row">
              <div className="col-4">
                <div className="stat-item">
                  <div className="stat-number">10K+</div>
                  <div className="stat-label">Utilisateurs actifs</div>
                </div>
              </div>
              <div className="col-4">
                <div className="stat-item">
                  <div className="stat-number">98%</div>
                  <div className="stat-label">Satisfaction</div>
                </div>
              </div>
              <div className="col-4">
                <div className="stat-item">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Support</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 hero-image">
            <img src="https://www.mutuellebleue.fr/app/uploads/sites/2/2020/07/des-plats-%C3%A9quiliobr%C3%A9s-et-color%C3%A9s.jpg" alt="Platform Dashboard" className="hero-image-main" />
              
            <div className="floating-card card-1">
              <div className="d-flex align-items-center">
                <i className="fas fa-check-circle text-success me-2"></i>
                <span>Projet terminé</span>
              </div>
            </div>
              
            <div className="floating-card card-2">
              <div className="d-flex align-items-center">
                <i className="fas fa-star text-warning me-2"></i>
                <span>5.0 Note</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}