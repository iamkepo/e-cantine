import { Article } from '../../core/types';
import { modal } from '../../stores/appStore';
import { addAccompanement, addBoisson, addItemCart, findAccompanement, findBoisson, findItem, priceAccomp, priceBoisson, removeAccompanement, removeBoisson, removeItemCart } from '../../stores/cartStore';
import ArticleHComponent from '../ArticleHComponent';
import { articlesBoisson, articlesSupplement } from '../../core/constants';
import { useEffect, useState } from 'react';
import { Cart } from '../../core/types';
import ItemList from './ItemList';
import AddModalButton from './AddModalButton';

// --- Main CartItem ---
const CartItem: React.FC<{ item: Article }> = ({ item }) => {
  const [cartItem, setCartItem] = useState<Cart | undefined>(undefined);

  useEffect(() => {
    setCartItem(findItem(item.id as number));
  }, [item]);

  return (
    <div className="row mb-3">
      <div className="col-md-2">
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
          <div className="col-12">
            <div className={`${cartItem?.accompanement?.length > 0 ? "row" : "d-inline"}`}>
              {cartItem?.accompanement?.length > 0 && (
                <div className="col">
                  <ItemList
                    items={cartItem.accompanement}
                    articles={articlesSupplement}
                    findFn={(subId) => findAccompanement(item.id as number, subId)}
                    addFn={(subId) => addAccompanement(item.id as number, subId)}
                    removeFn={(subId) => removeAccompanement(item.id as number, subId)}
                    onRemove={(subId) => removeAccompanement(item.id as number, subId)}
                  />
                </div>
              )}
              <div className={`${cartItem?.accompanement?.length > 0 ? "col-1" : "d-inline"}`}>
                <AddModalButton
                  label="Accompagnement"
                  items={cartItem.accompanement}
                  articles={articlesSupplement}
                  itemId={item.id as number}
                  findFn={findAccompanement}
                  addFn={addAccompanement}
                  removeFn={removeAccompanement}
                />
              </div>
            </div>
            <div className={`${cartItem?.boisson?.length > 0 ? "row" : "d-inline"}`}>
              {cartItem?.boisson?.length > 0 && (
                <div className="col">
                  <ItemList
                    items={cartItem.boisson}
                    articles={articlesBoisson}
                    findFn={(subId) => findBoisson(item.id as number, subId)}
                    addFn={(subId) => addBoisson(item.id as number, subId)}
                    removeFn={(subId) => removeBoisson(item.id as number, subId)}
                    onRemove={(subId) => removeBoisson(item.id as number, subId)}
                  />
                </div>
              )}
              <div className={`${cartItem?.boisson?.length > 0 ? "col-1" : "d-inline"}`}>
                <AddModalButton
                  label="Boisson"
                  items={cartItem.boisson}
                  articles={articlesBoisson}
                  itemId={item.id as number}
                  findFn={findBoisson}
                  addFn={addBoisson}
                  removeFn={removeBoisson}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="col-md-3 text-end">
        <p className="fs-6 fw-bold">
          { cartItem ?
            ((item.price || 0) 
            + priceAccomp(articlesSupplement, cartItem as Cart) 
            + priceBoisson(articlesBoisson, cartItem as Cart)).toFixed(2)
          : 0} XOF
        </p>
        <button className="btn btn-sm btn-outline-danger" onClick={() => removeItemCart(item.id as number)}>
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default CartItem;