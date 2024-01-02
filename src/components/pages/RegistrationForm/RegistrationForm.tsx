import { Link, useNavigate } from "react-router-dom";
import styles from "./RegistrationForm.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosClient from "../../../utils/axiosConf";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../../../store";
import { setUser } from "../../../store/slice/UserSlice";
const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must contain at least 3 characters" })
    .max(20, { message: "Username must be less than 20 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(100, { message: "Password must be less than 100 characters" }),
});

type FormValues = z.infer<typeof schema>;

const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = async (data: FormValues) => {
    axiosClient
      .post("/auth/register", data)
      .then((response) => {
        dispatch(
          setUser({
            username: data.username,
            password: data.password,
            token: response.data.token,
          })
        );
        navigate("/main");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                  <h2 className="fw-bold mb-2 text-uppercase">Sign up</h2>
                  <p className="text-white-50 mb-5">
                    Please enter username and password!
                  </p>
                  <form onSubmit={handleSubmit((data) => handleOnSubmit(data))}>
                    <div className="form-floating mb-4">
                      <input
                        {...register("username")}
                        type="text"
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
                      {errors.username && (
                        <p className="text-danger">{errors.username.message}</p>
                      )}
                    </div>
                    <div className="form-floating mb-4">
                      <input
                        {...register("password")}
                        type="password"
                        id="typePasswordX"
                        className="form-control form-control-lg"
                        placeholder="password"
                      />
                      <label
                        className="form-label text-black-50"
                        htmlFor="typePasswordX"
                      >
                        Password
                      </label>
                      {errors.password && (
                        <p className="text-danger">{errors.password.message}</p>
                      )}
                    </div>

                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </form>
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
                      Already have an account?{" "}
                      <Link to={"/login"} className="text-white-50 fw-bold">
                        Login
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
export default RegistrationForm;
