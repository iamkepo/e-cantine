/* eslint-disable @next/next/no-img-element */
"use client";
import React from 'react';
import { CItem } from '@/core/types';
import ArticleHComponent from '@/components/ArticleHComponent';
import { modal } from '@/stores/appStore';
import { useThemeStore } from '@/stores/themeStore';
import { IArticle } from '@/core/interfaces';
import ArticleVComponent from './ArticleVComponent';

type ItemListProps = {
  label: string;
  items: CItem[];
  articles: IArticle[];
  findFn: (subId: number) => unknown;
  addFn: (subId: number) => void;
  removeFn: (subId: number) => void;
  onRemove: (subId: number) => void;
};

const ItemListComponent: React.FC<ItemListProps> = ({ label, items, articles,findFn, addFn, removeFn, onRemove }) => {
  const { theme } = useThemeStore();
  const actionOpen = (subId: number) => {
    modal.open(
      <ArticleHComponent
        article={articles.find(a => a.id === subId) as IArticle}
        choose={findFn(subId) != undefined}
        addItem={(id) => {addFn(id); actionOpen(id);}}
        removeItem={(id) => {removeFn(id); actionOpen(id);}}
      />,
      "xl"
    );
  };

  const actionChoose = () => {
    modal.open(
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {(articles || []).map((article, j) => (
          <div key={j} className="col">
            <ArticleVComponent
              article={article}
              choose={findFn(article.id as number) != undefined}
              addItem={() => {addFn(article.id as number); actionChoose();}}
              removeItem={() => {removeFn(article.id as number); actionChoose();}}
            />
          </div>
        ))}
        
      </div>,
      "xl"
    );
  };
  return (
    items.length > 0 ?
    <ul className="list-group mb-2">
      <li className={`list-group-item text-bg-${theme} d-flex justify-content-between align-items-center`}> 
        {items.length > 1 ? `${label}s` : label}
        <button
          type="button"
          className={`btn btn-sm btn-outline-primary ${items?.length > 0 ? "ms-2" : "me-2 mb-2"}`}
          onClick={() => actionChoose()}
        >
          <i className="bi bi-plus"></i>
          {items?.length > 0 ? "" : label}
        </button>
      </li>
      {items.map((sub, i) => (
        <li key={i} className={`list-group-item text-bg-${theme}`}>
          <div className="row g-2">
            <div className="col-md-3">
              <img
                src={articles.find(a => a.id === sub.id)?.image}
                alt={articles.find(a => a.id === sub.id)?.name}
                className="img-fluid rounded"
                style={{ maxHeight: '100px', width: '100%', objectFit: 'cover' }}
                onClick={() => actionOpen(sub.id)}
              />
            </div>
            <div className="col-md-9 d-flex justify-content-between align-items-center">
              <span className="fw-bold text-truncate">{articles.find(a => a.id === sub.id)?.name}</span>
              <span className="fs-6 text-small text-truncate">
                {(articles.find(a => a.id === sub.id)?.price || 0)} XOF
              </span>
              <button
                className="btn btn-sm btn-outline-danger ms-2"
                onClick={() => onRemove(sub.id)}
              >
                <i className="bi bi-trash" ></i>
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
    : 
    <button
      type="button"
      className={`btn btn-sm btn-outline-primary ${items?.length > 0 ? "ms-2" : "me-2 mb-2"}`}
      onClick={() => actionChoose()}
    >
      <i className="bi bi-plus"></i>
      {items?.length > 0 ? "" : label}
    </button>
  );
};
export default ItemListComponent;
