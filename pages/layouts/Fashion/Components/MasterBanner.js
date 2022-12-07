import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { ApiUrl } from "../../../../config/api-config";

const MasterBanner = ({ img, title, desc, link, classes, btn, btnClass }) => {
  const [selected, setSelected] = useState("Quote");
  const [quoteButtonColor, setQuoteButtonColor] = useState("#FF4C3B");
  const [TrackingButtonColor, setTrackingButtonColor] = useState("white");
  const [quotTextColor, setQuoteTextColor] = useState("white");
  const [trackingTextColor, setTrackingTextColor] = useState("black");
  const [refNumber, setRefNumber] = useState("");
  const [trackingDetails, setTrackingDetails] = useState("");
  //Quote Form Variables
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [length, setLength] = useState("");
  const [weight, setWeight] = useState("");

  //Select Quote UI
  const selectQuote = () => {
    setSelected("Quote");
    setQuoteButtonColor("#FF4C3B");
    setTrackingButtonColor("white");
    setQuoteTextColor("white");
    setTrackingTextColor("black");
  };
  const selectTrack = () => {
    setSelected("Track");
    setQuoteButtonColor("white");
    setTrackingButtonColor("#FF4C3B");
    setQuoteTextColor("black");
    setTrackingTextColor("white");
  };

  const QuoteSubmit = () => {
    const model = {
      customerName: name,
      email: email,
      height: height,
      length: length,
      mobile: mobile,
      weight: weight,
      width: width,
    };
    axios
      .post("http://185.196.21.84:8088/quote/create", model)
      .then((response) => {
        if (response.status == 200) {
          toast.success(
            "Quotation sent to string successfully. Please check !!"
          );
          setEmail("");
          setName("");
          setHeight("");
          setMobile("");
          setLength("");
          setWeight("");
          setWidth("");
        }
      })
      .catch((error) => {
        console.log("QUOTE_ERROR==>", error);
      });
  };
  const router = useRouter();
  const parcelSearch = () => {
    axios
      .get(ApiUrl + "/orders/track?reference=" + refNumber)
      .then((response) => {
        console.log("TRACKING_RESPONSE", response.data.data);
        localStorage.setItem("Tracking", JSON.stringify(response.data.data));
        router.push("/page/tracking");
      })
      .catch((error) => {
        console.log("TRACKING_ERROR", error);
      });
  };
  return (
    <div>
      <div className={`home ${img} ${classes ? classes : "text-center"}`}>
        <Container>
          <Row>
            <Col md="7">
              <div className="slider-contain">
                <div>
                  <h4 style={{ color: "white", fontSize: "25px" }}>{title}</h4>
                  <h1 style={{ color: "white" }}>{desc}</h1>
                  <Link href="/page/tracking">
                    <a className={`btn ${btnClass ? btnClass : "btn-solid"}`}>
                      {btn ? btn : "track now"}{" "}
                    </a>
                  </Link>
                </div>
              </div>
            </Col>
            <Col className="pt-4 ">
              <Card className="mt-5 ml-4 " style={{ borderRadius: "25px" }}>
                <CardBody>
                  <Row>
                    <Col md="6">
                      <Button
                        onClick={() => {
                          selectQuote();
                        }}
                        style={{
                          background: quoteButtonColor,
                        }}
                      >
                        <a
                          onClick={() => {
                            selectQuote();
                          }}
                          style={{
                            color: quotTextColor,
                          }}
                        >
                          Quote
                        </a>
                      </Button>
                      <Button
                        onClick={() => {
                          selectTrack();
                        }}
                        style={{ background: TrackingButtonColor }}
                      >
                        <a
                          onClick={() => {
                            selectQuote();
                          }}
                          style={{
                            color: trackingTextColor,
                          }}
                        >
                          Tracking
                        </a>
                      </Button>
                    </Col>
                    <Col sm="6"></Col>
                  </Row>
                  {selected == "Quote" ? (
                    <Form className="mt-4 ">
                      <Row>
                        <Col style={{ textAlign: "left" }}>
                          <Label style={{ fontWeight: "bold" }}>Name</Label>
                          <Input
                            value={name}
                            placeholder="Enter your name"
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                          ></Input>
                        </Col>
                        <Col>
                          <FormGroup style={{ textAlign: "left" }}>
                            <Label style={{ fontWeight: "bold" }}>Mobile</Label>
                            <Input
                              value={mobile}
                              placeholder="Enter your mobile"
                              onChange={(e) => {
                                setMobile(e.target.value);
                              }}
                            ></Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col>
                          <FormGroup style={{ textAlign: "left" }}>
                            <Label style={{ fontWeight: "bold" }}>Email</Label>
                            <Input
                              value={email}
                              placeholder="Enter your email"
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                            ></Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col>
                          <FormGroup style={{ textAlign: "left" }}>
                            <Label style={{ fontWeight: "bold" }}>Width</Label>
                            <Input
                              value={width}
                              placeholder="Enter width"
                              onChange={(e) => {
                                setWidth(e.target.value);
                              }}
                            ></Input>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup style={{ textAlign: "left" }}>
                            <Label style={{ fontWeight: "bold" }}>Height</Label>
                            <Input
                              value={height}
                              placeholder="Enter height"
                              onChange={(e) => {
                                setHeight(e.target.value);
                              }}
                            ></Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col>
                          <FormGroup style={{ textAlign: "left" }}>
                            <Label style={{ fontWeight: "bold" }}>Length</Label>
                            <Input
                              value={length}
                              placeholder="Enter length"
                              onChange={(e) => {
                                setLength(e.target.value);
                              }}
                            ></Input>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup style={{ textAlign: "left" }}>
                            <Label style={{ fontWeight: "bold" }}>Weight</Label>
                            <Input
                              value={weight}
                              placeholder="Enter weight"
                              onChange={(e) => {
                                setWeight(e.target.value);
                              }}
                            ></Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col className="md-4"></Col>
                        <Col className="md-4">
                          <Button
                            onClick={() => {
                              QuoteSubmit();
                            }}
                            className="btn btn-solid"
                          >
                            Submit
                          </Button>
                        </Col>
                        <Col className="md-4"></Col>
                      </Row>
                    </Form>
                  ) : (
                    <Form className="mt-4">
                      <Row className="mt-4">
                        <FormGroup style={{ textAlign: "left" }}>
                          <Label style={{ fontWeight: "bold" }}>
                            Tracking Number
                          </Label>
                          <Input
                            value={refNumber}
                            placeholder="Enter tracking number or invoice number"
                            onChange={(e) => {
                              setRefNumber(e.target.value);
                            }}
                          ></Input>
                        </FormGroup>
                      </Row>
                      <Row className="mt-4">
                        <Col className="md-4"></Col>
                        <Col className="md-4">
                          <Button
                            onClick={() => {
                              parcelSearch();
                            }}
                            className="btn btn-solid"
                          >
                            Track Now
                          </Button>
                        </Col>
                        <Col className="md-4"></Col>
                      </Row>
                    </Form>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default MasterBanner;
