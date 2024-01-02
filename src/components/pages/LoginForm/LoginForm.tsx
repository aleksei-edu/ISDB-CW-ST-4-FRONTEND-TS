import { Link } from "react-router-dom";
import styles from "./LoginForm.module.css";
const LoginForm: React.FC = () => {
  return (
    <>
      <section className={["vh-100", styles.gradientCustom].join(" ")}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your username and password!
                  </p>
                  <div className="form-floating mb-4">
                    <input
                      type="email"
                      id="typeUsernameX"
                      className="form-control form-control-lg"
                      placeholder="username"
                    />
                    <label
                      className="form-label text-black-50"
                      htmlFor="typeUsernameX"
                    >
                      Username
                    </label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      placeholder="password"
                    />
                    <label className="form-label text-black-50" htmlFor="typePasswordX">
                      Password
                    </label>
                  </div>

                  <p className="small mb-5 pb-lg-2">
                    <a className="text-white-50" href="#!">
                      Forgot password?
                    </a>
                  </p>

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                  >
                    Login
                  </button>

                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white">
                      <i className="fab fa-facebook-f fa-lg"></i>
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-google fa-lg"></i>
                    </a>
                  </div>
                  <div>
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <Link to={"/register"} className="text-white-50 fw-bold">
                        Sign Up 
                        </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default LoginForm;