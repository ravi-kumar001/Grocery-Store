import React from "react";
import CategoryListForFilter from "../components/CategoryListForFilter";
import GetApi from "../../../utils/GetApi";
import ProductList from "../../../components/ProductsList";

const page = async ({ params }) => {
  const categoryList = await GetApi.getCategoryList();
  const filterList = await GetApi.getCategoryListForFilter(params.categoryName);
  return (
    <div>
      <h2 className="font-bold text-white bg-green-600 text-3xl p-5 text-center">
        {params.categoryName}
      </h2>
      <CategoryListForFilter
        categoryList={categoryList}
        selectedCategory={params.categoryName}
      />
      <div className="p-5 md:p-10">
        <ProductList productList={filterList} />
      </div>
    </div>
  );
};

export default page;
