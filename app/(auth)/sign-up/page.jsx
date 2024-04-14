"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";
function SignUp() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState();
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
      .post("http://127.0.0.1:1337/api/auth/local/register", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        const user = response.data.user;
        const jwt = response.data.jwt;
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("jwt", jwt);
        toast.success("Account Created Successfully");
        router.push("/");
        setLoading(false);
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
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
        <h2 className="font-bold text-3xl text-center">Create an Account</h2>
        <p className="text-lg text-gray-500 mt-2">
          Enter your name and email for create and Account
        </p>
        <div className="flex flex-col gap-5 p-3">
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
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
            disabled={!(username && email && password)}
          >
            {loading ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              "Create Account"
            )}
          </Button>
          <p className=" text-lg">
            Already have an Account?{" "}
            <Link className="text-blue-500" href={"/sign-in"}>
              Click here to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
