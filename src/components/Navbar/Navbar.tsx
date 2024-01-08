import Container from "react-bootstrap/Container";
import BNav from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useContext } from "react";
import { IShopContext, ShopContext } from "../../context/ShopContext";
import { FaUserLarge } from "react-icons/fa6";

const Navbar = ({children}) => {
  const { getTotalCartItemsCount } = useContext<IShopContext>(ShopContext);
  const totalCount = getTotalCartItemsCount();
  const navigate = useNavigate();
  return (
    <>
      <BNav
        bg="dark"
        data-bs-theme="dark"
        fixed="top"
        className="bg-body-tertiary fs-5"
      >
        <Container>
          <Link to={"/"} className="navbar-brand">
            <BNav.Brand>
              <img
                src="/public/pikachu.png"
                alt="Logo"
                height="24"
                className="d-inline-block align-text-top"
              />
              PokeStore
            </BNav.Brand>
          </Link>
          <Nav className="justify-content-center">
            <Link to="/" className="nav-link">
              Shop
            </Link>
            <div className="nav-link">|</div>
            <Link to="purchases" className="nav-link">
              Purchases
            </Link>
          </Nav>
          <Nav className="justify-content-end">
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 300, hide: 400 }}
              overlay={<Tooltip id="tooltip-bottom">Cart</Tooltip>}
            >
              <Button
                variant="outline-light"
                className="me-4 position-relative sm-btn"
                onClick={() => navigate("/cart")}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                {totalCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalCount}
                    <span className="visually-hidden">cart items</span>
                  </span>
                )}
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 300, hide: 400 }}
              overlay={<Tooltip id="tooltip-bottom">Profile</Tooltip>}
            >
              <Button
                variant="outline-light"
                className="me-2 position-relative"
                onClick={() => navigate("/profile")}
              >
                <FaUserLarge />
              </Button>
            </OverlayTrigger>
          </Nav>
        </Container>
      </BNav>
      <div className="pt-5 mt-4 mx-5">
      {children}
      </div>
    </>
  );
};

export default Navbar;
