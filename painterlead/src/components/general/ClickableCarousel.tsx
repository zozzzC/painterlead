import Image from "next/image";
import { useRef, useState } from "react";
import { StaticImageData } from "next/image";
import { CircleArrowLeft02Icon, CircleArrowRight02Icon } from "hugeicons-react";
import CommissionModal from "./CommissionModal";
import useModal from "@/hooks/useModal";
import React from "react";

type images = {
  name: string;
  src: StaticImageData;
};

export default function Carousel({
  id,
  images,
}: {
  id: Number;
  images: images[];
}) {
  const [index, setIndex] = useState<number>(0);
  const modalRef = useRef<React.JSX.Element>();
  const [active, toggleActive] = useModal(modalRef);

  function nextImage() {
    if (index > images.length - 2) {
      setIndex(0);
    } else {
      setIndex(() => index + 1);
    }
  }

  function previousImage() {
    if (index === 0) {
      setIndex(images.length - 1);
    } else {
      setIndex(() => index - 1);
    }
  }

  return (
    <div>
      {active ? (
        <CommissionModal id={id} toggleActive={toggleActive} />
      ) : undefined}
      <Image
        className={"rounded-md"}
        draggable={false}
        src={images[index].src}
        alt="image"
        fill={true}
        onClick={toggleActive}
        style={{ objectFit: "cover" }}
      />
      <button onClick={previousImage} className="absolute top-1/2 ml-2">
        <CircleArrowLeft02Icon />
      </button>
      <button onClick={nextImage} className="absolute top-1/2 right-0 mr-2">
        <CircleArrowRight02Icon />
      </button>
    </div>
  );
}
