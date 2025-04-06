import React from 'react';
import { useThemeStore } from '../stores/themeStore';
import { Article } from '../helpers/types';
import { categoryRender, tagRender, typeRender } from '../helpers/functions';
import { useFilterStore } from '../stores/filterStore';
import { addItemCart, findAndItem, removeItemCart } from '../stores/cartStore';

interface ArticleVComponentProps {
  article: Article;
  action: ()=> void
}

const ArticleVComponent: React.FC<ArticleVComponentProps> = ({ article, action }) => {
  const { theme } = useThemeStore();
  const { selected } = useFilterStore();

  return (
    <div className={`card text-bg-${theme} ${findAndItem(article.id as number) != undefined ? 'border border-2 border-warning' : ''}`}>
      <img 
        src={article.img} 
        className="card-img-top" 
        alt={article.label} 
        style={{ height: '150px', objectFit: 'cover' }}
        onClick={action}
      />
      <div className="card-body">
        <h5 className="card-title text-truncate">
          {article.label}
        </h5>

        <p className="card-text text-truncate">
          <span className="badge text-bg-primary me-2">
            {categoryRender(article.category)} - {typeRender(article.type)}
          </span>
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
            findAndItem(article.id) ? 
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() => removeItemCart(article.id as number)}
            >
              Retirer
            </button>
            :
            <button
              type="button"
              className="btn btn-sm btn-warning"
              onClick={() => addItemCart({ ...article, count: 1 })}
            >
              Ajouter
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default ArticleVComponent;