import axios from "axios";

const getCategory = () => axios
  .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories?populate=*`);
const getSliders = () => axios
  .get(`http://127.0.0.1:1337/api/sliders?populate=*`);
const getCategoryList = () => axios
  .get(`http://127.0.0.1:1337/api/categories?populate=*`).then(res => { return res.data.data }
  )
const productList = () => axios
  .get(`http://127.0.0.1:1337/api/products?populate=*`).then(res => { return res.data.data }
  )
const getCategoryListForFilter = (filterName) => axios
  .get(`http://127.0.0.1:1337/api/products?filters[categories][name][$eq]=${filterName}&populate=*`).then(res => { return res.data.data }
  )

export default { getCategory, getSliders, getCategoryList, productList ,getCategoryListForFilter};
