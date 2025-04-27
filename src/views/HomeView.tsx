import React, { useEffect } from "react";

import LightBox from "../components/widgets/LightBox";
import ArticleHComponent from "../components/ArticleHComponent";

import { Article } from "../core/types";
import { articlesPrincipal } from "../core/constants"; 
import { modal } from "../stores/appStore";
import { filteredArticles, useFilterStore } from "../stores/filterStore";
import ArticleVComponent from "../components/ArticleVComponent";
import { useCartStore } from "../stores/cartStore";
import { categories } from "../core/constants";
import { Link } from "react-router-dom";
import { useThemeStore } from "../stores/themeStore";
import { useLangStore } from "../stores/langStore";

const HomeView: React.FC = () => {
  const { selected } = useFilterStore();
  const { cart } = useCartStore();
  const { theme } = useThemeStore();
  const { lang } = useLangStore();

  useEffect(() => {
    
  }, [selected, cart]);


  const prev = (index: number) => {
    if (index >= 0) {
      modal.open(
        <LightBox prev={() => prev(index - 1)} next={() => next(index + 1)}>
          <ArticleHComponent article={filteredArticles(articlesPrincipal)[index]} />
        </LightBox>,
        "xl"
      );
    }
  };

  const next = (index: number) => {
    if (index < filteredArticles(articlesPrincipal).length) {
      modal.open(
        <LightBox prev={() => prev(index - 1)} next={() => next(index + 1)}>
          <ArticleHComponent article={filteredArticles(articlesPrincipal)[index]} />
        </LightBox>,
        "xl"
      );
    }
  };
  return (
    <div className="col-12 clearfix">
      <div className="float-end">
        <Link className={`btn btn-${theme}`} to={'/'+lang+'/client/filter'}>
          Filtres<i className={`bi bi-chevron-down fs-6`}></i>
        </Link>
      </div>
      <ul className="nav nav-tabs mb-4">
        {
          categories.map((category, i) => (
            <li key={i} className="nav-item">
              <Link
                className={`nav-link text-bg-${category.id == null ? "primary active" : theme}`} 
                to={'/'+lang+'/client/' + (category.id != null ? "filter/"+category.id : '')}
              >
                {category.label}
              </Link>
            </li>
          ))
        }
      </ul>
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        {
          filteredArticles(articlesPrincipal).map((article: Article, i) => (
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
    </div>
  );
};

export default HomeView;