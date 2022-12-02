import React from "react";
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

const Tracking = () => {
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
                      />
                    </Col>
                    <Col>
                      <Button type="submit" className="btn btn-solid">
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
          </div>
        </Container>
      </section>
    </CommonLayout>
  );
};
export default Tracking;
