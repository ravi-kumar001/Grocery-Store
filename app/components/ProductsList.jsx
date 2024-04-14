import React from "react";

import Products from "./Products";

function ProductList({ productList }) {
  return (
    <div>
      <h2 className="text-green-700 mt-3 text-lg font-bold">
        Our Fresh Products
      </h2>
      <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4">
        {productList.map(
          (category, index) =>
            index < 9 && <Products key={index} productList={category} />
        )}
      </div>
    </div>
  );
}

export default ProductList;
