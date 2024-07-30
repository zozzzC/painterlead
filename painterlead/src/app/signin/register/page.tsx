"use client";

import BigSortButton from "@/components/general/BigSortButton";

//TODO: fix issue where passed in param for color does not change the actual color
export default function register() {
  return (
    <div className="flex justify-center h-full items-center">
      <div className="flex flex-col rounded-md outline outline-4 outline-light-grey w-72 h-96">
        <p className="text-center mt-5 text-2xl">register</p>
        <p className="mx-7 text-sm">username</p>
        <input className="mb-7 bg-transparent border-zinc-600 border-b-4 mx-7"></input>
        <p className="mx-7 text-sm">email</p>
        <input className="mb-7 bg-transparent border-zinc-600 border-b-4 mx-7"></input>
        <p className="mx-7 text-sm">password</p>
        <input className="mb-7 bg-transparent border-zinc-600 border-b-4 mx-7"></input>
      </div>
    </div>
  );
}
