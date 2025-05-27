"use client";
import { IArticle } from "@/core/interfaces";
import ArticleVComponent from "../ArticleVComponent";
import { Cart } from "@/core/types";

interface Props {
  articles: IArticle[];
  openLightBox: (article: IArticle, i: number) => void;
  findItem: (id: number) => Cart | undefined;
  addItem: (id: number) => void;
  removeItem: (id: number) => void;
}

const ArticlesBlock: React.FC<Props> = ({ articles, openLightBox, findItem, addItem, removeItem }) => {

  return (
    articles.map((article: IArticle, i) => (
      <div key={i} className="col">
        <ArticleVComponent 
          article={article}
          action={() => openLightBox(article, i)}
          choose={findItem(article.id as number) != undefined}
          addItem={(id) => addItem(id)}
          removeItem={(id) => removeItem(id)}
        />
      </div>
    ))
  );
};

export default ArticlesBlock;
