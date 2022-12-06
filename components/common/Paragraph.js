import React from "react";
import { Container, Row, Col } from "reactstrap";

const Paragraph = ({ title, inner, line, hrClass }) => {
  return (
    <>
      <div className={title}>
        <h4>Categories</h4>
        <h2 className={inner}>our collection</h2>
        {line ? (
          <div className="line"></div>
        ) : hrClass ? (
          <hr role="tournament6"></hr>
        ) : (
          ""
        )}
      </div>
      <Container>
        <Row>
          <Col lg="6" className="m-auto">
            <div className="product-para">
              <p className="text-center">
                Join Expo Sri Lanka to get everything you need in one place in
                just a few clicks. We approach every need of our customer with
                utmost flexibility.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Paragraph;
