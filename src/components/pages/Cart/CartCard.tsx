import { useContext } from "react";
import { IShopContext, ShopContext } from "../../../context/ShopContext";
import { Product } from "../../../lib/types";
import { Card, Col } from "react-bootstrap";

interface Props {
  product: Product;
}

const CartCard: React.FC<Props> = (props: Props) => {
  const { id, name, nationalNum, pokemonImageLink, types, price, quantity } =
    props.product;
  const imgUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${nationalNum
    .toString()
    .padStart(3, "0")}.png`;
  const { addToCart, getCartItemsCount, removeFromCart, updateCartItem } =
    useContext<IShopContext>(ShopContext);
  const count = getCartItemsCount(id);
  return (
    <Col md="auto">
      <div className="card mb-3" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-6">
            <img src={imgUrl} alt={name} className="img-fluid rounded-start" />
          </div>
          <div className="col-md-4 position-relative">
            <div className="row g-0">
                <div className="col-md-12 card-body mb-5 pt-3">
                <h5 className="card-title fs-4">{name}</h5>
                <p className="card-text fs-4">
                    <>${price}</>
                </p>
                </div>
                <div className="col-md-9 position-absolute bottom-0 start-0 pb-3 text-danger h4 text-center" > Total: ${price*count}</div>
            </div>
          </div>
          <div className="col-md-2">
            <div
              className="btn-group-vertical h-100 input-group-lg w-40 py-4 p-2"
              role="group"
            >
              <button
                className="btn btn-primary fs-3"
                onClick={() => addToCart(id)}
              >
                +
              </button>
              <input
                type="number"
                value={count}
                className="form-control fs-5"
                onChange={(e) => updateCartItem(id, Number(e.target.value))}
                placeholder=""
              ></input>
              <button
                className="btn btn-primary fs-3"
                onClick={() => removeFromCart(id)}
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default CartCard;
