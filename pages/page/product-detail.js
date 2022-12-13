import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CommonLayout from "../../components/shop/common-layout";
import { ApiUrl } from "../../config/api-config";

const ProductDetail = () => {
  const [item, setItem] = useState();

  const router = new useRouter();

  useEffect(() => {
    setItem(JSON.parse(localStorage.getItem("selectedProduct")));
  }, []);

  // const addtoCart = () => {
  //   const model = {
  //     id: JSON.parse(localStorage.getItem("User")).id,
  //     productId: JSON.parse(localStorage.getItem("selectedProduct")).id,
  //     qty: 1,
  //   };
  //   axios
  //     .post(
  //       ApiUrl +
  //         "/shopping-session/add/cart-item/" +
  //         JSON.parse(localStorage.getItem("ShoppingSession")).data.id,
  //       model
  //     )
  //     .then((response) => {
  //       console.log("Response", response);
  //       if (response.status == 200) {
  //         toast.success("Item Added To Cart !!");
  //         getSession();
  //       }
  //     })
  //     .then((error) => {
  //       console.log("ERROR_ADDING_CART==>", error);
  //     });
  //   console.log(
  //     "APIURL",
  //     ApiUrl +
  //       "/shopping-session/add/cart-item/" +
  //       JSON.parse(localStorage.getItem("ShoppingSession")).data.id
  //   );
  //   console.log("Model", model);
  // };
  const addtoCart = (itemId) => {
    console.log("Started");

    if (localStorage.getItem("User") == "") {
      router.push("/page/account/login");
    } else {
      setButtonDisable(true);
      const model = {
        id: JSON.parse(localStorage.getItem("User")).id,
        productId: itemId,
        qty: 1,
      };
      console.log("Modal", model);
      axios
        .post(
          ApiUrl +
            "/shopping-session/add/cart-item/" +
            JSON.parse(localStorage.getItem("ShoppingSession")).data.id,
          model
        )
        .then((response) => {
          setTimeout(function () {}, 2000);
          if (response.status == 200) {
            setButtonDisable(false);
            toast.success("Item Added To Cart !!");
            getSession();
          }
        })
        .then((error) => {
          console.log("ERROR_ADDING_CART==>", error);
        });
      console.log(
        "APIURL",
        ApiUrl +
          "/shopping-session/add/cart-item/" +
          JSON.parse(localStorage.getItem("ShoppingSession")).data.id
      );
    }
  };
  const getSession = () => {
    axios
      .get(
        ApiUrl +
          "/shopping-session/get/session/" +
          JSON.parse(localStorage.getItem("User")).id
      )
      .then((sessionresponse) => {
        if (sessionresponse.status == 200) {
          console.log("SHOPPING_SESSION", sessionresponse);
          localStorage.setItem(
            "ShoppingSession",
            JSON.stringify(sessionresponse.data)
          );
        }
      })
      .catch((error) => {
        console.log("SESSION_ERROR", error);
      });
  };
  return (
    <CommonLayout parent="home" title="Product Detail">
      <section className="order history section-b-space">
        <section>
          <div class="collection-wrapper">
            <div class="container">
              <div class="row">
                <div class="col-lg-6">
                  <div class="product-slick">
                    <div>
                      {JSON.parse(localStorage.getItem("selectedProduct")) && (
                        <img
                          src={
                            JSON.parse(localStorage.getItem("selectedProduct"))
                              .productImages[0].imageUrl
                          }
                          alt=""
                          class="img-fluid blur-up lazyload image_zoom_cls-0"
                        />
                      )}
                    </div>
                    {/* <div>
                      <img
                        src="../assets/images/pro3/2.jpg"
                        alt=""
                        class="img-fluid blur-up lazyload image_zoom_cls-1"
                      />
                    </div>
                    <div>
                      <img
                        src="../assets/images/pro3/27.jpg"
                        alt=""
                        class="img-fluid blur-up lazyload image_zoom_cls-2"
                      />
                    </div>
                    <div>
                      <img
                        src="../assets/images/pro3/27.jpg"
                        alt=""
                        class="img-fluid blur-up lazyload image_zoom_cls-3"
                      />
                    </div> */}
                  </div>
                  <div class="row">
                    <div class="col-12 p-0">
                      <div class="slider-nav">
                        {/* <div>
                          <img
                            src="../assets/images/pro3/1.jpg"
                            alt=""
                            class="img-fluid blur-up lazyload"
                          />
                        </div> */}
                        {/* <div>
                          <img
                            src="../assets/images/pro3/2.jpg"
                            alt=""
                            class="img-fluid blur-up lazyload"
                          />
                        </div>
                        <div>
                          <img
                            src="../assets/images/pro3/27.jpg"
                            alt=""
                            class="img-fluid blur-up lazyload"
                          />
                        </div>
                        <div>
                          <img
                            src="../assets/images/pro3/27.jpg"
                            alt=""
                            class="img-fluid blur-up lazyload"
                          />
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 rtl-text">
                  <div class="product-right">
                    {/* <div class="product-count">
                      <ul>
                        <li>
                          <img
                            src="../assets/images/fire.gif"
                            class="img-fluid"
                            alt="image"
                          />
                          <span class="p-counter">37</span>
                          <span class="lang">orders in last 24 hours</span>
                        </li>
                        <li>
                          <img
                            src="../assets/images/person.gif"
                            class="img-fluid user_img"
                            alt="image"
                          />
                          <span class="p-counter">44</span>
                          <span class="lang">active view this</span>
                        </li>
                      </ul>
                    </div> */}
                    {JSON.parse(localStorage.getItem("selectedProduct")) && (
                      <h2>
                        {
                          JSON.parse(localStorage.getItem("selectedProduct"))
                            .productName
                        }
                      </h2>
                    )}

                    <div className="product-detail">
                      {JSON.parse(localStorage.getItem("selectedProduct")) &&
                      JSON.parse(localStorage.getItem("selectedProduct"))
                        .overallRating == "" ? (
                        <h4>Ratings Not Available.</h4>
                      ) : (
                        <>
                          {JSON.parse(localStorage.getItem("selectedProduct"))
                            .overallRating == 0.5 ? (
                            <div className="rating">
                              <i className="fa fa-star-half-o text-warning"></i>
                            </div>
                          ) : (
                            <>
                              {JSON.parse(
                                localStorage.getItem("selectedProduct")
                              ).overallRating == 1 ? (
                                <div className="rating">
                                  <i className="fa fa-star"></i>
                                </div>
                              ) : (
                                <>
                                  {JSON.parse(
                                    localStorage.getItem("selectedProduct")
                                  ).overallRating == 1.5 ? (
                                    <div className="rating">
                                      <i className="fa fa-star"></i>

                                      <i className="fa fa-star-half-o text-warning"></i>
                                    </div>
                                  ) : (
                                    <>
                                      {JSON.parse(
                                        localStorage.getItem("selectedProduct")
                                      ).overallRating == 2 ? (
                                        <div className="rating">
                                          <i className="fa fa-star"></i>
                                          <i className="fa fa-star"></i>
                                        </div>
                                      ) : (
                                        <>
                                          {JSON.parse(
                                            localStorage.getItem(
                                              "selectedProduct"
                                            )
                                          ).overallRating == 2.5 ? (
                                            <div className="rating">
                                              <i className="fa fa-star"></i>

                                              <i className="fa fa-star"></i>
                                              <i className="fa fa-star-half-o text-warning"></i>
                                            </div>
                                          ) : (
                                            <>
                                              {JSON.parse(
                                                localStorage.getItem(
                                                  "selectedProduct"
                                                )
                                              ).overallRating == 3 ? (
                                                <div className="rating">
                                                  <i className="fa fa-star"></i>
                                                  <i className="fa fa-star"></i>
                                                  <i className="fa fa-star"></i>
                                                </div>
                                              ) : (
                                                <>
                                                  {JSON.parse(
                                                    localStorage.getItem(
                                                      "selectedProduct"
                                                    )
                                                  ).overallRating == 3.5 ? (
                                                    <div className="rating">
                                                      <i className="fa fa-star"></i>
                                                      <i className="fa fa-star"></i>
                                                      <i className="fa fa-star"></i>

                                                      <i className="fa fa-star-half-o text-warning"></i>
                                                    </div>
                                                  ) : (
                                                    <>
                                                      {JSON.parse(
                                                        localStorage.getItem(
                                                          "selectedProduct"
                                                        )
                                                      ).overallRating == 4 ? (
                                                        <div className="rating">
                                                          <i className="fa fa-star"></i>
                                                          <i className="fa fa-star"></i>
                                                          <i className="fa fa-star"></i>
                                                          <i className="fa fa-star"></i>
                                                        </div>
                                                      ) : (
                                                        <>
                                                          {JSON.parse(
                                                            localStorage.getItem(
                                                              "selectedProduct"
                                                            )
                                                          ).overallRating ==
                                                          4.5 ? (
                                                            <div className="rating">
                                                              <i className="fa fa-star"></i>
                                                              <i className="fa fa-star"></i>
                                                              <i className="fa fa-star"></i>
                                                              <i className="fa fa-star"></i>
                                                              <i className="fa fa-star-half-o text-warning"></i>
                                                            </div>
                                                          ) : (
                                                            <>
                                                              {JSON.parse(
                                                                localStorage.getItem(
                                                                  "selectedProduct"
                                                                )
                                                              ).overallRating ==
                                                              5 ? (
                                                                <div className="rating">
                                                                  <i className="fa fa-star"></i>
                                                                  <i className="fa fa-star"></i>
                                                                  <i className="fa fa-star"></i>
                                                                  <i className="fa fa-star"></i>
                                                                  <i className="fa fa-star"></i>
                                                                </div>
                                                              ) : (
                                                                <h4
                                                                  style={{
                                                                    fontWeight:
                                                                      "normal",
                                                                  }}
                                                                >
                                                                  {/* Ratings
                                                                                Not
                                                                                Available. */}
                                                                </h4>
                                                              )}
                                                            </>
                                                          )}
                                                        </>
                                                      )}
                                                    </>
                                                  )}
                                                </>
                                              )}
                                            </>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                      <br></br>
                      <a>
                        <h6>
                          {JSON.parse(localStorage.getItem("selectedProduct"))
                            .productName &&
                            JSON.parse(localStorage.getItem("selectedProduct"))
                              .productName}
                        </h6>
                      </a>
                      <h4>
                        €
                        {JSON.parse(localStorage.getItem("selectedProduct"))
                          .sellingPrice &&
                          JSON.parse(localStorage.getItem("selectedProduct"))
                            .sellingPrice}
                      </h4>
                      {/* <ul className="color-variant">
                            <li className="bg-light0"></li>
                            <li className="bg-light1"></li>
                            <li className="bg-light2"></li>
                          </ul> */}
                    </div>
                    <br></br>
                    {/* <div class="label-section">
                      <span class="badge badge-grey-color">#1 Best seller</span>
                      <span class="label-text">in fashion</span>
                    </div> */}
                    <h3 class="price-detail">
                      €
                      {
                        JSON.parse(localStorage.getItem("selectedProduct"))
                          .discountedPrice
                      }
                      <del>
                        €
                        {
                          JSON.parse(localStorage.getItem("selectedProduct"))
                            .sellingPrice
                        }
                      </del>
                      {/* <span> 55% off</span> */}
                    </h3>
                    {/* <ul class="color-variant">
                      <li class="bg-light0 active"></li>
                      <li class="bg-light1"></li>
                      <li class="bg-light2"></li>
                    </ul> */}
                    {/* <div
                      id="selectSize"
                      class="addeffect-section product-description border-product"
                    >
                      <h6 class="product-title size-text">
                        select size{" "}
                        <span>
                          <a
                            href=""
                            data-bs-toggle="modal"
                            data-bs-target="#sizemodal"
                          >
                            size chart
                          </a>
                        </span>
                      </h6>
                      <div
                        class="modal fade"
                        id="sizemodal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div
                          class="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">
                                Sheer Straight Kurta
                              </h5>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                              <img
                                src="../assets/images/size-chart.jpg"
                                alt=""
                                class="img-fluid blur-up lazyload"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <h6 class="error-message">please select size</h6>
                      <div class="size-box">
                        <ul>
                          <li>
                            <a href="javascript:void(0)">s</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)">m</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)">l</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)">xl</a>
                          </li>
                        </ul>
                      </div>
                      <div className="mobile-cart-content row">
                              <div className="col-xs-3">
                                <div className="qty-box">
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      name="quantity"
                                      className="form-control input-number"
                                      // defaultValue={item.qty}
                                      style={{
                                        borderColor: quantityError && "red",
                                      }}
                                    />
                                  </div>
                                </div>
                                {item.qty >= item.stock ? "out of Stock" : ""}
                              </div>
                    </div> */}
                    {/* <div className="qty-box">
                      <div className="input-group">
                        <input
                          type="number"
                          name="quantity"
                          className="form-control input-number"
                        />
                      </div>
                    </div> */}

                    <br></br>
                    <br></br>
                    <div class="product-buttons">
                      <button
                        onClick={() => {
                          addtoCart(item.id);
                        }}
                        id="cartEffect"
                        class="btn btn-solid hover-solid btn-animation"
                      >
                        <i
                          class="fa fa-shopping-cart me-1"
                          aria-hidden="true"
                        ></i>{" "}
                        add to cart
                      </button>{" "}
                      <br></br>
                      <br></br>
                      {/* <a href="#" class="btn btn-solid">
                        <i
                          class="fa fa-bookmark fz-16 me-2"
                          aria-hidden="true"
                        ></i>
                        wishlist
                      </a> */}
                    </div>
                    {/* <div class="product-count">
                      <ul>
                        <li>
                          <img
                            src="../assets/images/icon/truck.png"
                            class="img-fluid"
                            alt="image"
                          />
                          <span class="lang">
                            Free shipping for orders above $500 USD
                          </span>
                        </li>
                      </ul>
                    </div> */}
                    {/* <div class="border-product">
                      <h6 class="product-title">Sales Ends In</h6>
                      <div class="timer">
                        <p id="demo"></p>
                      </div>
                    </div> */}
                    <div class="border-product">
                      <h6 class="product-title">Product Info</h6>
                      <ul class="shipping-info">
                        {/* <li>100% Original Products</li>
                        <li>Free Delivery on order above Rs. 799</li>
                        <li>Pay on delivery is available</li>
                        <li>Easy 30 days returns and exchanges</li> */}
                        <p>
                          {
                            JSON.parse(localStorage.getItem("selectedProduct"))
                              .productDescription
                          }
                        </p>
                      </ul>
                    </div>
                    {/* <div class="border-product">
                      <h6 class="product-title">share it</h6>
                      <div class="product-icon">
                        <ul class="product-social">
                          <li>
                            <a href="#">
                              <i class="fa fa-facebook-f"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="fa fa-google-plus"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="fa fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="fa fa-instagram"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="fa fa-rss"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div> */}
                    <div class="border-product">
                      <h6 class="product-title">100% secure payment</h6>
                      <image
                        src="../assets/images/payment.png"
                        class="img-fluid mt-1"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </CommonLayout>
  );
};
export default ProductDetail;
