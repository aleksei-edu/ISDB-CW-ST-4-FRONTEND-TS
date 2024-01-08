import { Accordion, Col, Container, Row } from "react-bootstrap";
import { useGetPurchases } from "../../../hooks/useGetPurchases";
import OrderAccordion from "./OrderAccordion";

const PurchasesPage = () => {
  const { purchases, loading } = useGetPurchases();

  return (
    <Container>
      <Row className="text-center">
        <h1>Purchases</h1>
      </Row>
      <Row xs={1}>
        {loading && <p>Loading...</p>}
        {!loading &&
          purchases.map((purchase) => {
            return (
              <Row key={purchase.id}>
                <Col xs={0} md={2} ></Col>
                <Col >
                <Accordion className="mt-4 col-md">
                  <OrderAccordion
                    eventKey={purchase.id.toString()}
                    purchase={purchase}
                  />
                </Accordion>
                </Col>
                <Col xs={0} md={2}></Col>
              </Row>
            );
          })}
      </Row>
    </Container>
  );
};

export default PurchasesPage;
