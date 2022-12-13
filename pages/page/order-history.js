import axios from "axios";
import moment from "moment/moment";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
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

const OrderHistory = () => {
  const [oderDetails, setOrderDetails] = useState("");
  const getOrderDetails = () => {
    console.log("Started");
    axios
      .post(ApiUrl + "/orders/search?page=0&size=10", {
        customerId: JSON.parse(localStorage.getItem("User")).id,
      })
      .then((response) => {
        console.log("Response", response.data.data.content);
        setOrderDetails(response.data.data.content);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  useEffect(() => {
    if (localStorage.getItem("User") != "") {
      getOrderDetails();
    }
  }, []);

  return (
    <CommonLayout parent="home" title="Order History">
      <section className="order history section-b-space">
        <Container>
          <div className=" px-4 py-0">
            <h5 className="text-muted mb-0">
              {oderDetails.length > 0 && oderDetails.length > 0
                ? " Thanks for your orders,  "
                : "No orders to show!"}
              <span style={{ color: "black" }}>
                {oderDetails.length > 0 &&
                  oderDetails[0].billingDetails.fullName}
                !
              </span>
            </h5>
          </div>
          <Row>
            <section className="py-4 h-100">
              {oderDetails &&
                oderDetails.map((item, index) => {
                  if (index < 4) {
                    return (
                      <div className="container  h-100">
                        <>
                          <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-lg-10 col-xl-8">
                              <div
                                className="card"
                                style={{ borderRadius: "10px" }}
                              >
                                <div className="card-body p-4">
                                  <div className="d-flex justify-content-between align-items-center mb-4">
                                    <p
                                      className="lead fw-normal mb-0"
                                      style={{ color: "black" }}
                                    >
                                      Receipt details
                                    </p>
                                    {/* <p className="small text-muted mb-0">
                                      Receipt Voucher : 1KAU9-84UIL
                                  </p> */}
                                  </div>
                                  {item.orderDetails &&
                                    item.orderDetails.map((subitem) => {
                                      return (
                                        <div className="card shadow-0 border mb-4">
                                          <div className="card-body">
                                            <div className="row">
                                              <div className="col-md-2">
                                                <img
                                                  src={
                                                    subitem.product
                                                      .productImages.length >
                                                      0 &&
                                                    subitem.product
                                                      .productImages[0].imageUrl
                                                  }
                                                  className="img-fluid"
                                                  alt="Phone"
                                                />
                                              </div>
                                              <div className="col-md-5  d-flex justify-content-center align-items-center">
                                                <p className="text-muted mb-0">
                                                  {subitem &&
                                                    subitem.product.productName}
                                                </p>
                                              </div>
                                              {/* <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                  <p className="text-muted mb-0 small">White</p>
                                 </div> */}
                                              {/* <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                  <p className="text-muted mb-0 small">
                                    Capacity: 64GB
                                  </p>
                                 </div> */}
                                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                <p className="text-muted mb-0 small">
                                                  Qty:
                                                  {subitem && subitem.qty}
                                                </p>
                                              </div>
                                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                <p className="text-muted mb-0 small">
                                                  € {subitem && subitem.price}
                                                </p>
                                              </div>
                                            </div>
                                            {/* <hr
                                 className="mb-4"
                                 style={{
                                 backgroundColor: "#e0e0e0",
                                  opacity: "1",
                                  }}
                                 // style="background-color: #e0e0e0; opacity: 1;"
                                  /> */}
                                            {/* <div className="row d-flex align-items-center">
                                 <div className="col-md-2">
                                 <p className="text-muted mb-0 small">
                                  Track Order
                                  </p>
                                  </div>
                                  <div className="col-md-10">
                                 <div
                                  className="progress"
                                  style={{
                                    height: "6px",
                                    borderRadius: "16px",
                                  }}
                                  // style="height: 6px; border-radius: 16px;"
                                  >
                                  <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{
                                      width: "65%",
                                      borderRadius: "16px",
                                      backgroundColor: "#a8729a",
                                    }}
                                    // style="width: 65%; border-radius: 16px; background-color: #a8729a;"
                                    aria-valuenow="65"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                  </div>
                                 <div className="d-flex justify-content-around mb-1">
                                  <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                    Out for delivary
                                  </p>
                                  <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                    Delivered
                                  </p>
                                  </div>
                                   </div>
                                 </div> */}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  {/* <div className="card shadow-0 border mb-4">
                                    <div className="card-body">
                                  <div className="row">
                                <div className="col-md-2">
                                <img
                                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/1.webp"
                                  className="img-fluid"
                                  alt="Phone"
                                />
                               </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                  <p className="text-muted mb-0">iPad</p>
                                </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0 small">
                                  Pink rose
                                </p>
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0 small">
                                  Capacity: 32GB
                                </p>
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0 small">Qty: 1</p>
                              </div>
                              <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0 small">$399</p>
                              </div>
                            </div>
                            <hr
                              className="mb-4"
                              style={{
                                backgroundColor: " #e0e0e0",
                                opacity: "1",
                              }}
                              // style="background-color: #e0e0e0; opacity: 1;"
                            />
                            <div className="row d-flex align-items-center">
                              <div className="col-md-2">
                                <p className="text-muted mb-0 small">
                                  Track Order
                                </p>
                              </div>
                              <div className="col-md-10">
                                <div
                                  className="progress"
                                  style={{
                                    height: "6px",
                                    borderRadius: "16px",
                                  }}
                                  // style="height: 6px; border-radius: 16px;"
                                >
                                  <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{
                                      width: "20%",
                                      borderRadius: "16px",
                                      backgroundColor: "#a8729a",
                                    }}
                                    // style="width: 20%; border-radius: 16px; background-color: #a8729a;"
                                    aria-valuenow="20"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                                <div className="d-flex justify-content-around mb-1">
                                  <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                    Out for delivary
                                  </p>
                                  <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                    Delivered
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}

                                  <div className="d-flex justify-content-between pt-2">
                                    <p className="fw-bold mb-0">
                                      Order Details
                                    </p>
                                    {/* <p className="text-muted mb-0 mt-3">
                            <span className="fw-bold me-4">Total : </span> €
                            {oderDetails && oderDetails[0].payableAmount}
                          </p> */}
                                  </div>
                                  <br></br>

                                  <div className="d-flex justify-content-between pt-2">
                                    <p className="text-muted mb-0">
                                      Invoice Number :{" "}
                                      {item && item.referenceNo}
                                    </p>

                                    <p className="text-muted mb-0  mt-3">
                                      <span className="fw-bold me-4">
                                        Discount :{" "}
                                      </span>
                                      € {item && item.discountAmount}
                                    </p>
                                  </div>

                                  <div className="d-flex justify-content-between">
                                    <p className="text-muted mb-0">
                                      Invoice Date :
                                      {item &&
                                        moment(
                                          item.billingDetails.createdAt
                                        ).format("DD-MMM-yy")}
                                    </p>
                                    {/* <p className="text-muted mb-0">
                            <span className="fw-bold me-4">GST 18%</span> 123
                          </p> */}
                                  </div>

                                  <div className="d-flex justify-content-between mb-2">
                                    <p className="text-muted mb-0">
                                      {/* Recepits Voucher : 18KU-62IIK */}
                                    </p>
                                    <p className="text-muted mb-0">
                                      <span className="fw-bold me-4">
                                        Delivery Charges :
                                      </span>
                                      € {item && item.shippingCost}
                                    </p>
                                  </div>
                                </div>
                                <div
                                  className="card-footer border-5"
                                  style={{
                                    backgroundColor: "#FF4C3B",
                                    borderBottomLeftRadius: "10px",
                                    borderBottomRightRadius: "10px",
                                  }}
                                  // style="background-color: #a8729a; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;"
                                >
                                  <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                                    Total paid :
                                    <span
                                      className="h3 mb-0 ms-2"
                                      style={{ color: "black" }}
                                    >
                                      € {item && item.payableAmount}
                                    </span>
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                        <br></br>
                      </div>
                    );
                  }
                })}
            </section>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};
export default OrderHistory;
