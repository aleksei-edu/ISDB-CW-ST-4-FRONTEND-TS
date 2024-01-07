import React from 'react'
import ReactDOM from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegistrationForm from './components/pages/RegistrationForm';
import ErrorPage from "./components/pages/ErrorPage";
import LoginForm from './components/pages/LoginForm';
import store from './store/index'
import { Provider } from 'react-redux';
import ShopPage from './components/pages/ShopPage/ShopPage';
import App from './App';
import Cart from './components/pages/Cart';
import Navbar from './components/Navbar/Navbar';
import Root from './components/pages/Root';
import ProfilePage from './components/pages/Profile/ProfilePage';
import PurchasesPage from './components/pages/Purchases/PurchasesPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "sign-in", element: <LoginForm /> },
      { path: "sign-up", element: <RegistrationForm /> },
      { element: <Root />, children: [
          { path: "shop", element: <ShopPage /> },
          { path: "cart", element: <Cart />},
          { path: "profile", element: <ProfilePage />},
          { path: "purchases", element: <PurchasesPage />}
        ]
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
