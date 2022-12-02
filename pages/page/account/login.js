import React, { useEffect, useState } from "react";
import CommonLayout from "../../../components/shop/common-layout";
import { Container, Row, Form, Label, Input, Col } from "reactstrap";
import axios from "axios";
import { ApiUrl } from "../../../config/api-config";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  let disabledButton = false;
  const getAuth = () => {
    disabledButton = true;
    const model = {
      email: username,
      password: password,
    };
    axios
      .post(ApiUrl + "/customers/login", model)
      .then((response) => {
        if (response.status == 200) {
          if (response.data.responseCode == 200) {
            localStorage.setItem("User", JSON.stringify(response.data.data));
            toast.success("Successfully Logged In");
            disabledButton = false;
            router.push("/");
          } else {
            toast.error("Username or Password Incorrect ");
            disabledButton = false;
          }
        } else {
          // toast.error(error);
          toast.error("Connection Error !! ");
          disabledButton = false;
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Connection Error !!");
        disabledButton = false;
      });
  };

  useEffect(() => {
    if (localStorage.getItem("User")) {
      router.push("/");
    }
  });
  return (
    <CommonLayout parent="home" title="login">
      <section className="login-page section-b-space">
        <Container>
          <Row>
            <Col lg="6">
              <h3>Login</h3>
              <div className="theme-card">
                <Form className="theme-form">
                  <div className="form-group">
                    <Label className="form-label" for="email">
                      Email
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      required=""
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <Label className="form-label" for="review">
                      Password
                    </Label>
                    <Input
                      type="password"
                      className="form-control"
                      id="review"
                      placeholder="Enter your password"
                      required=""
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <a
                    onClick={() => {
                      getAuth();
                    }}
                    className="btn btn-solid"
                    aria-disabled={disabledButton}
                  >
                    Login
                  </a>
                </Form>
              </div>
            </Col>
            <Col lg="6" className="right-login">
              <h3>New Customer</h3>
              <div className="theme-card authentication-right">
                <h6 className="title-font">Create A Account</h6>
                <p>
                  Sign up for a free account at our store. Registration is quick
                  and easy. It allows you to be able to order from our shop. To
                  start shopping click register.
                </p>
                <a href="#" className="btn btn-solid">
                  Create an Account
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default Login;
