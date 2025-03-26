import React from 'react';
import { useThemeStore } from '../stores/themeStore';
import { Article } from '../helpers/types';
import { categoryRender, formateDate, tagRender, typeRender } from '../helpers/functions';

interface ArticleComponentProps {
  article: Article;
}

const ArticleComponent: React.FC<ArticleComponentProps> = ({ article }) => {
  const { theme } = useThemeStore();

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
            <h5 className="card-title">
              {article.label}
            </h5>
            <p className="card-text">
              <span className="badge text-bg-warning me-3">
                {typeRender(article.type)}
              </span>
              <span className="badge text-bg-primary">
                {categoryRender(article.category)}
              </span>
            </p>
            <p className="card-text">
              {article.description}
            </p>
            <p className="card-text">
              { 
                article.tags.map((tag, j) => (
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

export default ArticleComponent;