import {
  Button,
  CloseButton,
  Col,
  Modal,
  ModalBody,
  ProgressBar,
  Row,
  Table,
} from "react-bootstrap";
import { PokemonDetails, Product } from "../../../lib/types";
import axios from "axios";
import axiosClient from "../../../utils/axiosConf";
import { useGetToken } from "../../../hooks/useGetToken";
import { useContext, useEffect, useState } from "react";
import { ErrorContext, IErrorContext } from "../../../context/ErrorContext";
import { IShopContext, ShopContext } from "../../../context/ShopContext";
interface Props {
  show: boolean;
  product: Product;
  onHide: () => void;
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

const ProductModel = (props: Props) => {
  const { show, product, onHide } = props;
  const imgUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${product.nationalNum
    .toString()
    .padStart(3, "0")}.png`;
  const { headers } = useGetToken();
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const { addError } = useContext<IErrorContext>(ErrorContext);
  const { addToCart, getCartItemsCount } =
    useContext<IShopContext>(ShopContext);
  const count = getCartItemsCount(product.id);
  const getDetails = async (id: number) => {
    try {
      const res = await axiosClient.get(`/pokemon-details/${id}`, { headers });
      setDetails(res.data);
    } catch (err) {
      addError(err.message);
      console.error(err);
    }
  };

  const progressBar = (title: string, value: number | null, color: string) => {
    return (
      <tr>
        <th className="col-md-2">{title}</th>
        <td className="col-md-1">{value}</td>
        <td>
          <div
            className="progress"
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={`progress-bar bg-${color}`}
              style={{ width: value + "%" }}
            ></div>
          </div>
        </td>
      </tr>
    );
  };

  useEffect(() => {
    getDetails(product.id);
  }, [product.id]);
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <ModalBody>
        <Row className="g-0">
          <Col md={6}>
            <img src={imgUrl} alt={product.name} className="img-fluid" />
          </Col>
          <Col md={6}>
            <Row>
              <Col md={12}>
                <h3 className="text-center mb-3">{product.name}</h3>
              </Col>
              <CloseButton
                onClick={onHide}
                className="position-absolute top-0 end-0 fs-5 m-2"
              />
            </Row>
            <Table hover>
              <tbody>
                <tr>
                  <th>National №</th>
                  <td>{product.nationalNum}</td>
                </tr>
                <tr>
                  <th>Types</th>
                  <td>
                    {product.types.map(
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
                  </td>
                </tr>
                <tr>
                  <th>Species</th>
                  <td>{details?.species}</td>
                </tr>
                <tr>
                  <th>Height</th>
                  <td>{details?.height} m</td>
                </tr>
                <tr>
                  <th>Weight</th>
                  <td>{details?.weight} kg</td>
                </tr>
              </tbody>
              <tbody className="table-group-divider">
                <tr className="table-secondary">
                  <th>Quantity</th>
                  {product.quantity === 0 && (
                    <td className="text-danger fw-bold">Out of Stock</td>
                  )}
                  {product.quantity !== 0 && <td>{product.quantity}</td>}
                </tr>
                <tr className="table-secondary">
                  <th>Price</th>
                  <td>${product.price}</td>
                </tr>
                <tr>
                  {count > 0 && product.quantity !== 0 && (
                    <td
                      colSpan={2}
                      onClick={() => addToCart(product.id)}
                      className="text-center table-success fw-bold"
                    >
                      Add to Cart ({count})
                    </td>
                  )}
                  {count === 0 && product.quantity !== 0 && (
                    <td
                      colSpan={2}
                      onClick={() => addToCart(product.id)}
                      className="text-center table-primary fw-bold"
                    >
                      Add to Cart
                    </td>
                  )}
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="mx-2">
          <h4>Base Stats</h4>
          <Table>
            <tbody>
              {progressBar("HP", details?.hp, "success")}
              {progressBar("Attack", details?.attack, "danger")}
              {progressBar("Defense", details?.defense, "warning")}
              {progressBar("Sp Attack", details?.specialAttack, "info")}
              {progressBar("Sp Defense", details?.specialDefense, "secondary")}
              {progressBar("Speed", details?.speed, "primary")}
            </tbody>
          </Table>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default ProductModel;
