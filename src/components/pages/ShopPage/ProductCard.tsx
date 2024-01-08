import { Button, Card, Col } from "react-bootstrap";
import { Product } from "../../../lib/types";
import { useContext, useState } from "react";
import { IShopContext, ShopContext } from "../../../context/ShopContext";
import ProductModel from "./ProductModel";

interface Props {
  product: Product;
}

const bgcolor = {
  bug: "success",
  dark: "dark",
  dragon: "primary",
  electric: "warning",
  fairy: "secondary",
  fighting: "danger",
  fire: "danger",
  flying: "info",
  ghost: "dark",
  grass: "success",
  ground: "warning",
  ice: "info",
  normal: "warning",
  poison: "danger",
  psychic: "dark",
  rock: "warning",
  steel: "secondary",
  water: "primary",
};

const ProductCard: React.FC<Props> = (props: Props) => {
  const { id, name, nationalNum, pokemonImageLink, types, price, quantity } =
    props.product;
  const imgUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${nationalNum
    .toString()
    .padStart(3, "0")}.png`;
  const { addToCart, getCartItemsCount } =
    useContext<IShopContext>(ShopContext);
  const count = getCartItemsCount(id);

  const [showDetails, setShowDetails] = useState(false);
  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={imgUrl} alt={name} onClick={()=> setShowDetails(true)}/>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 fw-bold text-muted">
            ${price}
          </Card.Subtitle>
          <Card.Text>
            {types.map(
              (type) =>
                bgcolor[type.toLowerCase()] && (
                  <span
                    key={type}
                    className={`badge rounded-pill bg-${
                      bgcolor[type.toLowerCase()]
                    } me-1`}
                  >
                    {type}
                  </span>
                )
            )}
          </Card.Text>
          {count > 0 && quantity !== 0 && (
            <Button
              variant="success"
              className="me-2 fw-bold"
              onClick={() => addToCart(id)}
            >
              Add to Cart ({count})
            </Button>
          )}
          {count === 0 && quantity !== 0 && (
            <Button variant="primary" className="fw-bold" onClick={() => addToCart(id)}>
              Add to Cart
            </Button>
          )}
          {quantity === 0 && (
            <Button variant="danger" className="fw-bold">
              Out of Stock
            </Button>
          )}
        </Card.Body>
      </Card>
      <ProductModel show={showDetails} product={props.product} onHide={()=> setShowDetails(false)}/>
    </Col>
  );
};

export default ProductCard;
