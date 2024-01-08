import { Link, useRouteError } from "react-router-dom";

interface Error {
  statusText?: string;
  message?: string;
  status?: number;
}

const ErrorPage: React.FC = () => {
  const error = useRouteError() as Error;
  console.error(error);

  return (
    <section className={["vh-100"].join(" ")}>
      <div
        id="error-page"
        className="h-100 py-2"
        style={{
          backgroundImage:
            "url(https://r4.wallpaperflare.com/wallpaper/685/638/381/pokemon-pikachu-wallpaper-02fa8c02a6470a932c6b3f186de3e1e7.jpg)",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem", maxHeight: "100rem" }}
              >
                <div className="card-body p-5 text-center">
                  <h2 className="fw-bold mb-2 text-uppercase">Oops!</h2>
                  <p className="text-white-50 mb-2">Something went wrong.</p>
                  <p className="fs-1 fw-bold text-capitalize">
                    {error.status} {error.statusText || error.message}
                  </p>
                  <div style={{ borderRadius: "1rem" }}>
                    <img
                      src="https://i.gifer.com/origin/2e/2effa23b894e8f0c4ee45812e36a308d.gif"
                      className="card-img-bottom"
                      style={{ borderRadius: "1rem" }}
                    />
                  </div>
                  <div className="card-footer text-center bg-dark">
                    <Link
                      to="/"
                      className=" fs-3 text-uppercase btn btn-outline-light mt-3"
                    >
                      Back to Shop
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
