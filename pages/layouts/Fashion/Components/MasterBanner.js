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
  const [TrackingButtonColor, setTrackingButtonColor] = useState("#a8b1bd");
  const selectQuote = () => {
    setSelected("Quote");
    setQuoteButtonColor("#FF4C3B");
    setTrackingButtonColor("#a8b1bd");
  };
  const selectTrack = () => {
    setSelected("Track");
    setQuoteButtonColor("#a8b1bd");
    setTrackingButtonColor("#FF4C3B");
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
                  <h1>{desc}</h1>
                  <Link href={link}>
                    <a className={`btn ${btnClass ? btnClass : "btn-solid"}`}>
                      {btn ? btn : "track now"}{" "}
                    </a>
                  </Link>
                </div>
              </div>
            </Col>
            <Col className="pt-4 ">
              <Card className="mt-5 ml-4 ">
                <CardBody>
                  <Row>
                    <Col md="6">
                      <Button
                        onClick={() => {
                          selectQuote();
                        }}
                        style={{ background: quoteButtonColor }}
                      >
                        Quote
                      </Button>
                      <Button
                        onClick={() => {
                          selectTrack();
                        }}
                        style={{ background: TrackingButtonColor }}
                      >
                        Tracking
                      </Button>
                    </Col>
                    <Col sm="6"></Col>
                  </Row>
                  {selected == "Quote" ? (
                    <Form className="mt-4 ">
                      <Row>
                        <Col>
                          <Label style={{ fontWeight: "bold" }}>Name</Label>
                          <Input placeholder="Name"></Input>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label style={{ fontWeight: "bold" }}>Mobile</Label>
                            <Input placeholder="Mobile"></Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col>
                          <FormGroup>
                            <Label style={{ fontWeight: "bold" }}>Email</Label>
                            <Input placeholder="Email"></Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col>
                          <FormGroup>
                            <Label style={{ fontWeight: "bold" }}>Width</Label>
                            <Input placeholder="Width"></Input>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label style={{ fontWeight: "bold" }}>Height</Label>
                            <Input placeholder="Height"></Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col>
                          <FormGroup>
                            <Label style={{ fontWeight: "bold" }}>Length</Label>
                            <Input placeholder="Length"></Input>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label style={{ fontWeight: "bold" }}>Weight</Label>
                            <Input placeholder="Weight"></Input>
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
                        <FormGroup>
                          <Input placeholder="Tracking Number or Invoice Number"></Input>
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
