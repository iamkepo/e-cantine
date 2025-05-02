"use client";

import { useThemeStore } from "@/stores/themeStore";
import { modal } from "@/stores/appStore";
import { articlesBoisson } from "@/core/constants";
import { Article } from "@/core/types";

const Page: React.FC = () => {
  const { theme } = useThemeStore();

  return (
    <div className="col-12">
      <div className="d-flex justify-content-between">
        <h4 className="card-title text-break">Liste des boissons</h4>
        <button 
          type="button" 
          className="btn btn-primary" 
          onClick={() => modal.open(<div>creer une boisson</div>)}
        >
          <i className="bi bi-plus"></i> 
          <span className="d-none d-md-inline-block ms-2 fw-bold">Creer une boisson</span>
        </button>
      </div>
      <hr />
      <div className="table-responsive">
        <table className={`table table-sm table-striped table-${theme}`}>
          <thead className="table-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom</th>
              <th scope="col">Prix</th>
              <th scope="col" className="text-end"></th>
            </tr>
          </thead>
          <tbody className={`table-${theme}`}>
            {
              articlesBoisson.map((article: Article) => (
                <tr key={article.id}>
                  <th scope="row">{article.id}</th>
                  <td>{article.label}</td>
                  <td>{article.price}</td>
                  <td className="text-end">
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