import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Button,
  Col,
  Media,
  Form,
  Label,
  Input,
} from "reactstrap";

import CommonLayout from "../../components/shop/common-layout";
import { ApiUrl } from "../../config/api-config";

const Tracking = () => {
  const [acceptedClass, setAcceptedClass] = useState("step");
  const [dispatchedClass, setDispatchedClass] = useState("step");
  const [transitClass, setTransitClass] = useState("step");
  const [clearanceClass, setClearanceClass] = useState("step");
  const [deliveryClass, setDeliveryClass] = useState("step");
  const [deliveredClass, setDeliveredClass] = useState("step");
  const [refNumber, setRefNumber] = useState("");
  const [trackingDetails, setTrackingDetails] = useState("");

  const [User, setUser] = useState("");

  const parcelSearch = () => {
    if (User != "") {
      setUser(JSON.parse(localStorage.getItem("User")));
    } else {
    }

    axios
      .get(ApiUrl + "/parcel/getParcel?ref=" + refNumber)
      .then((response) => {
        console.log("TRACKING_RESPONSE", response.data.data);
        setTrackingDetails(response.data.data);
      })
      .catch((error) => {
        console.log("TRACKING_ERROR", error);
      });
  };
  const data = trackingDetails;
  useEffect(() => {
    if (data) {
      if (data.status == 1) {
        setAcceptedClass("step active");
      }
      if (data.status == 2) {
        setAcceptedClass("step active");
        setDispatchedClass("step active");
      }
      if (data.status == 3) {
        setAcceptedClass("step active");
        setDispatchedClass("step active");
        setTransitClass("step active");
      }
      if (data.status == 11) {
        setAcceptedClass("step active");
        setDispatchedClass("step active");
        setTransitClass("step active");
        setClearanceClass("step active");
      }
      if (data.status == 5) {
        setAcceptedClass("step active");
        setDispatchedClass("step active");
        setTransitClass("step active");
        setClearanceClass("step active");
        setDeliveryClass("step active");
      }
      if (data.status == 6) {
        setAcceptedClass("step active");
        setDispatchedClass("step active");
        setTransitClass("step active");
        setClearanceClass("step active");
        setDeliveryClass("step active");
        setDeliveredClass("step active");
      }
    }
  }, []);
  return (
    <CommonLayout parent="home" title="Tacking">
      <section className="tracking page section-b-space">
        <Container>
          <h2 style={{ textAlign: "center" }}>Track your order</h2>
          <br></br>
          <p style={{ textAlign: "center", fontSize: "16px" }}>
            Welcome to <b>Expo Srilanka</b>, Enter your reference number shared
            via order confirmation to track your parcel.
          </p>
          <br></br>
          <div>
            <Row>
              <Col sm="4"></Col>
              <Col sm="8">
                <Form className="form-inline subscribe-form">
                  <Row>
                    <Col>
                      <Input
                        type="text"
                        className="form-control col-sm-12"
                        id="exampleFormControlInput1"
                        placeholder="Enter your tracking code"
                        onChange={(e) => {
                          setRefNumber(e.target.value);
                        }}
                      />
                    </Col>
                    <Col>
                      <Button
                        onClick={() => parcelSearch()}
                        className="btn btn-solid"
                      >
                        Track
                      </Button>
                    </Col>
                  </Row>
                </Form>

                {/* <Form className="form-inline tracking-form">
                <div className="mx-lg-6">
                  <div className="mx-sm-3">
                    <Input
                      type="text"
                      className="form-control col-sm-12"
                      id="exampleFormControlInput1"
                      placeholder="Enter your tracking code"
                    />
                  </div>
                </div>
                <Button type="submit" className="btn btn-solid">
                  Track
                </Button>
              </Form> */}
              </Col>
            </Row>
            <Row>
              {/* strat*/}
              {trackingDetails && (
                <div className="container">
                  <article className="card">
                    <header className="card-header">
                      My Orders / Tracking
                    </header>
                    <div className="card-body">
                      <h6>Order ID: OD45345345435</h6>
                      <article className="card">
                        <div className="card-body row">
                          <div className="col">
                            <strong>Estimated Delivery time:</strong> <br></br>
                            29 nov 2019
                          </div>
                          <div className="col">
                            <strong>Shipping BY:</strong> <br></br> BLUEDART, |
                            <i className="fa fa-phone"></i> +1598675986
                          </div>
                          <div className="col">
                            <strong>Status:</strong> <br></br> Picked by the
                            courier
                          </div>
                          <div className="col">
                            <strong>Tracking #:</strong> <br></br>
                            BD045903594059
                          </div>
                        </div>
                      </article>
                      <div className="track">
                        <div className={acceptedClass}>
                          <span className="icon">
                            <i className="fa fa-check"></i>
                          </span>
                          <span className="text">Parcel Accepted</span>
                        </div>
                        <div className={dispatchedClass}>
                          <span className="icon">
                            <i className="fa fa-exchange"></i>
                          </span>
                          <span className="text"> Dispatched</span>
                        </div>
                        <div className={transitClass}>
                          <span className="icon">
                            <i className="fa fa-truck"></i>
                          </span>
                          <span className="text"> In Transit </span>
                        </div>
                        <div className={clearanceClass}>
                          <span className="icon">
                            <i className="fa fa-archive"></i>
                          </span>
                          <span className="text">Pacel On Clearance</span>
                        </div>
                        <div className={deliveryClass}>
                          <span className="icon">
                            <i className="fa fa-paper-plane"></i>
                          </span>
                          <span className="text"> In Delivery </span>
                        </div>
                        <div className={deliveredClass}>
                          <span className="icon">
                            <i className="fa fa-user"></i>
                          </span>
                          <span className="text">Delivered </span>
                        </div>
                      </div>
                      <hr></hr>
                      <ul className="row">
                        <li className="col-md-4">
                          <figure className="itemside mb-3">
                            <div className="aside">
                              <img
                                src="https://i.imgur.com/iDwDQ4o.png"
                                className="img-sm border"
                              />
                            </div>
                            <figcaption className="info align-self-center">
                              <p className="title">
                                Dell Laptop with 500GB HDD <br></br> 8GB RAM
                              </p>
                              <span className="text-muted">$950 </span>
                            </figcaption>
                          </figure>
                        </li>
                        <li className="col-md-4">
                          <figure className="itemside mb-3">
                            <div className="aside">
                              <img
                                src="https://i.imgur.com/tVBy5Q0.png"
                                className="img-sm border"
                              />
                            </div>
                            <figcaption className="info align-self-center">
                              <p className="title">
                                HP Laptop with 500GB HDD <br></br> 8GB RAM
                              </p>
                              <span className="text-muted">$850 </span>
                            </figcaption>
                          </figure>
                        </li>
                        <li className="col-md-4">
                          <figure className="itemside mb-3">
                            <div className="aside">
                              <img
                                src="https://i.imgur.com/Bd56jKH.png"
                                className="img-sm border"
                              />
                            </div>
                            <figcaption className="info align-self-center">
                              <p className="title">
                                ACER Laptop with 500GB HDD <br></br> 8GB RAM
                              </p>
                              <span className="text-muted">$650 </span>
                            </figcaption>
                          </figure>
                        </li>
                      </ul>
                      <hr></hr>
                      <a href="#" className="btn btn-warning" data-abc="true">
                        <i className="fa fa-chevron-left"></i> Back to orders
                      </a>
                    </div>
                  </article>
                </div>
              )}

              {/* end*/}
            </Row>
          </div>
        </Container>
      </section>
    </CommonLayout>
  );
};
export default Tracking;
