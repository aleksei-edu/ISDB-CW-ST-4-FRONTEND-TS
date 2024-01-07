import { Outlet } from "react-router-dom";
import { ShopContext, ShopContextProvider } from "../../context/ShopContext";
import Navbar from "../Navbar/Navbar";
import { ErrorContextProvider } from "../../context/ErrorContext";
import { UserContextProvider } from "../../context/UserContext";

const Root = () => {
  return (
    <ErrorContextProvider>
        <ShopContextProvider>
            <UserContextProvider>
                <Navbar >
                    <Outlet />
                </Navbar>
            </UserContextProvider>
        </ShopContextProvider>
    </ErrorContextProvider>
  );
};

export default Root;
