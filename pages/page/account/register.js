import React, { useEffect } from "react";
import CommonLayout from "../../../components/shop/common-layout";
import { Input, Container, Row, Form, Label, Col } from "reactstrap";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("User")) {
      router.push("/");
    }
  });
  return (
    <CommonLayout parent="home" title="register">
      <section className="register-page section-b-space">
        <Container>
          <Row>
            <Col lg="12">
              <h3>create account</h3>
              <div className="theme-card">
                <Form className="theme-form">
                  <Row>
                    <Col md="6">
                      <Label className="form-label" for="email">
                        Full Name
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="fname"
                        placeholder="Full Name"
                        required=""
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Label className="form-label" for="email">
                        email
                      </Label>
                      <Input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        required=""
                      />
                    </Col>
                    <Col md="6">
                      <Label className="form-label" for="review">
                        Password
                      </Label>
                      <Input
                        type="password"
                        className="form-control"
                        id="review"
                        placeholder="Enter your password"
                        required=""
                      />
                    </Col>
                    <Col md="6">
                      <Label className="form-label" for="review">
                        Business Name
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="bname"
                        placeholder="Business Name"
                        required=""
                      />
                    </Col>
                    <Col md="6">
                      <Label className="form-label" for="review">
                        Business Type
                      </Label>
                      <Input
                        type="password"
                        className="form-control"
                        id="btype"
                        placeholder="Business Type"
                        required=""
                      />
                    </Col>
                    <Col md="6">
                      <Label className="form-label" for="review">
                        Mobile No
                      </Label>
                      <Input
                        type="password"
                        className="form-control"
                        id="mobileNo"
                        placeholder="Enter your Mobile Number"
                        required=""
                      />
                    </Col>
                    <Col md="12">
                      <a href="#" className="btn btn-solid w-auto">
                        create Account
                      </a>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default Register;
