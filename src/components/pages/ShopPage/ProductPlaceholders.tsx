import React from "react";
import { Card, CardHeader, Col, Placeholder } from "react-bootstrap";

const ProductPlaceholders = () => {
  return (
    <Col>
      <div className="card" aria-hidden="true">
        <img
          src="https://images.wallpaperscraft.com/image/single/gray_color_background_145047_2560x1600.jpg"
          className="card-img-top"
          alt="..."
        />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder
            as={Card.Subtitle}
            className="mb-2 text-muted"
            animation="glow"
          >
            <Placeholder xs={2} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={3} /> <Placeholder xs={3} />
          </Placeholder>
          <Placeholder.Button variant="primary" xs={4} />
        </Card.Body>
      </div>
    </Col>
  );
};

export default ProductPlaceholders;
