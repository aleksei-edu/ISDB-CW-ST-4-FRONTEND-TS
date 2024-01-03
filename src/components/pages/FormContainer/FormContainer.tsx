import styles from "./FormContainer.module.css";
type Props = {
  children: React.ReactNode;
  title: string;
};

const FormContainer = ({ children, title = "Title" }: Props) => {
  return (
    <section className={["vh-100", styles.gradientCustom].join(" ")}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <h2 className="fw-bold mb-2 text-uppercase">{title}</h2>
                <p className="text-white-50 mb-5">
                  Please enter username and password!
                </p>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormContainer;
