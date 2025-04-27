import React, { useEffect } from 'react';
import { useThemeStore } from '../stores/themeStore';
import { clearCart, filterCartByCategory, useCartStore } from '../stores/cartStore';
import { categories } from '../core/constants';
import CartItem from '../components/widgets/CartItem';
import { useAuthStore } from '../stores/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';
import { useLangStore } from '../stores/langStore';

const CartView: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const { isAuthenticated } = useAuthStore();
  const { lang } = useLangStore();
  const { cart } = useCartStore();


  useEffect(() => {
  }, [cart]);

  const handleValidateCart = () => {
    if (!isAuthenticated) {
      navigate('/' + lang + '/login', { state: { from: '/client/cart' } });
    } else {
      navigate('/' + lang + '/client/cart/planning');
    }
  };

  function handleCategory(id: number): void {
    navigate('/' + lang + '/client/category/' + id)
  }
  const clear = () => {
    clearCart();
    navigate('/' + lang + '/client/category');
  };

  return (
    <div className="row">
      <div className="col-lg-8">
        {categories.map((category) =>
          filterCartByCategory(category.id as number).length > 0 ? (
            <div key={category.id} className={`card mb-3 text-bg-${theme}`}>
              <div className="card-body">
                <h5 className="card-title mb-3">{category.label}</h5>
                {filterCartByCategory(category.id as number).map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
      <div className="col-lg-4">
        <div className={`card p-3 text-bg-${theme} sticky-lg-top position-relative`}>
          <h5 className="card-title mb-3">Plats manquants</h5>
          <button className="position-absolute top-0 end-0 btn btn-sm btn-outline-danger m-3" onClick={clear}>Vider le panier</button>
          <ul className='list-group'>
            {categories.filter(category => category.id != null).map((category) =>
              filterCartByCategory(category.id as number).length == 0 ? (
                <li key={category.id} className={`list-group-item bg-${theme}`}>
                  <span className="text-danger">{category.label}</span>
                  <button className="btn btn-sm btn-outline-success ms-2" onClick={() => handleCategory(category.id as number)}>Ajouter</button>
                  <button className="btn btn-sm btn-outline-secondary ms-2">Ignorer</button>
                </li>
              ) : (
                <li key={category.id} className={`list-group-item text-bg-${theme}`}>
                  <span>{category.label}</span> 
                  <i className="bi bi-check2-square ms-2"></i>
                </li>
              )
            )}
          </ul>
          <hr />
          <div className="d-flex justify-content-between">
            <Link className="btn btn-secondary" to={'/'+lang+'/client/category'}>Retour</Link>
            <button
              className="btn btn-success"
              onClick={handleValidateCart}
            >
              Valider mon panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;