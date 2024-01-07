import { Outlet } from "react-router-dom";
import { ShopContext, ShopContextProvider } from "../../context/ShopContext";
import Navbar from "../Navbar/Navbar";
import { ErrorContextProvider } from "../../context/ErrorContext";

const Root = () => {
  return (
    <ErrorContextProvider>
        <ShopContextProvider>
            <Navbar >
                <Outlet />
            </Navbar>
        </ShopContextProvider>
    </ErrorContextProvider>
  );
};

export default Root;
