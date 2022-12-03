import axios from "axios";
import React, { useState, useContext } from "react";
import { Collapse } from "reactstrap";
import { ApiUrl } from "../../../config/api-config";
import FilterContext from "../../../helpers/filter/FilterContext";

const Category = (props) => {
  const context = useContext(FilterContext);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
  const setSelectedCategory = context.setSelectedCategory;
  const [url, setUrl] = useState();
  const { allProducts, setAllProducts } = props;
  const updateCategory = (category) => {
    setSelectedCategory(category);
  };
  const getAllProducts = (page, size) => {
    axios
      .post(ApiUrl + "/product/search?page=" + page + "&size=" + size, {})
      .then((response) => {
        console.log("GET_ALL_PRODUCT_RESPONSE", response);
        setAllProducts(response.data.data.content);
      })
      .catch((error) => {
        console.log("GET_ALL_PRODUCT_ERROR", error);
      });
  };
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
        setAllProducts(response.data.data);
      })
      .catch((error) => {
        console.log("RESPONSE_FINDALL_CATEGORY_PRODUCTS_ERROR==>", error);
      });
  };

  return (
    <>
      {console.log("Cat List=>", props.categoryList)}
      {props.categoryList && (
        <div className="collection-collapse-block open">
          <h3 className="collapse-block-title" onClick={toggleCategory}>
            Category
          </h3>
          <Collapse isOpen={isCategoryOpen}>
            <div className="collection-collapse-block-content">
              <div className="collection-brand-filter">
                <ul className="category-list">
                  <li>
                    <a href={null} onClick={() => getAllProducts(0, 10)}>
                      all products
                    </a>
                  </li>
                  {props.categoryList &&
                    props.categoryList.map((item) => {
                      return (
                        <li>
                          <a
                            href={null}
                            onClick={() => {
                              findCategoryProducts(item.id);
                            }}
                          >
                            {item.name}{" "}
                          </a>
                        </li>
                      );
                    })}

                  {/*<li>
                  <a href={null} onClick={() => updateCategory("electronics")}>
                    electronics
                  </a>
                </li>
                <li>
                  <a href={null} onClick={() => updateCategory("vegetables")}>
                    vegetables
                  </a>
                </li>
                <li>
                  <a href={null} onClick={() => updateCategory("furniture")}>
                    furniture
                  </a>
                </li>
                <li>
                  <a href={null} onClick={() => updateCategory("jewellery")}>
                    jewellery
                  </a>
                </li>
                <li>
                  <a href={null} onClick={() => updateCategory("beauty")}>
                    beauty
                  </a>
                </li>
                <li>
                  <a href={null} onClick={() => updateCategory("flower")}>
                    flower
                  </a>
                </li>
                <li>
                  <a href={null} onClick={() => updateCategory("tools")}>
                    tools
                  </a>
                </li>
                <li>
                  <a href={null} onClick={() => updateCategory("watch")}>
                    watch
                  </a>
                </li>
                <li>
                  <a href={null} onClick={() => updateCategory("metro")}>
                    metro
                  </a>
                </li>
                <li>
                  <a href={null} onClick={() => updateCategory("shoes")}>
                    shoes
                  </a>
                </li>
                <li>
                  <a href={null} onClick={() => updateCategory("bags")}>
                    bags
                  </a>
                </li>
                <li>
                  <a href={null} onClick={() => updateCategory("kids")}>
                    kids
                  </a>
                </li>
                <li>
                  <a href={null} onClick={() => updateCategory("pets")}>
                    PETS
                  </a>
                </li>
                <li>
                  <a href={null} onClick={() => updateCategory("goggles")}>
                    goggles
                  </a>
                </li>
                <li>
                  <a href={null} onClick={() => updateCategory("game")}>
                    game
                  </a>
                </li>
                <li>
                  <a href={null} onClick={() => updateCategory("gym")}>
                    gym
                  </a>
                </li>
                <li>
                  <a href={null} onClick={() => updateCategory("nursery")}>
                    nursery
                  </a>
                </li>
                <li>
                  <a href={null} onClick={() => updateCategory("videoslider")}>
                    videoslider
                  </a>
                </li>
                <li>
                  <a href={null} onClick={() => updateCategory("marketplace")}>
                    marketplace
                  </a>
                </li>
                <li>
                  <a href={null} onClick={() => updateCategory("marijuana")}>
                    marijuana
                  </a>
                </li> */}
                </ul>
              </div>
            </div>
          </Collapse>
        </div>
      )}
    </>
  );
};

export default Category;
