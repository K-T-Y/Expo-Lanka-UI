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
          <Col sm="6">
            <Form className="form-inline tracking-form">
              <div className="mx-lg-6">
                <div className="mx-sm-3">
                  <Input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter your tracking code"
                    style={{ height: "50px", width: "500px" }}
                  />
                </div>
              </div>
              <Button type="submit" className="btn btn-solid">
                Track
              </Button>
            </Form>
          </Col>
        </Container>
      </section>
    </CommonLayout>
  );
};
export default Tracking;
