/* eslint-disable @next/next/no-img-element */
"use client";

import { useThemeStore } from "@/stores/themeStore";
import { modal } from "@/stores/appStore";
import { articlesPrincipal } from "@/core/constants";
import { Article } from "@/core/types";

const Page: React.FC = () => {
  const { theme } = useThemeStore();

  return (
    <div className="col-12">
      <div className="d-flex justify-content-between">
        <h4 className="card-title text-break">Liste des plats</h4>
        <button 
          type="button" 
          className="btn btn-primary" 
          onClick={() => modal.open(<div>creer un plat</div>)}
        >
          <i className="bi bi-plus"></i> 
          <span className="d-none d-md-inline-block ms-2 fw-bold">Creer un plat</span>
        </button>
      </div>
      <hr />
      <div className="table-responsive">
        <table className={`table table-sm table-striped table-${theme}`}>
          <thead className="table-primary">
            <tr>
              <th scope="col" className="col-md-1">Image</th>
              <th scope="col" className="col-md-6">Nom</th>
              <th scope="col" className="col-md-2">Prix</th>
              <th scope="col" className="col-md-2 text-end"></th>
            </tr>
          </thead>
          <tbody className={`table-${theme}`}>
            {
              articlesPrincipal.map((article: Article) => (
                <tr key={article.id}>
                  <td scope="row" className="col-md-1">
                    <img 
                      src={article.img} 
                      alt={article.label} 
                      className="img-fluid rounded" 
                    />
                  </td>
                  <td scope="row" className="col-md-6">{article.label}</td>
                  <td scope="row" className="col-md-1">{article.price}</td>
                  <td scope="row" className="col-md-2 text-end">
                    <i className="bi bi-pencil text-primary me-2"></i>
                    <i className="bi bi-trash text-danger"></i>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;