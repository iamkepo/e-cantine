/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from 'react';
import { useThemeStore } from '../stores/themeStore';
import { IArticle } from '../core/interfaces';
import { categoryRender } from '../helpers/functions';
// import { useFilterStore } from '../stores/filterStore';

interface ArticleVComponentProps {
  article: IArticle;
  action?: (id: number) => void;
  choose: boolean;
  addItem?: (id: number) => void;
  removeItem?: (id: number) => void;
}

const ArticleVComponent: React.FC<ArticleVComponentProps> = ({ article, action, choose, addItem, removeItem }) => {
  const { theme } = useThemeStore();
  // const { selected } = useFilterStore();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(choose);
  }, [choose]);

  return (
    <div className={`card text-bg-${theme} ${isSelected ? 'border border-1 border-warning' : ''}`}>
      <img 
        src={article.image} 
        className="card-img-top" 
        alt={article.name} 
        style={{ height: '150px', width: '100%', objectFit: 'cover' }}
        onClick={() => action ? action(article.id as number) : false}
      />
      <div className="card-body">
        <h5 className="card-title text-truncate" onClick={() => action ? action(article.id as number) : false}>
          {article.name}
        </h5>

        <p className="card-text text-truncate" onClick={() => action ? action(article.id as number) : false}>
          {article?.categoryId && <span className="badge text-bg-primary me-2">
            {categoryRender(article.categoryId)}
          </span>}
          {/* { selected.tag == null ? 
            article.tagIds.map((tag, j) => (
              <span key={j} className="badge text-bg-secondary me-2">
                {tagRender(tag)}
              </span>
            ))
            : 
            false
          } */}
        </p>
        <div className="card-text d-flex flex-wrap justify-content-between">
          <h5 className="text-danger text-nowrap me-3">{article.price} XOF</h5>
          {
            (isSelected && removeItem) ? 
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() => removeItem(article.id as number)}
            >
              Retirer
            </button>
            : 
            (addItem && !isSelected) ?
            <button
              type="button"
              className="btn btn-sm btn-warning"
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
  );
};

export default ArticleVComponent;