"use client";
import React from "react";
import { findItem, useCartStore } from "@/stores/cartStore";
import { filteredArticles, useFilterStore } from "@/stores/filterStore";
import { useEffect } from "react";
import { Article } from "@/core/types";
import ArticleHComponent from "@/components/ArticleHComponent";
import { articlesPrincipal } from "@/core/constants";
import { addItemCart, removeItemCart } from "@/stores/cartStore";
import LightBox from "@/components/widgets/LightBox";
import { modal } from "@/stores/appStore";
import ArticleVComponent from "@/components/ArticleVComponent";
import { usePathname } from "next/navigation";

const Page: React.FC = () => {
  const { selected } = useFilterStore();
  const { cart } = useCartStore();
  const route = usePathname();

  useEffect(() => {
  }, [selected, cart, route]);

  const prevLightBox = (index: number) => {
    if (index >= 0) {
      const article = filteredArticles(articlesPrincipal)[index];
      modal.open(
        <LightBox prev={() => prevLightBox(index - 1)} next={() => nextLightBox(index + 1)}>
          <ArticleHComponent 
            article={article} 
            choose={findItem(article.id as number) != undefined} 
            addItem={(id) => {addItemCart(id); openLightBox(article, index);}} 
            removeItem={(id) => {removeItemCart(id); openLightBox(article, index);}} 
          />
        </LightBox>,
        "xl"
      );
    }
  };

  const nextLightBox = (index: number) => {
    if (index < filteredArticles(articlesPrincipal).length) {
      const article = filteredArticles(articlesPrincipal)[index];
      modal.open(
        <LightBox prev={() => prevLightBox(index - 1)} next={() => nextLightBox(index + 1)}>
          <ArticleHComponent 
            article={article} 
            choose={findItem(article.id as number) != undefined} 
            addItem={(id) => {addItemCart(id); openLightBox(article, index);}} 
            removeItem={(id) => {removeItemCart(id); openLightBox(article, index);}} 
          />
        </LightBox>,
        "xl"
      );
    }
  };

  const openLightBox = (article: Article, i: number) => {
    modal.open(
      <LightBox prev={() => prevLightBox(i - 1)} next={() => nextLightBox(i + 1)}>
        <ArticleHComponent 
          article={article} 
          choose={findItem(article.id as number) != undefined} 
          addItem={(id) => {addItemCart(id); openLightBox(article, i);}} 
          removeItem={(id) => {removeItemCart(id); openLightBox(article, i);}} 
        />
      </LightBox>,
      "xl"
    );
  };

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {
        filteredArticles(articlesPrincipal).map((article: Article, i) => (
          <div 
            key={i} 
            className="col"
          >
            <ArticleVComponent 
              article={article}
              action={() => openLightBox(article, i)}
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

export default Page;