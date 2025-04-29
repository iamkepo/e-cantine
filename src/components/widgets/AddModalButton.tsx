import React from 'react';
import { Article, CItem } from '../../core/types';
import ArticleVComponent from '../ArticleVComponent';
import { modal } from '../../stores/appStore';

type AddModalButtonProps = {
  label: string;
  items: CItem[];
  articles: Article[];
  itemId: number;
  findFn: (itemId: number, subId: number) => unknown;
  addFn: (itemId: number, subId: number) => void;
  removeFn: (itemId: number, subId: number) => void;
};

const AddModalButton: React.FC<AddModalButtonProps> = ({ label, items, articles, itemId, findFn, addFn, removeFn }) => {
  const action = () => {
    modal.open(
      <div className="row row-cols-4 g-3">
        {(articles || []).map((article, j) => (
          <div key={j} className="col">
            <ArticleVComponent
              article={article}
              choose={findFn(itemId, article.id) != undefined}
              addItem={() => {addFn(itemId, article.id); action();}}
              removeItem={() => {removeFn(itemId, article.id); action();}}
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
      className="btn btn-sm btn-outline-primary me-2 mb-2"
      onClick={() => action()}
    >
      <i className="bi bi-plus"></i>
      {items?.length > 0 ? "" : label}
    </button>
  );
};

export default AddModalButton;
