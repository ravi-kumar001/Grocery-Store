import React, { useState } from "react";
import Image from "next/image";
function Order({ information }) {
  return (
    <div className="flex flex-col px-5 md:px-10">
      <div className="grid grid-cols-2 gap-1 p-2 px-4 border rounded-sm mt-4 items-center">
        <div className="grid grid-cols-2 gap-2 p-2 px-4 items-center">
          <Image
            src={process.env.NEXT_PUBLIC_BASE_URL + information.url}
            height={50}
            width={50}
            alt={"icon"}
          />
          <div>
            <h2>{information.name}</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1 p-2 px-4 items-center">
          <h2>Quantity: {information.quantity}</h2>
          <h2>Price : {information.totalOrderAmount}</h2>
        </div>
      </div>
    </div>
  );
}

export default Order;
