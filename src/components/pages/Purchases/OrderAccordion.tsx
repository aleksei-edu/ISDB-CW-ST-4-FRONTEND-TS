import { Accordion, Badge, Table } from "react-bootstrap";
import { OrderDetails } from "../../../lib/types";
import OrderCards from "./OrderCards";

interface Props {
  eventKey: string;
  purchase: OrderDetails;
}

const bgcolor = {
    PROCESSING: "primary",
    DONE: "success",
    CANCELLED: "danger",
    PAID: "warning",
};

const OrderAccordion = (props: Props) => {
  const { eventKey, purchase } = props;
  const date = new Date(purchase.orderDate);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>
        <Table bordered>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{purchase.id}</td>
              <td>
                {day} {month} {year}
              </td>
              <td>${purchase.totalPrice}</td>
              <td><Badge bg={bgcolor[purchase.status]}>{purchase.status}</Badge></td>
            </tr>
          </tbody>
        </Table>
      </Accordion.Header>
      <Accordion.Body>
        {purchase?.orderItems.map((item) => {
          return <OrderCards key={item.id} product={item} />;
        })}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default OrderAccordion;
