import { typeRender } from '../../helpers/functions';
import { Cart } from '../../helpers/types';
import { modal } from '../../stores/appStore';
import { removeItemCart } from '../../stores/cartStore';
import ArticleHComponent from '../ArticleHComponent';
import Counter from './Counter';

const CartItem: React.FC<{ item: Cart; }> = ({ item }) => (
  <div className="row mb-3">
    <div className="col-md-2">
      <img 
        src={item.img} 
        alt={item.label} 
        className="img-fluid rounded" 
        onClick={() => modal.open(
          <ArticleHComponent article={item} />,
          "xl"
        )}
      />
    </div>
    <div className="col-md-5">
      <h5 className="card-title">{item.label}</h5>
      <p className="badge text-bg-secondary">{typeRender(item.type as number)}</p>
    </div>
    <div className="col-md-2">
      <Counter item={item} />
    </div>
    <div className="col-md-2">
      <p className="fw-bold">{(item.count * (item.price || 0)).toFixed(2)} XOF</p>
    </div>
    <div className="col-md-1 text-end">
      <button className="btn btn-sm btn-outline-danger" onClick={()=>removeItemCart(item.id as number)}>
        <i className="bi bi-trash"></i>
      </button>
    </div>
  </div>
);
export default CartItem;