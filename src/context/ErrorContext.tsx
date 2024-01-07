import { createContext, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export interface IErrorContext {
  addError: (message: string) => void;
}

const defaultValue: IErrorContext = {
  addError: (message: string) => {},
};

export const ErrorContext = createContext(defaultValue);

export const ErrorContextProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const addError = (message: string) => {
    const id = new Date().getTime();
    setToasts([...toasts, { id, message }]);
    setTimeout(() => removeToast(id), 10000);
  };

  const removeToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  return (
    <ErrorContext.Provider value={{ addError }}>
      {children}
      <div
        aria-live="polite"
        role="alert"
        aria-atomic="true"
        className="position-relative text-bg-primary"
      >
        <div className="toast-container position-fixed top-0 end-0 p-3">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="toast show bg-danger"
              role="alert"
              aria-atomic="true"
            >
              <div className="d-flex align-items-center justify-content-between">
                <div className="toast-body fw-bold fs-5">Error: {toast.message}</div>
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                  onClick={() => removeToast(toast.id)}
                ></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ErrorContext.Provider>
  );
};
