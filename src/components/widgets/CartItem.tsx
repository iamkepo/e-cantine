/* eslint-disable @next/next/no-img-element */
"use client";
import { Article } from '@/core/types';
import { modal } from '@/stores/appStore';
import { addAccompanement, addItemCart, findAccompanement, findItem, priceAccomp, removeAccompanement, removeItemCart } from '@/stores/cartStore';
import ArticleHComponent from '@/components/ArticleHComponent';
import { articlesBoisson, articlesSupplement } from '@/core/constants';
import { useEffect, useState } from 'react';
import { Cart } from '@/core/types';
import ItemList from '@/components/widgets/ItemList';

// --- Main CartItem ---
const CartItem: React.FC<{ item: Article }> = ({ item }) => {
  const [cartItem, setCartItem] = useState<Cart | undefined>(undefined);

  useEffect(() => {
    setCartItem(findItem(item.id as number));
  }, [item]);

  return (
    <div className="row mb-3">
      <div className="col-md-2 mb-3 mb-md-0">
        <img
          src={item.img}
          alt={item.label}
          className="img-fluid rounded"
          onClick={() => modal.open(
            <ArticleHComponent
              article={item}
              choose={cartItem != undefined}
              addItem={(id) => addItemCart(id)}
              removeItem={(id) => removeItemCart(id)}
            />,
            "xl"
          )}
        />
      </div>
      <div className="col-md-7">
        <h5 className="card-title">
          {item.label}
          <span className="float-end fs-6 text-small">
            {(item.price || 0).toFixed(2)} XOF
          </span>
        </h5>
        {cartItem && (
          <ItemList
            label="Accompagnement"
            items={cartItem.accompanement}
            articles={[...articlesSupplement, ...articlesBoisson]}
            findFn={(subId) => findAccompanement(item.id as number, subId)}
            addFn={(subId) => addAccompanement(item.id as number, subId)}
            removeFn={(subId) => removeAccompanement(item.id as number, subId)}
            onRemove={(subId) => removeAccompanement(item.id as number, subId)}
          />
        )}
      </div>

      <div className="col-md-3 text-end">
        <h6 className="card-title">
          { cartItem ?
            ((item.price || 0) 
            + priceAccomp(articlesSupplement, cartItem as Cart)).toFixed(2)
          : 0} XOF
        </h6>
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeItemCart(item.id as number)}>
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default CartItem;