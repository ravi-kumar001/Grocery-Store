import React from "react";
import Image from "next/image";
import Link from "next/link";
function CategoryList({ categoryList }) {
  return (
    <div>
      <h2 className="text-green-700 mt-3 text-lg font-bold">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2  md:grid-cols-5 lg:grid-cols-7 gap-2 mt-2">
        {categoryList.map((category, index) => (
          <Link href={"/products-category/" + category?.attributes?.name}>
            <div
              key={index}
              className="flex flex-col items-center group p-2 bg-green-100 rounded-lg cursor-pointer hover:bg-green-300"
            >
              <Image
                src={
                  process.env.NEXT_PUBLIC_BASE_URL +
                  category.attributes?.icon.data[0]?.attributes?.url
                }
                height={50}
                width={50}
                alt="category-logo"
                unoptimized={true}
                className="group-hover:scale-125 transition-all ease-in-out"
              />
              {<h2 className="text-green-800">{category.attributes.name}</h2>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
