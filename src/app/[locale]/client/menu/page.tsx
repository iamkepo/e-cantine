/* eslint-disable @next/next/no-img-element */
"use client";
import ArticleHComponent from "@/components/ArticleHComponent";
import { articlesPrincipal } from "@/core/constants";
import { getHistoryByDate } from "@/stores/historyStore";
import { useThemeStore } from "@/stores/themeStore";
import { modal } from "@/stores/appStore";
import { useState } from "react";
import { formatDate } from "@/helpers/functions";
import { Article } from "@/core/types";

const MenuView: React.FC = () => {
  const { theme } = useThemeStore();
  const [ date, setDate ] = useState<Date>(new Date());
  
  const action = (subId: number) => {
    modal.open(
      <ArticleHComponent
        article={articlesPrincipal.find(a => a.id === subId) as Article}
        choose={true}
        addItem={(id) => {action(id);}}
        removeItem={(id) => {action(id);}}
      />,
      "xl"
    );
  };
  return (
    <div className={`card text-bg-${theme} mb-3`}>
      <div className="card-body">
        <h4 className="card-title">
          Menu de jour 
          {date != null ? <span className="float-end fw-normal"> {formatDate(date.toISOString())} </span> : false}
        </h4>
        <div className="row">
          <div className="col-lg-4">
            <label htmlFor="start-date" className="form-label">Date de début :</label>
            <input 
              type="date" 
              id="start-date" 
              className="form-control mb-3" 
              value={date?.toISOString().split('T')[0] || ''} 
              onChange={e => setDate(new Date(e.target.value))} 
            />
          </div>
          <div className="col-lg-8">
            <h6 className="card-title">Liste des plats</h6>
            {getHistoryByDate(date.toISOString().split('T')[0]) ? (
              <ul className="list-group">
                { getHistoryByDate(date.toISOString().split('T')[0])?.map((event) => (
                  <li key={event.id} className={`list-group-item text-bg-${theme}`}>
                    <div className="row">
                      <div className="col-2">
                        <img
                          src={articlesPrincipal.find(a => a.id === event.plat_id)?.img}
                          alt={articlesPrincipal.find(a => a.id === event.plat_id)?.label}
                          className="img-fluid rounded"
                          onClick={() => action(event.plat_id)}
                        />
                      </div>
                      <div className="col-10 d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-truncate">{articlesPrincipal.find(a => a.id === event.plat_id)?.label}</span>
                        <button type="button" className="btn btn-sm btn-outline-primary">
                          <i className="bi bi-arrow-clockwise"></i> Modifier
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="card-text">Aucun plat trouvé pour cette date.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuView;
