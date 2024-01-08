import { useContext, useEffect, useState } from "react";
import { useGetProducts } from "../../../hooks/useGetProducts";
import { Product } from "../../../lib/types";
import { IShopContext, ShopContext } from "../../../context/ShopContext";
import { Col, Row } from "react-bootstrap";
import CartCard from "./CartCard";
import CartPlaceholders from "./CartPlaceholders";
import EmptyCart from "./EmptyCart";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {
    getCartItemsCount,
    getTotalCartItemsCount,
    getTotalCartAmount,
    checkout,
  } = useContext<IShopContext>(ShopContext);
  const totalCount = getTotalCartItemsCount();
  const { products } = useGetProducts({ setLoading: setLoading });
  const totalPrice = getTotalCartAmount();
  return (
    <>
      <div className="container">
        {totalCount !== 0 && (
          <Row className="justify-content-md-center">
            <Col xs lg="2"></Col>
            <Col md="auto">
              <h1 className="mt-4 text-uppercase p-5 ">Your cart items</h1>
            </Col>
            <Col xs lg="2"></Col>
          </Row>
        )}
        {totalCount === 0 && <EmptyCart />}

        {loading &&
          Array.from({ length: 5 }).map((_, idx) => {
            return (
              <Row key={idx} className="justify-content-md-center">
                <Col xs lg="2"></Col>
                <CartPlaceholders key={idx} />
                <Col xs lg="2"></Col>
              </Row>
            );
          })}
        {!loading &&
          products.map((product) => {
            if (getCartItemsCount(product.id) !== 0)
              return (
                <Row key={product.id} className="justify-content-md-center">
                  <Col xs lg="2"></Col>
                  <CartCard key={product.id} product={product} />
                  <Col xs lg="2"></Col>
                </Row>
              );
          })}
        {!loading && totalCount !== 0 && (
          <Row className="justify-content-md-center">
            <Col xs lg="2"></Col>
            <div className="col-md-4 position-relative">
              <div className="row g-1">
                <div className="col-md-12 card-body mb-5 pt-3">
                  <h5 className="card-title text-center fs-4 text-uppercase">
                    Subtotal: ${totalPrice}
                  </h5>
                </div>
                <div className="pb-4 col-md-12 row ">
                  <div className="col-4 col-md-6 text-center">
                    <button
                      className="btn btn-outline-dark w-100"
                      onClick={() => navigate("/shop")}
                    >
                      Continue Shopping
                    </button>
                  </div>
                  <div className="col-4 col-md-6 text-center">
                    <button
                      className="btn btn-outline-dark w-100"
                      onClick={() => checkout()}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Col xs lg="2"></Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default Cart;
