/* eslint-disable @next/next/no-img-element */
"use client";
import React from 'react';
import { useThemeStore } from '../stores/themeStore';
import { Article } from '../core/types';
import { categoryRender, tagRender } from '../helpers/functions';
import { useFilterStore } from '../stores/filterStore';

interface ArticleVComponentProps {
  article: Article;
  action?: (id: number) => void;
  choose: boolean;
  addItem?: (id: number) => void;
  removeItem?: (id: number) => void;
}

const ArticleVComponent: React.FC<ArticleVComponentProps> = ({ article, action, choose, addItem, removeItem }) => {
  const { theme } = useThemeStore();
  const { selected } = useFilterStore();

  return (
    <div className={`card text-bg-${theme} ${choose ? 'border border-1 border-warning' : ''}`}>
      <img 
        src={article.img} 
        className="card-img-top" 
        alt={article.label} 
        style={{ height: '150px', objectFit: 'cover' }}
        onClick={() => action ? action(article.id) : false}
      />
      <div className="card-body">
        <h5 className="card-title text-truncate" onClick={() => action ? action(article.id) : false}>
          {article.label}
        </h5>

        <p className="card-text text-truncate" onClick={() => action ? action(article.id) : false}>
          {article?.category && <span className="badge text-bg-primary me-2">
            {categoryRender(article.category)}
          </span>}
          { selected.tag == null ? 
            article.tags.map((tag, j) => (
              <span key={j} className="badge text-bg-secondary me-2">
                {tagRender(tag)}
              </span>
            ))
            : 
            false
          }
        </p>
        <div className="card-text d-flex justify-content-between">
          <h5 className="text-danger text-nowrap me-3">{article.price} XOF</h5>
          {
            (choose && removeItem) ? 
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() => removeItem(article.id)}
            >
              Retirer
            </button>
            : 
            (addItem && !choose) ?
            <button
              type="button"
              className="btn btn-sm btn-warning"
              onClick={() => addItem(article.id)}
            >
              Ajouter
            </button>
            :
            false
          }
        </div>
      </div>
    </div>
  );
};

export default ArticleVComponent;