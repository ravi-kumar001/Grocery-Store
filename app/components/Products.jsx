import React, { useContext } from "react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import AddToCart from "./AddToCart";


function Products({ productList }) {
  return (
    <div className="flex flex-col items-center group p-5 rounded-lg cursor-pointer border hover:shadow-xl transition-all ease-in-out">
      <Image
        src={
          process.env.NEXT_PUBLIC_BASE_URL +
          productList.attributes?.media.data[0]?.attributes?.url
        }
        height={200}
        width={200}
        alt={productList.attributes.name}
        unoptimized={true}
        className="group-hover:scale-110 transition-all ease-in-out object-contain h-[200px] w-[200px]"
      />
      {
        <h2 className="text-green-800 font-bold text-lg">
          {productList.attributes.name}
        </h2>
      }

      <div className="flex gap-3">
        {productList.attributes.sellingPrice && (
          <h2 className="text-green-800 font-bold text-lg">
            ${productList.attributes.sellingPrice}
          </h2>
        )}

        {
          <h2
            className={`text-green-800 font-bold text-lg ${
              productList.attributes.sellingPrice &&
              "line-through text-gray-500"
            } `}
          >
            ${productList.attributes.MRP}
          </h2>
        }
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={
              "text-green-600 font-bold hover:text-white hover:bg-green-400 mt-1"
            }
          >
            Add to Cart
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <AddToCart productList={productList} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Products;
