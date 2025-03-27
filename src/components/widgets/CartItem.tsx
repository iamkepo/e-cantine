// Reusable CartItem component
const CartItem: React.FC<{
  image: string;
  title: string;
  category: string;
  quantity: number;
  price: string;
  onQuantityChange: (newQuantity: number) => void;
  onRemove: () => void;
}> = ({ image, title, category, quantity, price, onQuantityChange, onRemove }) => (
  <div className="row cart-item mb-3">
    <div className="col-md-3">
      <img src={image} alt={title} className="img-fluid rounded" />
    </div>
    <div className="col-md-5">
      <h5 className="card-title">{title}</h5>
      <p className="text-muted">Category: {category}</p>
    </div>
    <div className="col-md-2">
      <div className="input-group">
        <button
          className="btn btn-outline-secondary btn-sm"
          type="button"
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
        >
          -
        </button>
        <input
          style={{ maxWidth: "100px" }}
          type="text"
          className="form-control form-control-sm text-center quantity-input"
          value={quantity}
          readOnly
        />
        <button
          className="btn btn-outline-secondary btn-sm"
          type="button"
          onClick={() => onQuantityChange(quantity + 1)}
        >
          +
        </button>
      </div>
    </div>
    <div className="col-md-2 text-end">
      <p className="fw-bold">{price}</p>
      <button className="btn btn-sm btn-outline-danger" onClick={onRemove}>
        <i className="bi bi-trash"></i>
      </button>
    </div>
  </div>
);
export default CartItem;