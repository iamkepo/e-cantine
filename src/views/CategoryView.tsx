import React, { useEffect } from "react";
import { modal } from "../stores/appStore";
import ArticleHComponent from "../components/ArticleHComponent";
import LightBox from "../components/widgets/LightBox";
import { Article } from "../helpers/types";
import { filteredArticles, useFilterStore } from "../stores/filterStore";
import { useParams } from "react-router-dom";
import ArticleVComponent from "../components/ArticleVComponent";
import { articles } from "../helpers/constants";

const CategoryView: React.FC = () => {
  const { id } = useParams();
  const { selected } = useFilterStore();

  useEffect(() => {
    
  }, [id, selected]);

  const prev = (index: number) => {
    if (index >= 0) {
      modal.open(
        <LightBox prev={() => prev(index - 1)} next={() => next(index + 1)}>
          <ArticleHComponent article={filteredArticles(articles, parseInt(id as string))[index]} />
        </LightBox>,
        "xl"
      );
    }
  };

  const next = (index: number) => {
    if (index < filteredArticles(articles, parseInt(id as string)).length) {
      modal.open(
        <LightBox prev={() => prev(index - 1)} next={() => next(index + 1)}>
          <ArticleHComponent article={filteredArticles(articles, parseInt(id as string))[index]} />
        </LightBox>,
        "xl"
      );
    }
  };
  return (

    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {
        filteredArticles(articles, parseInt(id as string)).map((article: Article, i) => (
          <div 
            key={i} 
            className="col"
            onClick={() => modal.open(
              <LightBox prev={() => prev(i - 1)} next={() => next(i + 1)}>
                <ArticleHComponent article={article} />
              </LightBox>,
              "xl"
            )}
          >
            <ArticleVComponent 
              article={article}
              action={() => modal.open(
                <LightBox prev={() => prev(i - 1)} next={() => next(i + 1)}>
                  <ArticleHComponent article={article} />
                </LightBox>,
                "xl"
              )}
            />
          </div>
        ))
      }
    </div>
  );
};

export default CategoryView;