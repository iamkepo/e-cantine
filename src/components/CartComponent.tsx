import React, { useState } from 'react';
import { useThemeStore } from '../stores/themeStore';
import { modal } from '../stores/appStore';
import CartItem from './widgets/CartItem';
import OrderSummary from './widgets/OrderSummary';

const CartComponent: React.FC = () => {
  const { theme } = useThemeStore();
  const [cartItems, setCartItems] = useState([
    { id: 1, image: "https://via.placeholder.com/100", title: "Product 1", category: "Electronics", quantity: 1, price: 99.99 },
    { id: 2, image: "https://via.placeholder.com/100", title: "Product 2", category: "Clothing", quantity: 2, price: 49.99 },
  ]);
  const [subtotal, setSubtotal] = useState(199.97);
  const shipping = 10.0;
  const tax = 20.0;

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    recalculateSubtotal();
  };

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    recalculateSubtotal();
  };

  const recalculateSubtotal = () => {
    setSubtotal(
      cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0)
    );
  };

  const applyPromoCode = (code: string) => {
    // Example promo code logic
    if (code === "DISCOUNT10") {
      setSubtotal((prevSubtotal) => prevSubtotal * 0.9);
    }
  };

  return (
    <div className={`card text-bg-${theme}`}>
      <h3>Your Shopping Cart</h3>
      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  category={item.category}
                  quantity={item.quantity}
                  price={`$${(item.quantity * item.price).toFixed(2)}`}
                  onQuantityChange={(newQuantity) =>
                    updateQuantity(item.id, newQuantity)
                  }
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </div>
          </div>
          <div className="text-start mb-4">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => modal.close()}
            >
              <i className="bi bi-arrow-left me-2"></i>Continue Shopping
            </button>
          </div>
        </div>
        <div className="col-lg-4">
          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            onApplyPromo={applyPromoCode}
          />
        </div>
      </div>
    </div>
  );
};

export default CartComponent;