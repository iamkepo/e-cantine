/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useThemeStore } from "../../stores/themeStore";
import { useLangStore } from "../../stores/langStore";

export default function Page() {
  const { theme } = useThemeStore();
  const { lang } = useLangStore();

  return (
    <section className={`min-vh-100 vw-100 text-bg-${theme}`}>
      <div className="col-10 mx-auto pt-5 px-3">
        <h1 className="fs-1 text-primary mb-3">
          <Link href={'/'+lang} style={{ fontSize: '3.5rem' }}>
            <span className="text-primary">E</span>-
            <span className="text-secondary">Cantine</span>
          </Link>
        </h1>

        <div className="row align-items-center mt-3">
          <div className="col-lg-6 pt-5">
            <h2 className="fs-1 text-primary mb-3">Planifiez vos repas</h2>
            <p className="fs-5 mb-3 text-secondary">Créez des repas sur mesure, des plats sains et des plats savoureux. Planifiez vos repas avec notre plateforme de gestion des repas.</p>
            
            <div className="my-5">
              <Link href={'/'+lang+'/filter'} className="btn btn-lg px-4 py-2 btn-primary text-uppercase">
                Commencer
              </Link>
            </div>

            <hr />
      
            <div className="row">
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
            <img 
              src="https://www.mutuellebleue.fr/app/uploads/sites/2/2020/07/des-plats-%C3%A9quiliobr%C3%A9s-et-color%C3%A9s.jpg" 
              alt="Platform" 
              className="hero-image-main" 
            />
              
            <div className="floating-card card-1">
              <div className="d-flex align-items-center">
                <i className="fas fa-check-circle text-success me-2"></i>
                <span>Projet en teste</span>
              </div>
            </div>
              
            <div className="floating-card card-2">
              <div className="d-flex align-items-center">
                <i className="fas fa-star text-warning me-2"></i>
                <span>3.0 Note</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}