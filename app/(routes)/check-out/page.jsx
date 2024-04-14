"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { ArrowBigRight } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "sonner";

function CheckOut() {
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const jwt = sessionStorage.getItem("jwt");
  const [cartInformation, setcartInformation] = useState([]);
  const router = useRouter();

  const [userOrderInfo, setUserOrderInfo] = useState({
    name: "",
    email: "",
    phone: "",
    zip: "",
    address: "",
  });

  const [totalAmount, setTotalAmount] = useState();

  useEffect(() => {
    if (!jwt) {
      router.push("/sign-in");
    }
    totalCart();
  }, []);

  useEffect(() => {
    let total = 0;
    cartInformation.forEach((element) => {
      total = total + Number(element.amount);
      setTotalValue(total);
    });
  }, [cartInformation]);

  const totalCart = async () => {
    await axios
      .get(
        `http://127.0.0.1:1337/api/user-carts?[populate][products][populate][media][populate][0]=url`
      )
      .then((response) => {
        // console.log(response.data.data);
        const cartInfo = response.data.data.map((info, index) => ({
          name: info.attributes.products?.data[0].attributes?.name,
          quantity: info.attributes.quantity,
          amount: info.attributes.amount,
          id: info.id,
          imageUrl:
            info.attributes.products?.data[0].attributes?.media.data[0]
              .attributes?.url,
          price: info.attributes.products?.data[0].attributes?.MRP,
          product: info.attributes.products?.data[0].id,
        }));
        // console.log(cartInfo);
        // console.log(response.data);
        setTotalCartItem(response?.data?.data.length);
        setcartInformation(cartInfo);
      })
      .catch((error) => {
        console.log("An error occurred:", error?.response);
      });
  };

  async function onApprove(data) {
    console.log(data);
    console.log(cartInformation);
    const payload = {
      data: {
        paymentId: "87",
        // paymentId: data.paymentId.toString(),
        totalOrderAmount: totalAmount,
        username: userOrderInfo.name,
        email: userOrderInfo.email,
        phone: userOrderInfo.phone,
        zip: userOrderInfo.zip,
        address: userOrderInfo.address,
        orderItemList: cartInformation,
        userId: user.id,
      },
    };
    console.log(payload);

    const deleteCart = async (id, jwt) => {
      await axios
        .delete(`http://127.0.0.1:1337/api/user-carts/${id}`)
        .then((response) => {
          console.log(response);
        });
    };

    await axios
      .post("http://127.0.0.1:1337/api/orders", payload)
      .then((response) => {
        console.log(response);
        toast.success("order placed successfully");

        cartInformation.forEach((element, index) => {
          deleteCart(element.id);
        });

        router.replace("/order-confirmation");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    setTotalAmount(totalValue + +(totalValue * 0.9).toFixed(2));
  }, [totalValue]);
  return (
    <div>
      <div className="p-3 px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h1 className="text-lg font-bold">Billing Details</h1>
          <div className="flex gap-5 p-2 flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
              <Input
                placeholder="Name"
                onChange={(e) =>
                  setUserOrderInfo((prev) => {
                    return {
                      ...prev,
                      name: e.target.value,
                    };
                  })
                }
              />
              <Input
                placeholder="Email"
                type="email"
                onChange={(e) =>
                  setUserOrderInfo((prev) => {
                    return {
                      ...prev,
                      email: e.target.value,
                    };
                  })
                }
              />
              <Input
                placeholder="Phone"
                onChange={(e) =>
                  setUserOrderInfo((prev) => {
                    return {
                      ...prev,
                      phone: e.target.value,
                    };
                  })
                }
              />
              <Input
                placeholder="Zip"
                onChange={(e) =>
                  setUserOrderInfo((prev) => {
                    return {
                      ...prev,
                      zip: e.target.value,
                    };
                  })
                }
              />
            </div>
            <div>
              <Input
                placeholder="Address"
                onChange={(e) =>
                  setUserOrderInfo((prev) => {
                    return {
                      ...prev,
                      address: e.target.value,
                    };
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className=" md:mx-10 border rounded-md">
          <div>
            <h2 className="bg-gray-200 p-3 font-bold text-center">
              Total Cart &nbsp;({totalCartItem})
            </h2>
            <div className="p-5 flex flex-col gap-5">
              <h2 className="font-bold flex justify-between">
                Subtotal:<span>${totalValue}</span>
              </h2>
              <hr></hr>
              <h2 className="font-bold flex justify-between">
                Delivery: <span>Free</span>
              </h2>
              <h2 className="font-bold flex justify-between">
                Tax(9%):<span>${(totalValue * 0.09).toFixed(2)}</span>
              </h2>
              <h2 className="font-bold flex justify-between">
                Total:{" "}
                <span>{totalValue + +(totalValue * 0.09).toFixed(2)}</span>
              </h2>
              <Button
                onClick={onApprove}
                className="bg-green-500 text-white w-full hover:bg-green-600"
              >
                Payment
                <ArrowBigRight />
              </Button>

              {/* 
              <PayPalButtons
                disabled={
                  !(
                    userOrderInfo.address &&
                    userOrderInfo.email &&
                    userOrderInfo.name &&
                    userOrderInfo.zip &&
                    userOrderInfo.phone
                  )
                }
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: 78,
                          currency_code: "USD",
                        },
                      },
                    ],
                  });
                }}
                onApprove={onApprove}
              />



               */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
