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

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <LoginForm />,
  },
  {
    path: "register",
    element: <RegistrationForm />,
  },
  {
    path: "main",
    element: <MainPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
