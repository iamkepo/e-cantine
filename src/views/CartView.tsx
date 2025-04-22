import React, { useEffect } from 'react';
import { useThemeStore } from '../stores/themeStore';
import { filterCartByCategory, useCartStore } from '../stores/cartStore';
import { categories } from '../core/constants';
import CartItem from '../components/widgets/CartItem';
import { useAuthStore } from '../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
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
      navigate('/login', { state: { from: '/cart/' } });
    } else {
      navigate('/' + lang + '/planning');
    }
  };

  function handleCategory(id: number): void {
    navigate('/' + lang + '/category/' + id)
  }

  return (
    <div className="col-12 col-lg-11 p-3 mx-auto mt-4">
      <div className="d-flex mb-4">
        <button
          type="button"
          className="btn btn-primary mb-4 me-3"
          onClick={() => window.history.back()}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <h3>Shopping Cart</h3>
      </div>
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
          <div className={`card p-3 text-bg-${theme} sticky-lg-top`}>
            <div className="mt-3">
              <h5 className="card-title mb-3">Plats manquants</h5>
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
            </div>
            <div className="mt-4">
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
    </div>
  );
};

export default CartView;