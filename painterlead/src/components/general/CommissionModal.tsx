import Image from "next/image";
import Carousel from "./Carousel";
import kaveh from "@/test/kaveh.jpg";

export default function CommissionModal({ id }: { id: Number }) {
  return (
    <div className="z-10 fixed flex justify-center items-center h-full w-full">
      <div className="outline-lightest-grey outline outline-4 rounded-md w-5/6 h-5/6 bg-dark-grey">
        <div className="grid grid-cols-2 place-items-center h-full">
          <div className="px-5">
            <Image src={kaveh} />
          </div>
          <div className="h-full w-full py-10">
            <p className="text-5xl">title</p>
            <p>test</p>
          </div>
        </div>
      </div>
    </div>
  );
}
