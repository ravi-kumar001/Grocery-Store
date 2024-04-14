import GetApi from "./utils/GetApi";
import Slider from "./components/Slider";
import CategoryList from "./components/CategoryList";
import Products from "./components/ProductsList";
import Banner from "./components/Banner";
import Footer from "./components/Footer";

export default async function Home() {
  const getCategoryList = await GetApi.getCategoryList();
  const productList = await GetApi.productList();
  return (
    /* Sliders */
    <div className="p-5 md:p-8">
      {/* <Slider /> */}
      <CategoryList categoryList={getCategoryList} />

      {/* productList */}
      <Products productList={productList} />

      {/* Banner */}

      <Banner />

      {/* footer */}
      <Footer />
    </div>
  );
}
