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

  const {products} = useGetProducts({ setLoading: setLoading });
  

  return (
    <>
      <CardGroup>
        <Row xs={1} sm={2} md={4} className="g-4 mt-4 z-0">
          {loading &&
            Array.from({ length: 50 }).map((_, idx) => (
              <ProductPlaceholders key={idx} />
            ))}
          {!loading &&
            products.sort((a, b) => a.nationalNum - b.nationalNum).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </Row>
      </CardGroup>
    </>
  );
};

export default ShopPage;
