/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useThemeStore } from "@/stores/themeStore";
import { useLangStore } from "@/stores/langStore";

export default function Page() {
  const { theme } = useThemeStore();
  const { lang } = useLangStore();

  return (
    <section className={`min-vh-100 vw-100 text-bg-${theme}`}>
      <div className="col-11 col-lg-10 mx-auto py-5 px-2 px-lg-3 mb-5">
        <h1 className="fs-1 text-primary mb-3 my-md-4">
          <Link href={'/'+lang} style={{ fontSize: '4rem' }}>
            <span className="text-primary">E</span>-
            <span className="text-secondary">Cantine</span>
          </Link>
        </h1>

        <div className="row align-items-center mt-3">
          <div className="col-lg-6 mt-5">
            <h2 className="fs-1 text-primary mb-3">Planifiez vos repas</h2>
            <p className="fs-5 mb-3">Créez votre propre calendrier de restauration sur mesure, des plats sains et savoureux avec notre plateforme de gestion des repas.</p>
            
            <div className="my-5">
              <button className="btn btn-lg px-4 py-2 btn-primary text-uppercase" onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })}>
                Commencer
              </button>
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

      <div id="forus" className="col-11 col-lg-10 mx-auto py-5 px-2 px-lg-3">
        <h1 className="text-primary mb-4">À propos de E-Cantine</h1>
        <p className="mb-5">
          E-Cantine est une plateforme de planification de repas qui permet aux utilisateurs de composer facilement leurs menus hebdomadaires, selon leurs goûts, préférences et objectifs nutritionnels.
        </p>

        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <img 
              src="https://media.istockphoto.com/id/1226736427/vector/father-mother-daughter-son-kids-having-home-family-dinner-or-lunch-sit-at-table-mom-feeding.jpg?s=612x612&w=0&k=20&c=FTU85-hKMvLjatqJemj-d6Xr939T_cNzBwfwFzIxZ3s=" 
              alt="" 
              className="img-fluid"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h3 className="mb-3">Notre mission</h3>
            <p>
              Offrir à chacun une alimentation plus simple, plus saine et plus personnalisée. Grâce à notre système intelligent, nous aidons les familles, étudiants, professionnels et établissements à mieux organiser leurs repas au quotidien.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h3 className="mb-3">Ce que nous offrons</h3>
            <ul className="ps-3">
              <li>Un catalogue varié de plats et d&apos;accompagnements</li>
              <li>Un panier intelligent avec suggestions</li>
              <li>Un système de validation et de livraison intégré</li>
              <li>Des préférences et régimes alimentaires personnalisables</li>
              <li>Une expérience multilingue et accessible</li>
            </ul>
          </div>
          <div className="col-md-6">
            <img 
              src="https://andreaalthoff.com.br/wp-content/uploads/2019/11/Food-groups-1024x679.jpg" 
              alt="" 
              className="img-fluid"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
        </div>

        <div className="text-center my-5">
          <Link href={`/${lang}`} className="btn btn-primary px-4 py-2">
            Retour à l’accueil
          </Link>
        </div>
      </div>

      <div id="newsletter" className="col-11 col-lg-10 mx-auto p-5 p-lg-3 text-bg-secondary">
        <h4 className="fw-bold mb-3">Abonnez-vous à notre newsletter</h4>
        <p className="mb-4">
          Recevez les dernières nouveautés, promotions et conseils nutritionnels chaque semaine.
        </p>

        <form className="row g-2">
          <div className="col-md-4">
            <label htmlFor="email" className="form-label">Email</label>
          </div>
          <div className="col-md-6">
            <input
              type="email"
              className="form-control"
              placeholder="Votre adresse email"
              required
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">
              S&apos;abonner
            </button>
          </div>
        </form>
      </div>

      <div className="col-11 col-lg-10 mx-auto py-5 px-2 px-lg-3">
        <div className="row text-center text-md-start">
          <div className="col-md-4 mb-4">
            <h5 className="text-primary">E-Cantine</h5>
            <p className="">
              Planifiez vos repas, découvrez de nouveaux plats, et mangez équilibré toute la semaine.
            </p>
          </div>

          <div className="col-md-2 mb-4">
            <h6 className="text-uppercase fw-bold">Navigation</h6>
            <ul className="list-unstyled">
              <li><Link href={`/${lang}`} className="text-reset text-decoration-none">Accueil</Link></li>
              <li><a href="#" className="text-reset text-decoration-none" onClick={() => document.getElementById('forus')?.scrollIntoView({ behavior: 'smooth' })}>À propos</a></li>
              <li><a href="#" className="text-reset text-decoration-none" onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })}>Contact</a></li>
            </ul>
          </div>

          <div className="col-md-2 mb-4">
            <h6 className="text-uppercase fw-bold">Utilisateurs</h6>
            <ul className="list-unstyled">
              <li><Link href={`/${lang}/login`} className="text-reset text-decoration-none">Connexion</Link></li>
              <li><Link href={`/${lang}/register`} className="text-reset text-decoration-none">Inscription</Link></li>
              <li><Link href={`/${lang}/my/profile`} className="text-reset text-decoration-none">Mon Profil</Link></li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h6 className="text-uppercase fw-bold">Restez connecté</h6>
            <p className="">Suivez-nous sur nos réseaux sociaux</p>
            <div className="d-flex gap-2 justify-content-center justify-content-md-start">
              <a href="#" className="text-reset"><i className="bi bi-facebook fs-4"></i></a>
              <a href="#" className="text-reset"><i className="bi bi-twitter fs-4"></i></a>
              <a href="#" className="text-reset"><i className="bi bi-instagram fs-4"></i></a>
            </div>
          </div>
        </div>

        <hr />
        <div className="text-center  small">
          &copy; {new Date().getFullYear()} E-Cantine — Tous droits réservés.
        </div>
      </div>
    </section>
  );
}