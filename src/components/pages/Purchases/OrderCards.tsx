import { Col, Row, Table } from "react-bootstrap";
import { Product } from "../../../lib/types";

interface Props {
  product: Product;
}
const OrderCards: React.FC<Props> = (props: Props) => {
  const { id, name, nationalNum, pokemonImageLink, types, price, quantity } =
    props.product;
  const imgUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${nationalNum
    .toString()
    .padStart(3, "0")}.png`;

  return (
    <Row>
      <div className="card mb-2 p-2" >
        <div className="row g-0">
          <div className="col-md-2">
            <img src={imgUrl} alt={name} className="img-fluid"/>
          </div>
          <div className="col-md-4 mx-2 position-relative">
            <Table striped bordered>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{name}</td>
                    </tr>
                    <tr>
                        <th>Price</th>
                        <td>${price}</td>
                    </tr>
                    <tr>
                        <th>Quantity</th>
                        <td>{quantity}</td>
                    </tr>
                </tbody>
            </Table>
          </div>
        </div>
      </div>
    </Row>
  );
};

export default OrderCards;
