"use client";
import moment from "moment";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Order from "./components/Order";
import Image from "next/image";
function MyOrder() {
  const router = useRouter();
  const jwt = sessionStorage.getItem("jwt");

  useEffect(() => {
    if (!jwt) {
      router.push("/sign-in");
    }
  }, []);

  useEffect(() => {
    myOrderInfo();
  }, []);

  const [information, setInformation] = useState([]);

  const myOrderInfo = async () => {
    await axios
      .get(
        "http://localhost:1337/api/orders?filters[userId][$eq]=7&populate[orderItemList][populate][product][populate][media]=url"
      )
      .then((res) => {
        const response = res.data.data;
        const orderInformation = response.map((item, index) => ({
          id: item.id,
          totalOrderAmount: item.attributes.totalOrderAmount,
          paymentId: item.attributes.paymentId,
          quantity: item.attributes.orderItemList[0].quantity,
          createdAt: item.attributes.createdAt,
          status: item.attributes.status,
          url: item.attributes.orderItemList[0].product.data.attributes.media
            .data[0].attributes.url,
          name: item.attributes.orderItemList[0].product.data.attributes.name,
        }));

        setInformation(orderInformation);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <div>
      <h2 className="font-bold text-white bg-green-600 text-3xl p-5 text-center">
        My Order
      </h2>

      <div className="">
        <h2 className="font-bold text-lg m-4 ml-12">Order History</h2>
      </div>

      <div className="flex items-center gap-10 justify-center p-2 px-4 bg-gray-200">
        <h2 className="font-bold">
          Order Date : {moment().format(" Do MMM YY", information.createdAt)}
        </h2>
        <h2 className="font-bold">Total Amount : 23</h2>
        <h2 className="font-bold">Status : Pending</h2>
      </div>

      {information.map((info, index) => (
        <Order key={index} information={info} />
      ))}
    </div>
  );
}

export default MyOrder;
