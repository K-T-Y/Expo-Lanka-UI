import axios from "axios";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const findCategoryProducts = (categoryId) => {
    axios
      .get(
        ApiUrl + "/product/by-category/{categoryId}?categoryId=" + categoryId
      )
      .then((response) => {
        console.log(
          "RESPONSE_FINDALL_CATEGORY_PRODUCTS==>",
          response.data.data
        );
        localStorage.setItem(
          "Category_Item",
          JSON.stringify(response.data.data)
        );
        router.push("/page/products/physical/product-list");
      })
      .catch((error) => {
        console.log("RESPONSE_FINDALL_CATEGORY_PRODUCTS_ERROR==>", error);
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
          categoryList.map((item, index) => {
            return (
              <div
                className="col-xl-3 col-lg-4 col-6"
                key={index}
                onClick={() => {
                  findCategoryProducts(item.id);
                }}
              >
                <div className="product-box">
                  <div className="img-wrapper">
                    <div className="front">
                      <a
                        onClick={() => {
                          findCategoryProducts(item.id);
                        }}
                      >
                        <img
                          src={item.imageUrl}
                          className="img-fluid blur-up lazyload bg-img"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="back">
                      <a
                        onClick={() => {
                          findCategoryProducts(item.id);
                        }}
                      >
                        <img
                          src={item.imageUrl}
                          className="img-fluid blur-up lazyload bg-img"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="cart-info cart-wrap">
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#addtocart"
                        title="Add to cart"
                      >
                        <i className="ti-shopping-cart"></i>
                      </button>
                      <a title="Add to Wishlist">
                        <i className="ti-heart" aria-hidden="true"></i>
                      </a>
                      <a
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#quick-view"
                        title="Quick View"
                      >
                        <i className="ti-search" aria-hidden="true"></i>
                      </a>
                      <a href="compare.html" title="Compare">
                        <i className="ti-reload" aria-hidden="true"></i>
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
