/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { FC } from "react";
import { Cat } from "../pages";

interface CatProps {
  data: Cat[];
}

const CatList: FC<CatProps> = ({ data }) => {
  return (
    <div className="columns-4">
      {data.map((cat: Cat) => (
        <div key={cat.id} className="mb-4 relative w-full group">
          <img src={cat.url} alt={cat.id} className="w-full block" />
          <div className="absolute top-0 left-0 w-full h-full hidden transition hover:bg-black/40 group-hover:block duration-200 ">
            <div className="flex justify-center items-center h-full">
              <Link
                href={`/${cat.id}`}
                className=" rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-sm font-medium text-white disabled:opacity-70 disabled:cursor-not-allowed hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CatList;
