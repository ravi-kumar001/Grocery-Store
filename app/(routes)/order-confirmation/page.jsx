import React from "react";
import { CircleCheck } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
function OrderConfirmation(props) {
  return (
    <div className="flex justify-center my-20">
      <div className="border shadow-md rounded-md flex flex-col items-center gap-3 px-32 p-10">
        <CircleCheck className="text-green-600 h-24 w-24" />
        <h2 className="font-medium text-3xl text-green-600">
          Order Placed Successfully
        </h2>
        <h2>Thank you for shopping</h2>
        <Link href={"/my-order"}>
          <Button className="mt-4 bg-green-600 text-white hover:bg-green-700">
            Track Your Order
          </Button>{" "}
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;
