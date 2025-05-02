"use client";
import React from 'react';
import { Article, CItem } from '@/core/types';
import ArticleVComponent from '@/components/ArticleVComponent';
import { modal } from '@/stores/appStore';

type AddModalButtonProps = {
  label: string;
  items: CItem[];
  articles: Article[];
  findFn: (subId: number) => unknown;
  addFn: (subId: number) => void;
  removeFn: (subId: number) => void;
};

const AddModalButton: React.FC<AddModalButtonProps> = ({ label, items, articles, findFn, addFn, removeFn }) => {
  const action = () => {
    modal.open(
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {(articles || []).map((article, j) => (
          <div key={j} className="col">
            <ArticleVComponent
              article={article}
              choose={findFn(article.id) != undefined}
              addItem={() => {addFn(article.id); action();}}
              removeItem={() => {removeFn(article.id); action();}}
            />
          </div>
        ))}
        
      </div>,
      "xl"
    );
  };

  return (
    <button
      type="button"
      className={`btn btn-sm btn-outline-primary ${items?.length > 0 ? "ms-2" : "me-2 mb-2"}`}
      onClick={() => action()}
    >
      <i className="bi bi-plus"></i>
      {items?.length > 0 ? "" : label}
    </button>
  );
};

export default AddModalButton;
