import axios from "axios";
import { useEffect, useState } from "react";
import { ApiUrl } from "../../../config/api-config";

const Category = () => {
  const [categoryList, setCategoryList] = useState("");

  const getAllCategories = () => {
    axios
      .post(ApiUrl + "/product/category/findAll", {})
      .then((response) => {
        console.log("GET_CATEGORY_LIST", response);
        setCategoryList(response.data.data);
      })
      .catch((error) => {
        console.log("GET_CATEGORY-ERROR", error);
      });
  };

  useEffect(() => {
    if (categoryList == "") {
      getAllCategories();
    }
  });

  return (
    <>
      <div className="row mx-0 margin-default">
        {categoryList &&
          categoryList.map((item) => {
            return (
              <div className="col-xl-3 col-lg-4 col-6">
                <div class="product-box">
                  <div class="img-wrapper">
                    <div class="front">
                      <a href="product-page(no-sidebar).html">
                        <img
                          src={item.imageUrl}
                          class="img-fluid blur-up lazyload bg-img"
                          alt=""
                        />
                      </a>
                    </div>
                    <div class="back">
                      <a href="product-page(no-sidebar).html">
                        <img
                          src={item.imageUrl}
                          class="img-fluid blur-up lazyload bg-img"
                          alt=""
                        />
                      </a>
                    </div>
                    <div class="cart-info cart-wrap">
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#addtocart"
                        title="Add to cart"
                      >
                        <i class="ti-shopping-cart"></i>
                      </button>
                      <a href="javascript:void(0)" title="Add to Wishlist">
                        <i class="ti-heart" aria-hidden="true"></i>
                      </a>
                      <a
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#quick-view"
                        title="Quick View"
                      >
                        <i class="ti-search" aria-hidden="true"></i>
                      </a>
                      <a href="compare.html" title="Compare">
                        <i class="ti-reload" aria-hidden="true"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <br></br>
      <br></br>
    </>
  );
};
export default Category;
