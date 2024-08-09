import Image from "next/image";
import { useState } from "react";
import { StaticImageData } from "next/image";
import { CircleArrowLeft02Icon, CircleArrowRight02Icon } from "hugeicons-react";

type images = {
  name: string;
  src: StaticImageData;
};

export default function Carousel({
  id,
  images,
  handleShowModal,
}: {
  id: Number;
  images: images[];
  handleShowModal: ({ id }: { id: Number }) => any;
}) {
  const [index, setIndex] = useState<number>(0);

  function nextImage() {
    if (index > images.length - 2) {
      setIndex(0);
    } else {
      setIndex(() => index + 1);
    }
    console.log(index);
  }

  function previousImage() {
    if (index === 0) {
      setIndex(images.length - 1);
    } else {
      setIndex(() => index - 1);
    }
    console.log(index);
  }

  return (
    <div>
      <Image
        className={"rounded-md"}
        draggable={false}
        src={images[index].src}
        alt="image"
        fill={true}
        onClick={() => handleShowModal({ id })}
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
