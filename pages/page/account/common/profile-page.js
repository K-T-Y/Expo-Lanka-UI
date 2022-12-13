import React, { useEffect, useState } from "react";
import { Container, Row, Form, Input, Label, Col } from "reactstrap";

const ProfilePage = () => {
  const [User, setUser] = useState("");
  useEffect(() => {
    if (localStorage.getItem("User") != "") {
      setUser(JSON.parse(localStorage.getItem("User")));
      if (User) {
        setFirstName(User.firstName);
        setlastName(User.lastName);
        setEmail(User.email);
        setAddress1(User.addLine1);
        setAddress2(User.addLine2);
        setCity(User.city);
        setmobile(User.mobile);
        setPassword(User.password);
      } else {
        setUser(JSON.parse(localStorage.getItem("User")));
        setFirstName(User.firstName);
        setlastName(User.lastName);
        setEmail(User.email);
        setAddress1(User.addLine1);
        setAddress2(User.addLine2);
        setCity(User.city);
        setmobile(User.mobile);
        setPassword(User.password);
      }
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
        .post(ApiUrl + "/customers/update", model)
        .then((response) => {
          console.log("Response while updating", response);
          if (response.status == 200) {
            if (response.data.responseCode == 500) {
              toast.warn("Email Already Registered !!");
            } else {
              toast.success("Updated Successfully !!");
              // setFirstName("");
              // setlastName("");
              // setEmail("");
              // setAddress1("");
              // setAddress2("");
              // setPassword("");
              // setmobile("");
              // setCity("");
              router.push("/page/account/login");
            }
          } else {
            toast.error("Error While Updating !!");
          }
        })
        .catch((error) => {
          toast.error("Connection Error !!");
        });
    }
  };

  return (
    <>
      <section className="contact-page register-page">
        <Container>
          <Row>
            <Col sm="12">
              <h3>PERSONAL DETAILS</h3>
              <Form className="theme-form">
                <Row>
                  <Col md="6">
                    <Label className="form-label" for="name">
                      First Name
                    </Label>
                    <Input
                      value={firstName}
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="First name"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      required=""
                    />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="email">
                      Last Name
                    </Label>
                    <Input
                      value={lastName && lastName}
                      onChange={(e) => {
                        setlastName(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="Last name"
                      required=""
                    />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="name">
                      Email
                    </Label>
                    <Input
                      value={email}
                      type="text"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      required=""
                    />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="review">
                      Mobile
                    </Label>
                    <Input
                      onChange={(e) => {
                        setmobile(e.target.value);
                      }}
                      value={mobile}
                      type="number"
                      className="form-control"
                      id="review"
                      placeholder="Mobile number"
                      required=""
                    />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="email">
                      Address 1
                    </Label>
                    <Input
                      onChange={(e) => {
                        setAddress1(e.target.value);
                      }}
                      value={address1}
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Address line 1"
                      required=""
                    />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="email">
                      Address 2
                    </Label>
                    <Input
                      value={address2}
                      onChange={(e) => {
                        setAddress2(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Address line 2"
                      required=""
                    />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="email">
                      City
                    </Label>
                    <Input
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                      value={city}
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="City"
                      required=""
                    />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="email">
                      Password
                    </Label>
                    <Input
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      value={password}
                      type="password"
                      className="form-control"
                      id="email"
                      placeholder="Password"
                      required=""
                    />
                  </Col>
                  <Col md="12">
                    <Label className="form-label" for="review">
                      Write Your Message
                    </Label>
                    <textarea
                      className="form-control mb-0"
                      placeholder="Write Your Message"
                      id="exampleFormControlTextarea1"
                      rows="6"
                    ></textarea>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="contact-page register-page section-b-space">
        <Container>
          <Row>
            <Col sm="12">
              <h3>SHIPPING ADDRESS</h3>
              <Form className="theme-form">
                <Row>
                  <Col md="6">
                    <Label className="form-label" for="name">
                      flat / plot
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="home-ploat"
                      placeholder="company name"
                      required=""
                    />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="name">
                      Address *
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="address-two"
                      placeholder="Address"
                      required=""
                    />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="email">
                      Zip Code *
                    </Label>
                    <Input
                      type="number"
                      className="form-control"
                      id="zip-code"
                      placeholder="zip-code"
                      required=""
                    />
                  </Col>
                  <Col md="6" className="select_input">
                    <Label className="form-label" for="review">
                      Country *
                    </Label>
                    <select className="form-select py-2" size="1">
                      <option value="India">India</option>
                      <option value="UAE">UAE</option>
                      <option value="U.K">U.K</option>
                      <option value="US">US</option>
                    </select>
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="review">
                      City *
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="city"
                      placeholder="City"
                      required=""
                    />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="review">
                      Region/State *
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="region-state"
                      placeholder="Region/state"
                      required=""
                    />
                  </Col>
                  <div className="col-md-12">
                    <button
                      className="btn btn-sm btn-solid"
                      type="submit"
                      onClick={() => postRegister()}
                    >
                      Save setting
                    </button>
                  </div>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ProfilePage;
