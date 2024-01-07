import { useContext, useState } from "react";
import { Accordion, Button, Card, Col, Row, Table } from "react-bootstrap";
import { useGetUserInfo } from "../../../hooks/useGetUserInfo";
import TrainerForm from "./TrainerForm";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

const ProfilePage = () => {
  const { user, updateUser } = useGetUserInfo();
  const [showTrainerForm, setShowTrainerForm] = useState(false);
  const imgSrc = user?.avatar ? user?.avatar : "../../../public/user.png";
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const signOut = () => {
    removeCookie("token");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("username");
    navigate("/sign-in");
  };
  return (
    <div className="container">
      <Row className="mt-5 justify-content-md-center text-center text-wrap">
        <Col xs={2} sm={3} md={5} ></Col>
        <Col>
          <h1 className="text-center"> </h1>
          <img
            src={imgSrc}
            className="img-fluid border border-3 rounded-circle"
          />
        </Col>
        <Col xs={2} sm={3} md={5}></Col>

        <Col md="3"></Col>
        <Col md="6">
          <h3 className="text-center text-capitalize">{user?.username}</h3>
        </Col>
        <Col md="3"></Col>

        <Col md="3"></Col>
        <Col md="6">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>General Information</Accordion.Header>
              <Accordion.Body>
                <Table
                  striped
                  bordered
                  hover
                  className="text-start text-capitalize"
                >
                  <tbody>
                    <tr>
                      <td>username</td>
                      <td>{user?.username}</td>
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
            {user?.trainer && (
              <Accordion.Item eventKey="1">
                <Accordion.Header>Trainer Information</Accordion.Header>
                <Accordion.Body>
                  <Table
                    striped
                    bordered
                    hover
                    className="text-start text-capitalize"
                  >
                    <tbody>
                      <tr>
                        <td>firstname</td>
                        <td>{user?.trainer.firstName}</td>
                      </tr>
                      <tr>
                        <td>lastname</td>
                        <td>{user?.trainer.lastName}</td>
                      </tr>
                      <tr>
                        <td>gender</td>
                        <td>{user?.trainer.gender}</td>
                      </tr>
                      <tr>
                        <td>level</td>
                        <td>{user?.trainer.level}</td>
                      </tr>
                      <tr>
                        <td>Physical Sweeper</td>
                        <td>{user?.trainer.physicalSweeper}%</td>
                      </tr>
                      <tr>
                        <td>Special Sweeper</td>
                        <td>{user?.trainer.specialSweeper}%</td>
                      </tr>
                      <tr>
                        <td>Wall</td>
                        <td>{user?.trainer.wall}%</td>
                      </tr>
                      <tr>
                        <td>Physical Tank</td>
                        <td>{user?.trainer.physicalTank}%</td>
                      </tr>
                      <tr>
                        <td>Special Tank</td>
                        <td>{user?.trainer.specialTank}%</td>
                      </tr>
                    </tbody>
                  </Table>
                  <Button onClick={() => setShowTrainerForm(true)}>Edit</Button>
                </Accordion.Body>
              </Accordion.Item>
            )}
            {!user?.trainer && (
              <Accordion.Item eventKey="1">
                <Accordion.Header>Trainer Information</Accordion.Header>
                <Accordion.Body>
                  <div className="row g-1">
                    <div className="col-md-12 card-body pt-3">
                      <h3>You don't have a trainer account yet.</h3>
                      <h3>Make a new one?</h3>
                      <Card.Body className="pt-4">
                        <Row>
                          <Button onClick={() => setShowTrainerForm(true)}>
                            {" "}
                            Make a new one!{" "}
                          </Button>
                        </Row>
                      </Card.Body>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            )}
          </Accordion>
        </Col>
        <Col md="3"></Col>
        <Col md="3"></Col>
        <Col md="6">
          <Button
            variant="danger"
            size="lg"
            className="mt-2 w-100"
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        </Col>
        <Col md="3"></Col>
      </Row>

      <TrainerForm
        show={showTrainerForm}
        setShow={setShowTrainerForm}
        updateUser={updateUser}
        trainer={user?.trainer}
      />
    </div>
  );
};

export default ProfilePage;
