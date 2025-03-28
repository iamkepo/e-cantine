import React, { useEffect } from "react";

import LightBox from "../components/widgets/LightBox";
import ArticleHComponent from "../components/ArticleHComponent";

import { Article } from "../helpers/types";

import { modal } from "../stores/appStore";
import { filteredArticles, useFilterStore } from "../stores/filterStore";
import ArticleVComponent from "../components/ArticleVComponent";
import { articles } from "../helpers/constants";

const HomeView: React.FC = () => {
  const { selected } = useFilterStore();

  useEffect(() => {
    
  }, [selected]);


  const prev = (index: number) => {
    if (index >= 0) {
      modal.open(
        <LightBox prev={() => prev(index - 1)} next={() => next(index + 1)}>
          <ArticleHComponent article={filteredArticles(articles)[index]} />
        </LightBox>,
        "xl"
      );
    }
  };

  const next = (index: number) => {
    if (index < filteredArticles(articles).length) {
      modal.open(
        <LightBox prev={() => prev(index - 1)} next={() => next(index + 1)}>
          <ArticleHComponent article={filteredArticles(articles)[index]} />
        </LightBox>,
        "xl"
      );
    }
  };
  return (

    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {
        filteredArticles(articles).map((article: Article, i) => (
          <div 
            key={i} 
            className="col"
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

export default HomeView;