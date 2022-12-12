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

    setButtonLoader(true);
    setButtonValue("Loading ....");

    axios
      .get(ApiUrl + "/orders/track?reference=" + refNumber)
      .then((response) => {
        setTimeout(function () {}, 2000);
        console.log("TRACKING_RESPONSE", response.data.data);
        setTrackingDetails(response.data.data);
        setButtonLoader(false);
        setButtonValue("TRACK NOW");

        if (response.data.data.status) {
          if (response.data.data.status == 1) {
            setAcceptedClass("step active");
            setParcelStatus("Parcel Accepted");
          } else if (response.data.data.status == 2) {
            setAcceptedClass("step active");
            setDispatchedClass("step active");
            setParcelStatus("Parcel Dispatched");
          } else if (response.data.data.status == 3) {
            setAcceptedClass("step active");
            setDispatchedClass("step active");
            setTransitClass("step active");
            setParcelStatus("Parcel In Transit");
          } else if (response.data.data.status == 11) {
            setAcceptedClass("step active");
            setDispatchedClass("step active");
            setTransitClass("step active");
            setClearanceClass("step active");
            setParcelStatus("Parcel On Clearance");
          } else if (response.data.data.status == 5) {
            setAcceptedClass("step active");
            setDispatchedClass("step active");
            setTransitClass("step active");
            setClearanceClass("step active");
            setDeliveryClass("step active");
            setParcelStatus("Parcel In Delivery");
          } else if (response.data.data.status == 6) {
            setAcceptedClass("step active");
            setDispatchedClass("step active");
            setTransitClass("step active");
            setClearanceClass("step active");
            setDeliveryClass("step active");
            setDeliveredClass("step active");
            setParcelStatus("Parcel In Delivered");
          }
        }
      })
      .catch((error) => {
        console.log("TRACKING_ERROR", error);
      });
  };

  const [parcelStatus, setParcelStatus] = useState("");

  const [buttonLoader, setButtonLoader] = useState(false);
  const [buttonValue, setButtonValue] = useState("TRACK NOW");

  useEffect(() => {
    if (localStorage.getItem("Tracking")) {
      if (JSON.parse(localStorage.getItem("Tracking"))) {
        setTrackingDetails(JSON.parse(localStorage.getItem("Tracking")));

        if (JSON.parse(localStorage.getItem("Tracking")).status) {
          setRefNumber(JSON.parse(localStorage.getItem("Tracking")).refNumber);
          if (JSON.parse(localStorage.getItem("Tracking")).status == 1) {
            setAcceptedClass("step active");
            setParcelStatus("Parcel Accepted");
          } else if (JSON.parse(localStorage.getItem("Tracking")).status == 2) {
            setAcceptedClass("step active");
            setDispatchedClass("step active");
            setParcelStatus("Parcel Dispatched");
          } else if (JSON.parse(localStorage.getItem("Tracking")).status == 3) {
            setAcceptedClass("step active");
            setDispatchedClass("step active");
            setTransitClass("step active");
            setParcelStatus("Parcel In Transit");
          } else if (
            JSON.parse(localStorage.getItem("Tracking")).status == 11
          ) {
            setAcceptedClass("step active");
            setDispatchedClass("step active");
            setTransitClass("step active");
            setClearanceClass("step active");
            setParcelStatus("Parcel On Clearance");
          } else if (JSON.parse(localStorage.getItem("Tracking")).status == 5) {
            setAcceptedClass("step active");
            setDispatchedClass("step active");
            setTransitClass("step active");
            setClearanceClass("step active");
            setDeliveryClass("step active");
            setParcelStatus("Parcel In Delivery");
          } else if (JSON.parse(localStorage.getItem("Tracking")).status == 6) {
            setAcceptedClass("step active");
            setDispatchedClass("step active");
            setTransitClass("step active");
            setClearanceClass("step active");
            setDeliveryClass("step active");
            setDeliveredClass("step active");
            setParcelStatus("Parcel In Delivered");
          }
        }
        localStorage.setItem("Tracking", "");
      }
    }
  }, []);
  return (
    <CommonLayout parent="home" title="Tracking">
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
                        disabled={buttonLoader}
                      >
                        {buttonValue}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
            <br></br>
            <Row>
              {/* strat*/}
              {trackingDetails && (
                <div className="container">
                  <article className="card">
                    <header className="card-header">
                      My Orders / Tracking
                    </header>
                    <div className="card-body">
                      <h6>
                        Order ID : <b>{refNumber}</b>
                      </h6>
                      <article className="card">
                        <div className="card-body row">
                          <div className="col">
                            <strong>Estimated Delivery time:</strong> <br></br>
                            {trackingDetails.etaDate != null &&
                              moment(trackingDetails.etaDate).format(
                                "DD-MMM-yy"
                              )}
                          </div>
                          <div className="col">
                            <strong>Contact :</strong> <br></br>
                            {/* BLUEDART, | */}
                            <i className="fa fa-phone"></i>{" "}
                            {JSON.parse(localStorage.getItem("User")).mobile}
                          </div>
                          <div className="col">
                            <strong>Status:</strong> <br></br>
                            {parcelStatus}
                          </div>
                          <div className="col">
                            <strong>Tracking :</strong> <br></br>
                            {refNumber}
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
                          <span className="text">Parcel On Clearance</span>
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
                      {/* <ul className="row">
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
                      </ul> */}
                      {/* <hr></hr> */}
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
