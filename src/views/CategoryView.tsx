import React from "react";
import { useThemeStore } from "../stores/themeStore";
import { categoryRender, tagRender } from "../helpers/functions";
import { modal } from "../stores/appStore";
import ArticleComponent from "../components/ArticleComponent";
import LightBox from "../components/widgets/LightBox";
import { Article } from "../helpers/types";
import { filteredArticles, useFilterStore } from "../stores/filterStore";
import { useParams } from "react-router-dom";

const CategoryView: React.FC = () => {
  const { theme } = useThemeStore();
  const { selected } = useFilterStore();
  const { id } = useParams();

  const prev = (index: number) => {
    if (index >= 0) {
      modal.open(
        <LightBox prev={() => prev(index - 1)} next={() => next(index + 1)}>
          <ArticleComponent article={filteredArticles(parseInt(id as string))[index]} />
        </LightBox>,
        "xl"
      );
    }
  };

  const next = (index: number) => {
    if (index < filteredArticles(parseInt(id as string)).length) {
      modal.open(
        <LightBox prev={() => prev(index - 1)} next={() => next(index + 1)}>
          <ArticleComponent article={filteredArticles(parseInt(id as string))[index]} />
        </LightBox>,
        "xl"
      );
    }
  };
  return (

    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
      {
        filteredArticles(parseInt(id as string)).map((article: Article, i) => (
          <div 
            key={i} 
            className="col"
            onClick={() => modal.open(
              <LightBox prev={() => prev(i - 1)} next={() => next(i + 1)}>
                <ArticleComponent article={article} />
              </LightBox>,
              "xl"
            )}
          >
            <div className={`card text-bg-${theme}`}>
              <img 
                src={article.img} 
                className="card-img-top" 
                alt={article.label} 
                style={{ height: '150px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h6 className="badge text-bg-primary float-end">
                  {categoryRender(article.category)}
                </h6>
                <h5 className="card-title text-truncate">
                  {article.label}
                </h5>
                { 
                  selected.tag == null ? 
                  <p className="card-text text-truncate">
                    { 
                      article.tags.map((tag, j) => (
                        <span key={j} className="badge text-bg-secondary me-2">
                          {tagRender(tag)}
                        </span>
                      ))
                    }
                  </p>
                  : false
                }
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default CategoryView;