import Image from "next/image";
import Carousel from "./Carousel";
import kaveh from "@/test/kaveh.jpg";
import { CancelCircleIcon } from "hugeicons-react";

export default function CommissionModal({
  id,
  handleShowModal,
}: {
  id: Number;
  handleShowModal: ({ id }: { id: Number }) => any;
}) {
  return (
    <div className="z-10 fixed left-0 top-0 flex box-border border items-center justify-center h-full w-full bg-lightest-grey bg-opacity-50">
      <div className="relative outline-lightest-grey outline outline-4 rounded-md h-5/6 w-5/6 bg-dark-grey">
        <div className="z-20 absolute right-0 m-5">
          <button onClick={() => handleShowModal({ id })}>
            <CancelCircleIcon size={30} />
          </button>
        </div>
        <div className="grid grid-cols-2 place-items-center h-full">
          <div className="px-3">
            {/* this should be replaced with a carousel later on. */}
            <Image src={kaveh} alt="image" />
          </div>
          <div className="h-full w-full py-10">
            <p className="text-5xl">title</p>
            <div>
              <p className="text-2xl">open</p>
            </div>
            <p className="text-lg">desc</p>
            <p className="text-2xl">features</p>
            <p>test</p>
            <p className="text-2xl">add-ons</p>
            <p>test</p>
            <button>create request</button>
          </div>
        </div>
      </div>
    </div>
  );
}
