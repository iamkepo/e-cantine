"use client";

import { useThemeStore } from "@/stores/themeStore";
import { modal } from "@/stores/appStore";
import { tags } from "@/core/constants";

const Page: React.FC = () => {
  const { theme } = useThemeStore();

  return (
    <div className="col-12">
      <div className="d-flex justify-content-between">
        <h4 className="card-title text-break">Liste des tags</h4>
        <button 
          type="button" 
          className="btn btn-primary" 
          onClick={() => modal.open(<div>creer un tag</div>)}
        >
          <i className="bi bi-plus"></i> 
          <span className="d-none d-md-inline-block ms-2 fw-bold">Creer un tag</span>
        </button>
      </div>
      <hr />
      <div className="table-responsive">
        <table className={`table table-sm table-striped table-${theme}`}>
          <thead className="table-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom</th>
              <th scope="col">Description</th>
              <th scope="col text-end"></th>
            </tr>
          </thead>
          <tbody className={`table-${theme}`}>
            {
              tags.map((tag) => (
                <tr key={tag.id}>
                  <th scope="row">{tag.id}</th>
                  <td>{tag.label}</td>
                  <td>{tag.description}</td>
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