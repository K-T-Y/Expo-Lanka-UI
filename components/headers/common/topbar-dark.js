import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import { firebase_app } from "../../../config/base";
import { useRouter } from "next/router";

const TopBarDark = ({ topClass, fluid }) => {
  const router = useRouter();
  const [User, setUser] = useState("");
  // const firebaseLogout = () => {
  //   firebase_app.auth().signOut();
  //   router.push("/page/account/login-auth");
  // };
  const LogoutAuth = () => {
    localStorage.setItem("User", "");
    window.location.reload();
  };
  useEffect(() => {
    if (localStorage.getItem("User") != "") {
      setUser(JSON.parse(localStorage.getItem("User")));
    }
    if (
      localStorage.getItem("User") != "" &&
      localStorage.getItem("ShoppingSession") == ""
    ) {
      if (localStorage.getItem("ShoppingSession") == "") {
        console.log(JSON.parse(localStorage.getItem("ShoppingSession")));
      }
    }
  });
  return (
    <div className={topClass}>
      <Container fluid={fluid}>
        <Row>
          <Col lg="6">
            <div className="header-contact">
              <ul>
                {/* <li>Welcome to Our store Multikart</li> */}
                <li>
                  <i className="fa fa-phone text-white" aria-hidden="true"></i>
                  Call Us: +039 320 634 3988
                </li>
              </ul>
            </div>
          </Col>
          <Col lg="6" className="text-end">
            <ul className="header-dropdown">
              {/* <li className="mobile-wishlist">
                <Link href="/page/account/wishlist">
                  <a>
                    <i className="fa fa-heart" aria-hidden="true"></i> wishlist
                  </a>
                </Link>
              </li> */}
              <li className="onhover-dropdown mobile-account">
                <i className="fa fa-user" aria-hidden="true"></i>
                {localStorage.getItem("User") != ""
                  ? User.firstName + " " + User.lastName
                  : "My Account"}
                <ul className="onhover-show-div">
                  {localStorage.getItem("User") && (
                    <li>
                      <Link href={`/page/account/profile`}>
                        <a>Profile</a>
                      </Link>
                    </li>
                  )}
                  {localStorage.getItem("User") ? (
                    ""
                  ) : (
                    <>
                      <li>
                        <Link href={`/page/account/login`}>
                          <a>Login</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/page/account/register`}>
                          <a>Register</a>
                        </Link>
                      </li>
                    </>
                  )}
                  {localStorage.getItem("User") && (
                    <li onClick={() => LogoutAuth()}>
                      <a>Logout</a>
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBarDark;
