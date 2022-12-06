import Link from "next/link";
import { useState } from "react";
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

const MasterBanner = ({ img, title, desc, link, classes, btn, btnClass }) => {
  const [selected, setSelected] = useState("Quote");
  const [quoteButtonColor, setQuoteButtonColor] = useState("#FF4C3B");
  const [TrackingButtonColor, setTrackingButtonColor] = useState("white");
  const [quotTextColor, setQuoteTextColor] = useState("white");
  const [trackingTextColor, setTrackingTextColor] = useState("black");
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
                          <Input placeholder="Enter your name"></Input>
                        </Col>
                        <Col>
                          <FormGroup style={{ textAlign: "left" }}>
                            <Label style={{ fontWeight: "bold" }}>Mobile</Label>
                            <Input placeholder="Enter your mobile"></Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col>
                          <FormGroup style={{ textAlign: "left" }}>
                            <Label style={{ fontWeight: "bold" }}>Email</Label>
                            <Input placeholder="Enter your email"></Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col>
                          <FormGroup style={{ textAlign: "left" }}>
                            <Label style={{ fontWeight: "bold" }}>Width</Label>
                            <Input placeholder="Enter width"></Input>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup style={{ textAlign: "left" }}>
                            <Label style={{ fontWeight: "bold" }}>Height</Label>
                            <Input placeholder="Enter height"></Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col>
                          <FormGroup style={{ textAlign: "left" }}>
                            <Label style={{ fontWeight: "bold" }}>Length</Label>
                            <Input placeholder="Enter length"></Input>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup style={{ textAlign: "left" }}>
                            <Label style={{ fontWeight: "bold" }}>Weight</Label>
                            <Input placeholder="Enter weight"></Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col className="md-4"></Col>
                        <Col className="md-4">
                          <Button className="btn btn-solid">Submit</Button>
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
                          <Input placeholder="Enter tracking number or invoice number"></Input>
                        </FormGroup>
                      </Row>
                      <Row className="mt-4">
                        <Col className="md-4"></Col>
                        <Col className="md-4">
                          <Button className="btn btn-solid">Track Now</Button>
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
