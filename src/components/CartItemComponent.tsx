"use client";

import { modal } from '@/stores/appStore';
import { addAccompanement, addItemCart, findAccompanement, findItem, priceAccomp, removeAccompanement, removeItemCart } from '@/stores/cartStore';
import ArticleHComponent from '@/components/ArticleHComponent';
import { useEffect, useState } from 'react';
import { Cart } from '@/core/types';
import ItemListComponent from '@/components/ItemListComponent';
import { IArticle } from '@/core/interfaces';
import Image from 'next/image';

// --- Main CartItem ---
const CartItemComponent: React.FC<{ item: IArticle, articles: IArticle[] }> = ({ item, articles }) => {
  const [cartItem, setCartItem] = useState<Cart | undefined>(undefined);

  useEffect(() => {
    setCartItem(findItem(item.id as number));
  }, [item]);

  return (
    <div className="row mb-3">
      <div className="col-md-2 mb-3 mb-md-0">
        <Image
          src={item.image}
          alt={item.name}
          className="img-fluid rounded"
          width={150}
          height={150}
          objectFit="cover"
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
      <div className="col-md-6">
        <h5 className="card-title d-flex justify-content-between mb-2">
          <span className='text-truncate'>{item.name}</span>
          <span className="fs-6 text-small text-truncate">
            {(item.price || 0)} XOF
          </span>
        </h5>
        {cartItem && (
          <ItemListComponent
            label="Accompagnement"
            items={cartItem.accompanement}
            articles={articles}
            findFn={(subId) => findAccompanement(item.id as number, subId)}
            addFn={(subId) => addAccompanement(item.id as number, subId)}
            removeFn={(subId) => removeAccompanement(item.id as number, subId)}
            onRemove={(subId) => removeAccompanement(item.id as number, subId)}
          />
        )}
      </div>

      <div className="col-md-2 text-center">
        <h6 className="card-title text-truncate">
          <span className="fw-bold">Total : </span>
          { cartItem ?
            ((item.price || 0) 
            + priceAccomp(articles as IArticle[], cartItem as Cart))
          : 0} XOF
        </h6>
      </div>
      <div className="col-md-2 text-end">
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeItemCart(item.id as number)}>
          <i className="bi bi-trash"></i>
          <span className="d-none d-md-inline-block ms-2 fw-bold">Supprimer</span>
        </button>
      </div>
    </div>
  );
};

export default CartItemComponent;