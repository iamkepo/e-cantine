"use client";
import React, { useEffect } from "react";
import { filteredArticles, useFilterStore } from "@/stores/filterStore";
import { useCartStore } from "@/stores/cartStore";
import { useThemeStore } from "@/stores/themeStore";
import { useLangStore } from "@/stores/langStore";
import LightBox from "@/components/widgets/LightBox";
import ArticleHComponent from "@/components/ArticleHComponent";
import { Article } from "@/core/types";
import { articlesPrincipal } from "@/core/constants";
import { modal } from "@/stores/appStore";
import ArticleVComponent from "@/components/ArticleVComponent";
import { addItemCart, findItem, removeItemCart } from "@/stores/cartStore";
import { categories } from "@/core/constants";
import Link from "next/link";

const Page: React.FC = () => {
  const { selected } = useFilterStore();
  const { cart } = useCartStore();
  const { theme } = useThemeStore();
  const { lang } = useLangStore();

  useEffect(() => {
  }, [selected, cart]);


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
    <div className="col-12 clearfix">
      <div className="float-end">
        <Link className={`btn btn-${theme}`} href={'/'+lang+'/client/filter'}>
          Filtres<i className={`bi bi-chevron-down fs-6`}></i>
        </Link>
      </div>
      <ul className="nav nav-tabs mb-4">
        {
          categories.map((category, i) => (
            <li key={i} className="nav-item">
              <Link
                className={`nav-link text-bg-${category.id == null ? "primary active" : theme}`} 
                href={'/'+lang+'/client/' + (category.id != null ? "filter/"+category.id : '')}
              >
                {category.label}
              </Link>
            </li>
          ))
        }
      </ul>
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        {
          filteredArticles(articlesPrincipal).map((article: Article, i: number) => (
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
    </div>
  );
};

export default Page;