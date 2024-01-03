import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../FormContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormValues, SignInSchema } from "../../../lib/types";
import { useForm } from "react-hook-form";
import axiosClient from "../../../utils/axiosConf";
import { useAppDispatch } from "../../../store";
import { setUser } from "../../../store/slice/UserSlice";
import { Alert, Button, Form } from "react-bootstrap";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useState } from "react";

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Forgot Password</Popover.Header>
    <Popover.Body>This is really sad.😢</Popover.Body>
  </Popover>
);

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignInFormValues>({
    resolver: zodResolver(SignInSchema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [_, setCookies] = useCookies(["token"]);
  const [headError, setHeadError] = useState<{show: boolean, msg: string}>({show: false, msg: ""})

  const handleOnSubmit = async (data: SignInFormValues) => {
    let isCancelled = false;
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Sleep for 1000 milliseconds

    axiosClient
      .post("/auth/login", data)
      .then((response) => {
        if (!isCancelled) {
          dispatch(
            setUser({
              username: data.username,
              password: data.password,
              token: response.data.token,
            })
          );
          setCookies("token", response.data.token);
          localStorage.setItem("username", data.username);
          navigate("/main");
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
    <FormContainer title="Sign In">
      {headError.show && (
      <Alert variant="danger" onClose={() => setHeadError({...headError, show: false})} dismissible>
        <Alert.Heading>Oh! You got an error!</Alert.Heading>
        <p>
          {headError.msg}
        </p>
      </Alert>)}
      <Form noValidate onSubmit={handleSubmit((data) => handleOnSubmit(data))}>
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
          <Form.Label
            className="form-label text-black-50"
            htmlFor="typeUsernameX"
          >
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
          <Form.Label className="form-label text-black-50">Password</Form.Label>
        </Form.Group>

        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
          <p className="small mb-3 pb-lg-2">
            <a className="text-white-50">Forgot password?</a>
          </p>
        </OverlayTrigger>

        <Button
          variant="outline-light"
          className="btn btn-outline-light btn-lg px-5"
          type="submit"
          disabled={isSubmitting}
        >
          {!isSubmitting && <>Sign In</>}
          {isSubmitting && (
            <>
              <span className="spinner-grow spinner-grow-sm"></span>
              <span role="status">Sending...</span>
            </>
          )}
        </Button>

        <div>
          <p className="mb-0">
            Don't have an account?{" "}
            <Link to={"/sign-up"} className="text-white-50 fw-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </Form>
    </FormContainer>
  );
};
export default LoginForm;
