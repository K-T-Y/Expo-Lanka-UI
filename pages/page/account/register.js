import React, { useEffect, useState } from "react";
import CommonLayout from "../../../components/shop/common-layout";
import { Input, Container, Row, Form, Label, Col } from "reactstrap";
import { useRouter } from "next/router";
import axios from "axios";
import { ApiUrl } from "../../../config/api-config";
import { toast } from "react-toastify";

const Register = () => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("User")) {
      router.push("/");
    }
  });

  //Form Variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setmobile] = useState("");

  //Validation Variables
  const [firstNameValidation, setFirstNameValidation] = useState("");
  const [lastNameValidation, setlastNameValidation] = useState("");
  const [emailValidation, setEmailValidation] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const [address1Validation, setAddress1Validation] = useState("");
  const [address2Validation, setAddress2Validation] = useState("");
  const [cityValidation, setCityValidation] = useState("");
  const [mobileValidation, setmobileValidation] = useState("");

  const postRegister = () => {
    setFirstNameValidation("");
    setlastNameValidation("");
    setEmailValidation("");
    setPasswordValidation("");
    setAddress1Validation("");
    setAddress2Validation("");
    setCityValidation("");
    setmobileValidation("");
    if (firstName == "") {
      setFirstNameValidation("  First Name Required !!");
    } else if (lastName == "") {
      setlastNameValidation("  Last Name Required !!");
    } else if (email == "") {
      setEmailValidation("  Email Required !!");
    } else if (password == "") {
      setPasswordValidation("  Password Required !!");
    } else if (address1 == "") {
      setAddress1Validation("  Address Line 1 Required !!");
    } else if (address2 == "") {
      setAddress2Validation("  Address Line 2 Required !!");
    } else if (city == "") {
      setCityValidation("  City Required !!");
    } else if (mobile == "") {
      setmobileValidation("  Mobile Number Required !!");
    } else if (password.length < 8) {
      setPasswordValidation(
        "  Password Length Requires More Than 8 Characters !! "
      );
    } else {
      const model = {
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        addLine1: address1,
        addLine2: address2,
        city: city,
        email: email,
        password: password,
      };
      axios
        .post(ApiUrl + "/customers/create", model)
        .then((response) => {
          if (response.status == 200) {
            toast.success("Registered Successfully !!");

            setFirstName("");
            setlastName("");
            setEmail("");
            setAddress1("");
            setAddress2("");
            setPassword("");
            setmobile("");
            setCity("");
          } else {
            toast.error("Error While Registering !!");
          }
        })
        .catch((error) => {
          toast.error("Connection Error !!");
        });
    }
  };
  return (
    <CommonLayout parent="home" title="register">
      <section className="register-page section-b-space">
        <Container>
          <Row>
            <Col lg="12">
              <h3>create account</h3>
              <div className="theme-card">
                <Form className="">
                  <Row>
                    <Col md="6">
                      <Label className="form-label" for="email">
                        First Name
                      </Label>
                      <Input
                        type="text"
                        id="fname"
                        className="form-control"
                        placeholder="First Name"
                        required=""
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                      />
                      {firstNameValidation && (
                        <Label className="mt-2 text-danger form-label">
                          {firstNameValidation}
                        </Label>
                      )}
                    </Col>
                    <Col md="6">
                      <Label className="form-label" for="review">
                        Last Name
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="lname"
                        value={lastName}
                        placeholder="Last Name"
                        required=""
                        onChange={(e) => {
                          setlastName(e.target.value);
                        }}
                      />
                      {lastNameValidation && (
                        <Label className="mt-2 text-danger form-label">
                          {lastNameValidation}
                        </Label>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Label className="form-label" for="email">
                        Email
                      </Label>
                      <Input
                        type="email"
                        value={email}
                        className="form-control"
                        id="email"
                        placeholder="Your email"
                        required=""
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                      {emailValidation && (
                        <Label className="mt-2 text-danger form-label">
                          {emailValidation}
                        </Label>
                      )}
                    </Col>
                    <Col md="6">
                      <Label className="form-label" for="review">
                        Password
                      </Label>
                      <Input
                        type="password"
                        className="form-control"
                        id="review"
                        value={password}
                        placeholder="Enter your password"
                        required=""
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                      {passwordValidation && (
                        <Label className="mt-2 text-danger form-label">
                          {passwordValidation}
                        </Label>
                      )}
                    </Col>
                    <Col md="6">
                      <Label className="form-label" for="review">
                        Address 1
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="addline1"
                        value={address1}
                        placeholder="Address line 1"
                        required=""
                        onChange={(e) => {
                          setAddress1(e.target.value);
                        }}
                      />
                      {address1Validation && (
                        <Label className="mt-2 text-danger form-label">
                          {address1Validation}
                        </Label>
                      )}
                    </Col>
                    <Col md="6">
                      <Label className="form-label" for="review">
                        Address 2
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="addline2"
                        value={address2}
                        placeholder="Address line 2"
                        required=""
                        onChange={(e) => {
                          setAddress2(e.target.value);
                        }}
                      />
                      {address2Validation && (
                        <Label className="mt-2 text-danger form-label">
                          {address2Validation}
                        </Label>
                      )}
                    </Col>
                    <Col md="6">
                      <Label className="form-label" for="review">
                        City
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder="City"
                        required=""
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                        }}
                      />
                      {cityValidation && (
                        <Label className="mt-2 text-danger form-label">
                          {cityValidation}
                        </Label>
                      )}
                    </Col>
                    <Col md="6">
                      <Label className="form-label" for="review">
                        Mobile
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="mobile"
                        placeholder="Mobile"
                        required=""
                        value={mobile}
                        onChange={(e) => {
                          setmobile(e.target.value);
                        }}
                      />
                      {mobileValidation && (
                        <Label className="mt-2 text-danger form-label">
                          {mobileValidation}
                        </Label>
                      )}
                    </Col>
                    <Row className="mt-3">
                      <Col md="12">
                        <a
                          className="btn btn-solid w-auto"
                          onClick={() => postRegister()}
                        >
                          create Account
                        </a>
                      </Col>
                    </Row>
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
