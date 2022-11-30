import React, { useEffect, useState } from "react";
import { Container, Row, Form, Input, Label, Col } from "reactstrap";

const ProfilePage = () => {
  const [User, setUser] = useState("");
  useEffect(() => {
    if (localStorage.getItem("User") != "") {
      setUser(JSON.parse(localStorage.getItem("User")));
      if (User != "") {
        setFirstName(User.firstName);
        setLastName(User.lastName);
        setEmail(User.email);
        setAddress1(User.addLine1);
        setAddress2(User.addLine2);
        setCity(User.city);
        setMobile(User.mobile);
        setPassword(User.password);
      }
    }
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [addLine1, setAddress1] = useState("");
  const [addLine2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

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
                      required=""
                    />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="email">
                      Last Name
                    </Label>
                    <Input
                      value={lastName}
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
                      value={mobile}
                      type="text"
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
                      value={addLine1}
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
                      value={addLine2}
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
                      value={password}
                      type="text"
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
                    <button className="btn btn-sm btn-solid" type="submit">
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
