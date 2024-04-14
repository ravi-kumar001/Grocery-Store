"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import {
  CircleUserIcon,
  LayoutGrid,
  Search,
  ShoppingBag,
  UserRoundSearchIcon,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { ShoppingBasket } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import GetApi from "../utils/GetApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UpdateCartContext } from "../layout";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import CartItemList from "./CartItemList";

const Header = () => {
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartInformation, setcartInformation] = useState([]);
  const router = useRouter();
  const [categoryListIcon, setCategoryListIcon] = useState([]);
  useEffect(() => {
    getCategoryList();
  }, []);
  const getCategoryList = () => {
    GetApi.getCategory()
      .then((res) => {
        const response = res.data.data;
        setCategoryListIcon(response);
      })
      .catch((err) => {
        console.log("The error is :", err);
      });
  };
  const isLogging = sessionStorage.getItem("jwt") ? true : false;

  const onLogout = () => {
    sessionStorage.clear();
    toast.success("Log Out Successfully");
    router.push("/");
  };

  const user = JSON.parse(sessionStorage.getItem("user"));
  const jwt = sessionStorage.getItem("jwt");
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  useEffect(() => {
    if (!jwt) {
      return;
    }
    totalCart();
  }, [updateCart]);
  const totalCart = async () => {
    await axios
      .get(
        `http://127.0.0.1:1337/api/user-carts?[populate][products][populate][media][populate][0]=url`
      )
      .then((response) => {
        // console.log(response.data.data);
        const cartInfo = response.data.data.map((info, index) => ({
          name: info.attributes.products?.data[0].attributes?.name,
          quntity: info.attributes.quantity,
          amount: info.attributes.amount,
          id: info.id,
          imageUrl:
            info.attributes.products?.data[0].attributes?.media.data[0]
              .attributes?.url,
          actualPrice: info.attributes.products?.data[0].attributes?.MRP,
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

  const deleteCart = async (id, jwt) => {
    await axios
      .delete(`http://127.0.0.1:1337/api/user-carts/${id}`)
      .then((response) => {
        toast.success("item removed");
        totalCart();
      });
  };

  return (
    <div className="flex p-3 items-center justify-between shadow-sm">
      <div className="flex gap-8 items-center">
        <Link href={"/"}>
          <Image src={"/logo.png"} alt="logo" width={75} height={50} />{" "}
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <h2 className="hidden md:flex gap-2 items-center border rounded-full bg-slate-200 px-5 p-2 cursor-pointer">
              <LayoutGrid className="h-5 w-5" />
              Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryListIcon.map((category, index) => (
              <Link
                key={index}
                href={"/products-category/" + category.attributes.name}
              >
                <DropdownMenuItem
                  className={"flex gap-4 items-center cursor-pointer"}
                >
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_BASE_URL +
                      category.attributes?.icon.data[0]?.attributes?.url
                    }
                    height={29}
                    width={29}
                    alt="category-logo"
                    unoptimized={true}
                  />
                  <h2 className="text-sm">{category.attributes?.name}</h2>
                </DropdownMenuItem>{" "}
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="hidden md:flex gap-2 border p-2 rounded-full">
          <Search />
          <input type="text" placeholder="search" className="outline-none" />
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Sheet>
          <SheetTrigger>
            <h2 className="text-lg flex items-center gap-1 mr-2">
              <ShoppingBasket className="h-7 w-7" />
              <span className="bg-green-600 text-white px-2 rounded-full">
                {totalCartItem}
              </span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-green-500 p-3 font-bold text-lg text-center rounded-md text-white">
                My Cart
              </SheetTitle>
              <SheetDescription>
                <CartItemList
                  cartList={cartInformation}
                  deleteCart={deleteCart}
                />
                <SheetClose></SheetClose>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        {isLogging == false ? (
          <Link href={"/sign-in"}>
            <Button className="bg-green-600 m-2">Login</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserIcon className="cursor-pointer bg-green-100 rounded-full h-12 w-12 p-2 text-green-500 " />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="cursor-pointer">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>

              <Link href={"/my-order"}>
                <DropdownMenuItem className="cursor-pointer">
                  My Orders
                </DropdownMenuItem>{" "}
              </Link>
              <DropdownMenuItem
                onClick={() => onLogout()}
                className="cursor-pointer"
              >
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;
