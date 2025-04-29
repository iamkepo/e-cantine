import React, { useEffect } from "react";
import { modal } from "../stores/appStore";
import ArticleHComponent from "../components/ArticleHComponent";
import LightBox from "../components/widgets/LightBox";
import { Article } from "../core/types";
import { filteredArticles, useFilterStore } from "../stores/filterStore";
import { useParams } from "react-router-dom";
import ArticleVComponent from "../components/ArticleVComponent";
import { articlesPrincipal } from "../core/constants";
import { addItemCart, findItem, removeItemCart, useCartStore } from "../stores/cartStore";

const CategoryView: React.FC = () => {
  const { id } = useParams();
  const { selected } = useFilterStore();
  const { cart } = useCartStore();

  useEffect(() => {
  }, [id, selected, cart]);

  const prev = (index: number) => {
    if (index >= 0) {
      const article = filteredArticles(articlesPrincipal, parseInt(id as string))[index];
      modal.open(
        <LightBox prev={() => prev(index - 1)} next={() => next(index + 1)}>
          <ArticleHComponent 
            article={article} 
            choose={findItem(article.id as number) != undefined} 
            addItem={(id) => addItemCart(id)} 
            removeItem={(id) => removeItemCart(id)} 
          />
        </LightBox>,
        "xl"
      );
    }
  };

  const next = (index: number) => {
    if (index < filteredArticles(articlesPrincipal, parseInt(id as string)).length) {
      const article = filteredArticles(articlesPrincipal, parseInt(id as string))[index];
      modal.open(
        <LightBox prev={() => prev(index - 1)} next={() => next(index + 1)}>
          <ArticleHComponent 
            article={article} 
            choose={findItem(article.id as number) != undefined} 
            addItem={(id) => addItemCart(id)} 
            removeItem={(id) => removeItemCart(id)} 
          />
        </LightBox>,
        "xl"
      );
    }
  };
  return (

    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {
        filteredArticles(articlesPrincipal, parseInt(id as string)).map((article: Article, i) => (
          <div 
            key={i} 
            className="col"
          >
            <ArticleVComponent 
              article={article}
              action={() => modal.open(
                <LightBox prev={() => prev(i - 1)} next={() => next(i + 1)}>
                  <ArticleHComponent 
                    article={article} 
                    choose={findItem(article.id as number) != undefined} 
                    addItem={(id) => addItemCart(id)} removeItem={(id) => removeItemCart(id)} 
                  />
                </LightBox>,
                "xl"
              )}
              choose={findItem(article.id as number) != undefined}
              addItem={(id) => addItemCart(id)}
              removeItem={(id) => removeItemCart(id)}
            />
          </div>
        ))
      }
    </div>
  );
};

export default CategoryView;