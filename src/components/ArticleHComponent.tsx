import React, { useEffect } from 'react';
import { useThemeStore } from '../stores/themeStore';
import { addItemCart, findAndItem, useCartStore } from '../stores/cartStore';
import { Article, Cart } from '../helpers/types';
import { categoryRender, formateDate, tagRender, typeRender } from '../helpers/functions';
import Counter from './widgets/Counter';

interface ArticleHComponentProps {
  article: Article | Cart;
}

const ArticleHComponent: React.FC<ArticleHComponentProps> = ({ article }) => {
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
                  findAndItem(article.id as number) != undefined ? 
                  <Counter item={findAndItem(article.id as number) as Cart} />
                  :
                  <button
                    type="button"
                    className="btn btn-warning float-end"
                    onClick={() => addItemCart({ ...article, count: 1 })}
                  >
                    Ajouter
                  </button>
                }
              </div>  
            </div>
            <p className="card-text">
              <span className="badge text-bg-primary">
                {categoryRender(article.category as number)} - {typeRender(article.type as number)}
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
                {formateDate(article.date_updated)}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleHComponent;