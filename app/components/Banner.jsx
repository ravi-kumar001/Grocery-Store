import Image from "next/image";
import React from "react";

function Banner(props) {
  return (
    <div>
      <Image
        src={"/banner.png"}
        alt="banner-img"
        width={10000}
        height={300}
        unoptimized={true}
        className="w-full  h-[400px] object-contain"
      />
    </div>
  );
}

export default Banner;
