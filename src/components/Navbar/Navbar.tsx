import Container from "react-bootstrap/Container";
import BNav from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <>
      <BNav bg="dark" data-bs-theme="dark" fixed='top' className="bg-body-tertiary fs-5">
        <Container>
          <Link to={"/main"} className="navbar-brand">
            <BNav.Brand>
                <img src="/public/pikachu.png" alt="Logo" height="24" className="d-inline-block align-text-top"/>
                PokeStore
            </BNav.Brand>
          </Link>
          <Nav className="justify-content-end">
            <Link to="shop" className="nav-link">
              Shop
            </Link>
            <Link to="/cart" className="nav-link">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
          </Nav>
        </Container>
      </BNav>
      <Outlet />
    </>
  );
};

export default Navbar;
