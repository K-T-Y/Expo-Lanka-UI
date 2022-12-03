import React from "react";
import { Col, Media } from "reactstrap";
import sideBanner from "../../../public/assets/images/side-banner.png";
import NewProduct from "./newProduct";
import Category from "./category";
import Brand from "./brand";
import Color from "./color";
import Size from "./size";
import Price from "./price";

const FilterPage = (props) => {
  return (
    <>
      <Col
        sm={props.sm}
        className="collection-filter"
        style={props.sidebarView ? { left: "0px" } : {}}
      >
        {/* <!-- side-bar colleps block stat --> */}
        <div className="collection-filter-block">
          {/* <!-- brand filter start --> */}
          <div
            className="collection-mobile-back"
            onClick={() => props.closeSidebar}
          >
            <span className="filter-back">
              <i className="fa fa-angle-left" aria-hidden="true"></i> back
            </span>
          </div>
          <Category
            categoryList={props.categoryList}
            allProducts={props.allProducts}
            setAllProducts={props.setAllProducts}
          />
          {/* <Brand />
          <Color />
          <Size />
          <Price /> */}
        </div>
        {/* 
        <NewProduct /> */}

        <div className="collection-sidebar-banner">
          <a href={null}>
            <Media
              src={sideBanner.src}
              className="img-fluid blur-up lazyload"
              alt=""
            />
          </a>
        </div>
      </Col>
    </>
  );
};

export default FilterPage;
