import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import { ApiUrl } from "../../../config/api-config";

const closeSearch = () => {
  document.getElementById("search-overlay").style.display = "none";
};

const SearchOverlay = () => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const searchProduct = (page, size) => {
    const model = {
      productName: keyword,
    };
    axios
      .post(ApiUrl + "/product/search?page=" + page + "&size=" + size, model)
      .then((response) => {
        console.log("SEARCH_RESPONSE==>", response);
        localStorage.setItem(
          "Search",
          JSON.stringify(response.data.data.content)
        );
        console.log("Path", router.asPath);

        if (router.asPath == "/page/products/physical/product-list") {
          window.location.reload();
        } else {
          router.push("/page/products/physical/product-list");
        }
      })
      .catch((error) => {
        console.log("SEARCH_ERROR", error);
      });
  };

  return (
    <div id="search-overlay" className="search-overlay">
      <div>
        <span className="closebtn" onClick={closeSearch} title="Close Overlay">
          ×
        </span>
        <div className="overlay-content">
          <Container>
            <Row>
              <Col xl="12">
                <Form>
                  <FormGroup>
                    <Input
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Search a Product"
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </FormGroup>
                  <Button
                    onClick={() => {
                      searchProduct(0, 10);
                    }}
                    className="btn btn-primary"
                  >
                    <i className="fa fa-search"></i>
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
