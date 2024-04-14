"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";
function SignIn() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const jwt = sessionStorage.getItem("jwt");
  useEffect(() => {
    if (jwt) {
      router.push("/");
    }
  }, []);

  const onCreateAccount = () => {
    setLoading(true);
    axios
      .post("http://127.0.0.1:1337/api/auth/local", {
        identifier: email,
        password: password,
      })
      .then((response) => {
        const user = response.data.user;
        const jwt = response.data.jwt;
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("jwt", jwt);
        toast.success("Sign In Successfully");
        router.push("/");
        setLoading(false);
      })
      .catch((error) => {
        console.log("An error occurred:", error?.response);
        toast.error(error?.response?.data?.error?.message);
        setLoading(false);
      });
  };
  return (
    <div className="flex items-baseline justify-center p-8 my-5 md:my-12">
      <div className="border rounded-sm bg-gray-200 p-10">
        <div className="flex items-center justify-center">
          <Image
            src={"/logo.png"}
            alt="logo-image"
            height={100}
            width={100}
            priority={true}
          />
        </div>
        <h2 className="font-bold text-3xl text-center">Sign In Your Account</h2>
        <p className="text-lg text-gray-500 mt-2">
          Enter your email and password for sign in your Account
        </p>
        <div className="flex flex-col gap-5 p-3">
          <Input
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="Password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={() => onCreateAccount()}
            className="w-full bg-green-500 hover:bg-green-600"
            disabled={!(email && password)}
          >
            {loading ? <LoaderIcon className="animate-spin" /> : "Sign In"}
          </Button>
          <p className=" text-lg">
            Don't have an Account?{" "}
            <Link className="text-blue-500" href={"/sign-up"}>
              Click here to Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
