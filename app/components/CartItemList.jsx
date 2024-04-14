import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Trash } from "lucide-react";
import { Button } from "../../components/ui/button";
import { SheetClose } from "../../components/ui/sheet";
import { redirect, useRouter } from "next/navigation";

function CartItemList({ cartList, deleteCart }) {
  const router = useRouter();
  const [totalValue, setTotalValue] = useState(0);
  useEffect(() => {
    let total = 0;
    cartList.forEach((element) => {
      total = total + Number(element.amount);
    });
    setTotalValue(total);
  }, [cartList]);

  const jwt = sessionStorage.getItem("jwt");

  return (
    <div className="h-[500px] overflow-auto">
      <div>
        {cartList.map((cart, index) => (
          <div key={index} className="flex justify-between p-2 mb-5">
            <div className="flex gap-6 items-center">
              <Image
                src={process.env.NEXT_PUBLIC_BASE_URL + cart.imageUrl}
                height={70}
                width={70}
                alt={cart.name}
                unoptimized={true}
                className="p-2 border rounded-sm"
              />
              <div>
                <h2 className=" text-lg font-bold">{cart.name}</h2>
                <h2>Quantity {cart.quntity}</h2>
                <h2 className="text-lg font-bold">${cart.amount}</h2>
              </div>
            </div>
            <Trash
              className="mt-5 cursor-pointer"
              onClick={() => deleteCart(cart.id)}
            />
          </div>
        ))}
      </div>
      <div className="absolute w-[90%] bottom-6 flex flex-col gap-4">
        <h2 className="text-lg font-bold flex justify-between px-5">
          Total <span>${totalValue}</span>
        </h2>
        <SheetClose>
          <Button
            className="bg-green-500 text-white w-full hover:bg-green-600"
            onClick={() =>
              router.push(jwt ? "/check-out" : "/sign-in", { shallow: true })
            }
          >
            Order Now
          </Button>
        </SheetClose>
      </div>
    </div>
  );
}

export default CartItemList;
