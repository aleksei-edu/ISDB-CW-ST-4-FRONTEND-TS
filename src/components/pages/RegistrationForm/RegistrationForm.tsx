import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosClient from "../../../utils/axiosConf";
import { useAppDispatch } from "../../../store";
import { setUser } from "../../../store/slice/UserSlice";
import { SignUpFormValues, SignUpSchema } from "../../../lib/types";
import FormContainer from "../FormContainer/FormContainer";
import { Alert, Button } from "react-bootstrap";
import { useState } from "react";
import { useCookies } from "react-cookie";

const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [headError, setHeadError] = useState<{show: boolean, msg: string}>({show: false, msg: ""})
  const [_, setCookies] = useCookies(["token"], { maxAge: 86400 });

  const handleOnSubmit = async (data: SignUpFormValues) => {
    let isCancelled = false;
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Sleep for 1000 milliseconds

    axiosClient
      .post("/auth/register", data)
      .then((response) => {
        if (!isCancelled) {
          if(response.data.code){
            if(response.data.code === 1){
              if(response.data.type === "USERNAME_IN_USE"){
                setError("username", {message: "Username already in use."})
                return;
              }
            }
          }
          dispatch(
            setUser({
              username: data.username,
              password: data.password,
              token: response.data.token,
            })
          );
          setCookies("token", response.data.token);
          localStorage.setItem("username", data.username);
          navigate("/shop");
        }
      })
      .catch((error) => {
        if (!isCancelled && error.message) {
          let message = error.message
          if(error.response){
            switch(error.response.data.type){
              case "BAD_CREDENTIALS":
                message = "Incorrect username or password.";
                break;
            }
          }
          setHeadError({show: true, msg: message})
        }
      });

    return () => {
      isCancelled = true;
    };
  };

  return (
    <>
      <FormContainer title="Sign Up">
        {headError.show && (
        <Alert variant="danger" onClose={() => setHeadError({...headError, show: false})} dismissible>
          <Alert.Heading>Oh! You got an error!</Alert.Heading>
          <p>
            {headError.msg}
          </p>
        </Alert>)}
        <Form
          noValidate
          onSubmit={handleSubmit((data) => handleOnSubmit(data))}
        >
          <Form.Group className="form-floating mb-4">
            <Form.Control
              {...register("username")}
              type="text"
              id="typeUsernameX"
              className="form-control form-control-lg"
              placeholder="username"
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username && errors.username?.message}
            </Form.Control.Feedback>
            <Form.Label className="form-label text-black-50">
              Username
            </Form.Label>
          </Form.Group>
          <Form.Group className="form-floating mb-4">
            <Form.Control
              {...register("password")}
              type="password"
              id="typePasswordX"
              className="form-control form-control-lg"
              placeholder="password"
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password && errors.password?.message}
            </Form.Control.Feedback>
            <Form.Label className="form-label text-black-50">
              Password
            </Form.Label>
          </Form.Group>
          <Form.Group className="form-floating mb-4">
            <Form.Control
              {...register("confirmPassword")}
              type="password"
              id="typeconfirmPasswordX"
              className="form-control form-control-lg"
              placeholder="Confirm Password"
              isInvalid={!!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword && errors.confirmPassword?.message}
            </Form.Control.Feedback>
            <Form.Label className="form-label text-black-50">
              Confirm Password
            </Form.Label>
          </Form.Group>
          <Button
            variant="outline-light"
            className="btn btn-outline-light btn-lg px-5"
            type="submit"
            disabled={isSubmitting}
          >
            {!isSubmitting && <>Sign Up</>}
            {isSubmitting && (
              <>
                <span className="spinner-grow spinner-grow-sm"></span>
                <span role="status">Sending...</span>
              </>
            )}
          </Button>
        </Form>
        <div>
          <p className="mb-0">
            Already have an account?{" "}
            <Link to={"/sign-in"} className="text-white-50 fw-bold">
              Login
            </Link>
          </p>
        </div>
      </FormContainer>
    </>
  );
};
export default RegistrationForm;
