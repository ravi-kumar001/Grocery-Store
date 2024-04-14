import React from "react";
import Image from "next/image";
import Link from "next/link";

function CategoryListForFilter({ categoryList, selectedCategory }) {
  return (
    <div>
      <div className="flex justify-center items-center gap-3 mx-5 md:mx-20 overflow-auto mt-4">
        {categoryList.map((category, index) => (
          <Link
            href={"/products-category/" + category.attributes.name}
            key={index}
            className={`flex flex-col items-center group p-2 bg-green-100 rounded-lg cursor-pointer hover:bg-green-300 w-[150px] min-w-[100px] ${
              category.attributes.name == selectedCategory &&
              "bg-green-600 group"
            }`}
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
            {
              <h2
                className={`text-green-800 ${
                  category.attributes.name == selectedCategory &&
                  "text-white group-hover:text-green-800"
                }`}
              >
                {category.attributes.name}
              </h2>
            }
          </Link>
        ))}
      </div>
    </div>
  );
}
export default CategoryListForFilter;
