import React from 'react';
import { useThemeStore } from '../stores/themeStore';
import { Article } from '../helpers/types';
import { categoryRender, tagRender, typeRender } from '../helpers/functions';
import { useFilterStore } from '../stores/filterStore';

interface ArticleVComponentProps {
  article: Article;
  action: ()=> void
}

const ArticleVComponent: React.FC<ArticleVComponentProps> = ({ article, action }) => {
  const { theme } = useThemeStore();
    const { selected } = useFilterStore();

  return (
    <div className={`card text-bg-${theme}`}>
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
        <p className="card-text text-truncate">
          <button type="button" className="btn btn-sm btn-warning float-end">
            Ajouter
          </button>
          <span className="text-danger">{article.price} FCFA</span>
        </p>
      </div>
    </div>
  );
};

export default ArticleVComponent;