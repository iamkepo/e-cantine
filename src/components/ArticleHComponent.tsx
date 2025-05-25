/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from 'react';
import { useThemeStore } from '../stores/themeStore';
import { IArticle } from '../core/interfaces';
import { categoryRender, formatDate } from '../helpers/functions';

interface ArticleHComponentProps {
  article: IArticle;
  addItem?: (id: number) => void;
  removeItem?: (id: number) => void;
  choose: boolean;
}

const ArticleHComponent: React.FC<ArticleHComponentProps> = ({ article, addItem, removeItem, choose }) => {
  const { theme } = useThemeStore();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(choose);
  }, [choose]);

  return (
    <div className={`w-100 card text-bg-${theme}`}>
      <div className="row g-2">
        <div className="col-12 col-md-6 h-100 d-flex align-items-center justify-content-center">
          <img 
            src={article.image} 
            className="img-fluid rounded-start" 
            alt={article.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}

          />
        </div>
        <div className="col-12 col-md-6">
          <div className="card-body d-flex flex-column gap-5">
            <div className="d-flex flex-column gap-2">
              <h4 className="card-title mb-3">
                {article.name}
              </h4>
              
              <p className="card-text">
                <span className="badge text-bg-primary">
                  {categoryRender(article.categoryId as number)}
                </span>
              </p>
              <p className="card-text">
                {article.description}
              </p>
              {/* <p className="card-text">
                { 
                  (article.tags || []).map((tag, j) => (
                    <span key={j} className="badge text-bg-secondary me-2">
                      {tagRender(tag)}
                    </span>
                  ))
                }
              </p> */}
              <p className="card-text">
                <small className="text-muted">
                  {formatDate(article.updatedAt?.toString() || '')}
                </small>
              </p>
            </div>
            <div className="row">
              <h5 className="col col-md-8 text-danger text-nowrap">{article.price} XOF</h5>
              <div className="col col-md-4">
                {
                  (isSelected && removeItem) ? 
                  <button
                    type="button"
                    className="btn btn-danger float-end"
                    onClick={() => removeItem(article.id as number)}
                  >
                    Retirer
                  </button>
                  :
                  (addItem && !isSelected) ?
                  <button
                    type="button"
                    className="btn btn-warning float-end"
                    onClick={() => addItem(article.id as number)}
                  >
                    Ajouter
                  </button>
                  :
                  false
                }
              </div>  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleHComponent;