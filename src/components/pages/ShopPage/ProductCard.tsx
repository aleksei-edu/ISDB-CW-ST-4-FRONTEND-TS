import { Button, Card, Col } from "react-bootstrap";
import { Product } from "../../../lib/types";

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
  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={imgUrl} alt={name}/>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 fw-bold text-muted">${price}</Card.Subtitle>
          <Card.Text>
            {types.map((type) => (
              bgcolor[type.toLowerCase()] &&
                <span key={type} className={`badge rounded-pill bg-${bgcolor[type.toLowerCase()]} me-1`}>
                {type}
              </span>
            ))}
          </Card.Text>
          <Button variant="primary">Add to Cart</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;
