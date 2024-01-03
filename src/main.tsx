import React from 'react'
import ReactDOM from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegistrationForm from './components/pages/RegistrationForm';
import ErrorPage from "./components/pages/ErrorPage";
import LoginForm from './components/pages/LoginForm';
import store from './store/index'
import { Provider } from 'react-redux';
import MainPage from './components/pages/MainPage/MainPage';
import App from './App';
import Cart from './components/pages/Cart';
import Navbar from './components/Navbar/Navbar';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "sign-in", element: <LoginForm /> },
      { path: "sign-up", element: <RegistrationForm /> },
      { element: <Navbar />, children: [
        { path: "main", element: <MainPage /> },
        { path: "cart", element: <Cart />},
      ] },
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
