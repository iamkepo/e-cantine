/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from 'react';
import { useThemeStore } from '../stores/themeStore';
import { useCartStore } from '../stores/cartStore';
import { Article } from '../core/types';
import { categoryRender, formatDate, tagRender } from '../helpers/functions';

interface ArticleHComponentProps {
  article: Article;
  addItem?: (id: number) => void;
  removeItem?: (id: number) => void;
  choose: boolean;
}

const ArticleHComponent: React.FC<ArticleHComponentProps> = ({ article, addItem, removeItem, choose }) => {
  const { theme } = useThemeStore();
  const { cart } = useCartStore();

  useEffect(() => {
    
  }, [cart]);
  
  return (
    <div className={`card text-bg-${theme}`}>
      <div className="row g-0">
        <div className="col-md-6">
          <img 
            src={article.img} 
            className="img-fluid rounded-start" 
            alt={article.label} 
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h4 className="card-title mb-3">
              {article.label}
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
                    onClick={() => addItem(article.id)}
                  >
                    Ajouter
                  </button>
                  :
                  false
                }
              </div>  
            </div>
            <p className="card-text">
              <span className="badge text-bg-primary">
                {categoryRender(article.category as number)}
              </span>
            </p>
            <p className="card-text">
              {article.description}
            </p>
            <p className="card-text">
              { 
                (article.tags || []).map((tag, j) => (
                  <span key={j} className="badge text-bg-secondary me-2">
                    {tagRender(tag)}
                  </span>
                ))
              }
            </p>
            <p className="card-text">
              <small className="text-muted">
                {formatDate(article.date_updated?.toString() || '')}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleHComponent;