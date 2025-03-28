import { Link } from "react-router-dom";
import { useThemeStore } from "../stores/themeStore";

export default function LandingView() {
  const { theme } = useThemeStore();

  return (
    <section className={`vh-100 vw-100 text-bg-${theme}`}>
      <div className="col-10 mx-auto">
        <div className="row align-items-center">
          <div className="col-lg-6 hero-content">
            <h1 className="hero-title">Transform Your Digital Experience</h1>
            <p className="hero-subtitle">Create stunning websites and applications with our powerful platform. Experience the next generation of web development.</p>
            
            <div className="hero-buttons">
              <Link to="category" className="btn btn-primary me-3 mb-2">Get Started Free</Link>
              <Link to="/" className="btn btn-outline mb-2">Watch Demo <i className="fas fa-play ms-2"></i></Link>
            </div>

            <div className="hero-stats row">
              <div className="col-4">
                <div className="stat-item">
                  <div className="stat-number">10K+</div>
                  <div className="stat-label">Active Users</div>
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
            <img src="https://placehold.co/800x600" alt="Platform Dashboard" className="hero-image-main" />
              
            <div className="floating-card card-1">
              <div className="d-flex align-items-center">
                <i className="fas fa-check-circle text-success me-2"></i>
                <span>Project completed</span>
              </div>
            </div>
              
            <div className="floating-card card-2">
              <div className="d-flex align-items-center">
                <i className="fas fa-star text-warning me-2"></i>
                <span>5.0 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}