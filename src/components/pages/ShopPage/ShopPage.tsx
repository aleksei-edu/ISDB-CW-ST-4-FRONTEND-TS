import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { User } from "../../../store/slice/UserApi";
import Navbar from "../../Navbar/Navbar";
import { Alert, CardGroup, Row } from "react-bootstrap";
import { useGetProducts } from "../../../hooks/useGetProducts";
import ProductCard from "./ProductCard";
import ProductPlaceholders from "./ProductPlaceholders";
import { motion } from "framer-motion";

const ShopPage: React.FC = () => {
  const user: User = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    isShown: false,
    message: "12",
  });

  const {products} = useGetProducts({ setLoading: setLoading });
  

  return (
    <>
      {error.isShown && (
        <div className="z-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="z-3"
          >
            <Alert
              variant="danger"
              className="z-3 mt-5 position-absolute ml-auto"
              style={{ right: 0 }}
              onClick={() => setError({ ...error, isShown: false })}
              dismissible
            >
              <Alert.Heading>Oh! You got an error!</Alert.Heading>
              {error.message}
            </Alert>
          </motion.div>
        </div>
      )}
      <CardGroup className="mt-4 mx-5 z-0">
        <Row xs={1} sm={2} md={4} className="g-4 mt-4 z-0">
          {loading &&
            Array.from({ length: 50 }).map((_, idx) => (
              <ProductPlaceholders key={idx} />
            ))}
          {!loading &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </Row>
      </CardGroup>
    </>
  );
};

export default ShopPage;
