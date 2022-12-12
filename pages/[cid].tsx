/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface Breed {
  id: string;
  name: string;
  origin: string;
  description: string;
  temperament: string;
}

interface Cat {
  id: string;
  url: string;
  breeds: Breed[];
}

export default function Cat({ cat }: { cat: Cat | null }) {
  if (cat === null) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <span className="text-2xl">Cat not exist</span>
        <Link
          href={"/"}
          className="mt-4 rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-sm font-medium text-white disabled:opacity-70 disabled:cursor-not-allowed hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        >
          Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className=" max-w-7xl mx-auto p-4 sm:px-6 md:px-8">
      <Link
        href={`/?breed=${cat.breeds[0].id}`}
        className="mb-4 inline-block rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-sm font-medium text-white disabled:opacity-70 disabled:cursor-not-allowed hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
      >
        Back
      </Link>
      <div>
        <img src={cat.url} alt={cat.id} className="w-full mb-4" />
        <div>
          <h1 className="text-5xl">{cat.breeds[0].name}</h1>
          <p className="text-2xl">Origin: {cat.breeds[0].origin}</p>
          <p className="text-2xl">{cat.breeds[0].temperament}</p>
          <p>{cat.breeds[0].description}</p>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { cid } = context.query;
  try {
    const res = await axios.get(`https://api.thecatapi.com/v1/images/${cid}`);
    return {
      props: { cat: res.data }, // will be passed to the page component as props
    };
  } catch (error) {}

  return {
    props: { cat: null }, // will be passed to the page component as props
  };
};
