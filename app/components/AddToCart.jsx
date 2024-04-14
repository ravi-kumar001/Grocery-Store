"use client";
import React, { lazy, useContext, useState } from "react";
import Image from "next/image";
import { Button } from "../../components/ui/button";

import { LoaderIcon, ShoppingBasket } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UpdateCartContext } from "../layout";

function AddToCart({ productList }) {
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(
    productList.attributes.sellingPrice
      ? productList.attributes.sellingPrice
      : productList.attributes.MRP
  );
  const [Quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [Weight, SetWeight] = useState(productList.attributes.ItemQuntityType);
  const jwt = sessionStorage.getItem("jwt");
  if (!jwt) {
    router.push("/sign-in");
    return;
  }
  const addToCart = async () => {
    setLoading(true);
    await axios
      .post(
        "http://127.0.0.1:1337/api/user-carts",
        {
          data: {
            quantity: Quantity,
            amount: Quantity * totalPrice,
            products: productList?.id,
            users_permissions_user: JSON.parse(sessionStorage.getItem("user"))
              .id,
            userId: JSON.parse(sessionStorage.getItem("user")).id,
          },
        },
        {
          headers: {
            Authorization: "Bearer " + jwt,
          },
        }
      )
      .then((response) => {
        console.log(response);
        toast.success("Added to Cart");
        setUpdateCart(!updateCart);
        setLoading(false);
      })
      .catch((error) => {
        console.log("An error occurred:", error?.response);
        toast.error(error?.response?.data?.error?.message);
        setLoading(false);
      });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black items-center">
      <Image
        src={
          process.env.NEXT_PUBLIC_BASE_URL +
          productList.attributes?.media.data[0]?.attributes?.url
        }
        height={200}
        width={200}
        alt={productList.attributes.name}
        unoptimized={true}
        className="p-5 bg-slate-200 rounded-lg h-[300px] w-[300px] object-contain"
      />
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-2xl">{productList.attributes.name}</h2>

        <h2 className="text-sm text-gray-500">
          {productList.attributes.description}
        </h2>

        <div className="flex gap-3">
          {productList.attributes.sellingPrice && (
            <h2 className="text-green-800 font-bold text-3xl">
              ${productList.attributes.sellingPrice}
            </h2>
          )}

          {
            <h2
              className={`text-green-800 font-bold text-3xl ${
                productList.attributes.sellingPrice &&
                "line-through text-gray-500"
              } `}
            >
              ${productList.attributes.MRP}
            </h2>
          }
        </div>
        <h2 className="font-medium text-lg">Quantity ({Weight})</h2>
        <div className="flex flex-col items-baseline gap-3">
          <div className="flex gap-2">
            <div className="p-2 border flex gap-10 items-center px-8">
              <button
                disabled={Quantity == 1}
                onClick={() => setQuantity(Quantity - 1)}
                className="font-bold text-2xl"
              >
                -
              </button>
              <p className="font-bold text-xl">{Quantity}</p>
              <button
                onClick={() => setQuantity(Quantity + 1)}
                className="font-bold text-2xl"
              >
                +
              </button>
            </div>
            <h2 className="text-green-800 font-bold text-3xl">
              =${(Quantity * totalPrice).toFixed(2)}
            </h2>
          </div>

          <div>
            <Button
              onClick={() => addToCart()}
              className="flex gap-3 bg-green-500 text-white hover:bg-green-600"
              disabled={loading}
            >
              <ShoppingBasket />
              {loading ? (
                <LoaderIcon className="animate-spin" />
              ) : (
                "Add to Cart"
              )}
            </Button>
          </div>
          <h2>
            <span>
              Category :{" "}
              {productList?.attributes?.categories?.data[0]?.attributes?.name}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;
