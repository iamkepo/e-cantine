/* eslint-disable @next/next/no-img-element */
"use client";
import React from 'react';
import { useThemeStore } from '../stores/themeStore';
import { IArticle } from '../core/interfaces';
import { categoryRender, formatDate } from '../helpers/functions';

interface ArticleComponentProps {
  article: IArticle;
  addItem?: (id: number) => void;
  removeItem?: (id: number) => void;
  choose?: boolean;
  horizontal?: boolean;
}

const ArticleComponent: React.FC<ArticleComponentProps> = ({ article, addItem, removeItem, choose, horizontal }) => {
  const { theme } = useThemeStore();
  
  return (
    <div className={`card text-bg-${theme} ${choose ? 'border border-1 border-warning' : ''}`}>
      <div className="row g-0">
        <div className="col-md-6">
          <img 
            src={article.image} 
            className="img-fluid rounded-start" 
            alt={article.name} 
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h4 className="card-title mb-3">
              {article.name}
            </h4>
            <div className="row mb-4">
              <h5 className="col col-md-8 text-danger text-nowrap">{article.price} XOF</h5>
              <div className="col col-md-4">
                {
                  (choose && removeItem) ? 
                  <button
                    type="button"
                    className="btn btn-danger float-end"
                    onClick={() => removeItem(article.id as number)}
                  >
                    Retirer
                  </button>
                  :
                  (addItem && !choose) ?
                  <button
                    type="button"
                    className="btn btn-warning float-end"
                    onClick={() => false}
                  >
                    Ajouter
                  </button>
                  :
                  false
                }
              </div>  
            </div>
            { horizontal &&
            <>
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
            </>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleComponent;