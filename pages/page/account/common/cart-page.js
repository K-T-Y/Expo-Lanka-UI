import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import CartContext from "../../../../helpers/cart";
import { Container, Row, Col, Media, Input } from "reactstrap";
import { CurrencyContext } from "../../../../helpers/Currency/CurrencyContext";
import cart from "../../../../public/assets/images/icon-empty-cart.png";
import { stringifyForDisplay } from "@apollo/client/utilities";
import { use } from "i18next";
import axios from "axios";
import { ApiUrl } from "../../../../config/api-config";

const CartPage = () => {
  const context = useContext(CartContext);
  //const cartItems = context.state;
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;
  //const total = context.cartTotal;
  const removeFromCart = context.removeFromCart;
  const [quantity, setQty] = useState(1);
  const [quantityError, setQuantityError] = useState(false);
  //const updateQty = context.updateQty;

  const [cartItems, setCartItems] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const handleQtyUpdate = (item, quantity) => {
    if (quantity >= 1) {
      setQuantityError(false);
      // updateQty(item, quantity);
    } else {
      setQuantityError(true);
    }
  };

  // const changeQty = (e) => {
  //   setQuantity(parseInt(e.target.value));
  // };

  const minusQty = () => {
    if (quantity > 1) {
      setStock("InStock");
      setQty(quantity - 1);
    }
  };
  const updateQty = (item, qty) => {
    console.log("Update Item==>", item, "Qty==>", qty);
  };
  const deleteItem = (item) => {
    const session = JSON.parse(localStorage.getItem("ShoppingSession"));
    console.log("Delete Item==>", item);

    axios
      .put(
        ApiUrl +
          "/shopping-session/remove/cart-item/" +
          session.data.id +
          "/" +
          item.id
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const plusQty = (product) => {
    if (product.stock >= quantity) {
      setQty(quantity + 1);
    } else {
      setStock("Out of Stock !");
    }
  };
  const getCarttot = () => {
    let total = 0;
    if (
      localStorage.getItem("ShoppingSession") != "" ||
      localStorage.getItem("ShoppingSession")
    ) {
      JSON.parse(
        localStorage.getItem("ShoppingSession")
      ).data.cartItemList.forEach((element) => {
        total = total + element.qty * element.product.sellingPrice;
      });
    }

    setCartTotal(total);
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

  useEffect(() => {
    //getSession();
    if (localStorage.getItem("User") != "") {
      if (cartItems == "") {
        if (
          localStorage.getItem("ShoppingSession") != "" ||
          localStorage.getItem("ShoppingSession")
        ) {
          let temp = JSON.parse(localStorage.getItem("ShoppingSession"));
          setCartItems(temp.data.cartItemList);
        }
      }
    }

    getCarttot();
  }, []);

  return (
    <div>
      {cartItems && cartItems.length > 0 ? (
        <section className="cart-section section-b-space">
          <Container>
            <Row>
              <Col sm="12">
                <table className="table cart-table table-responsive-xs">
                  <thead>
                    <tr className="table-head">
                      <th scope="col">image</th>
                      <th scope="col">product name</th>
                      <th scope="col">price</th>
                      <th scope="col">quantity</th>
                      <th scope="col">action</th>
                      <th scope="col">total</th>
                    </tr>
                  </thead>
                  {cartItems.map((item, index) => {
                    let itemprice = item.product.sellingPrice;
                    return (
                      <tbody key={index}>
                        <tr>
                          <td>
                            <Link href={`/left-sidebar/product/` + item.id}>
                              <a>
                                <Media
                                  src={
                                    item.product.productImages != ""
                                      ? item.product.productImages[0].imageUrl
                                      : item.product.productImages[0].imageUrl
                                  }
                                  alt=""
                                />
                              </a>
                            </Link>
                          </td>
                          <td>
                            <Link href={`/left-sidebar/product/` + item.id}>
                              <a>{item.product.productName}</a>
                            </Link>
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
                              <div className="col-xs-3">
                                <h2 className="td-color">
                                  €
                                  {item.price -
                                    (item.price * item.discount) / 100}
                                </h2>
                              </div>
                              <div className="col-xs-3">
                                <h2 className="td-color">
                                  <a href="#" className="icon">
                                    <i
                                      className="fa fa-times"
                                      onClick={() => removeFromCart(item)}
                                    ></i>
                                  </a>
                                </h2>
                              </div>
                            </div>
                          </td>
                          <td>
                            <h2>€{item.product.sellingPrice}</h2>
                          </td>
                          <td>
                            <div className="qty-box">
                              <div className="input-group">
                                <input
                                  type="number"
                                  name="quantity"
                                  onChange={(e) =>
                                    updateQty(item, e.target.value)
                                  }
                                  className="form-control input-number"
                                  defaultValue={item.qty}
                                  style={{
                                    borderColor: quantityError && "red",
                                  }}
                                />
                              </div>
                            </div>
                            {item.qty >= item.stock ? "out of Stock" : ""}
                          </td>
                          <td>
                            <i
                              className="fa fa-times"
                              onClick={() => deleteItem(item)}
                            ></i>
                          </td>
                          <td>
                            <h2 className="td-color">
                              €{item.qty * itemprice}
                            </h2>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
                <table className="table cart-table table-responsive-md">
                  <tfoot>
                    <tr>
                      <td>total price :</td>
                      <td>
                        <h2>€ {cartTotal}</h2>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </Col>
            </Row>
            <Row className="cart-buttons">
              <Col xs="6">
                <Link href={`/shop/left_sidebar`}>
                  <a className="btn btn-solid">continue shopping</a>
                </Link>
              </Col>
              <Col xs="6">
                <Link href={`/page/account/checkout`}>
                  <a className="btn btn-solid">check out</a>
                </Link>
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        <section className="cart-section section-b-space">
          <Container>
            <Row>
              <Col sm="12">
                <div>
                  <div className="col-sm-12 empty-cart-cls text-center">
                    <Media
                      src={cart}
                      className="img-fluid mb-4 mx-auto"
                      alt=""
                    />
                    <h3>
                      <strong>Your Cart is Empty</strong>
                    </h3>
                    <h4>Explore more shortlist some items.</h4>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </div>
  );
};

export default CartPage;
