import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { StaticImageData } from "next/image";
import Image from "next/image";
import Carousel from "../general/Carousel";
import { useState } from "react";

type images = {
  id: number;
  name: string;
  blurb?: string;
  desc?: string;
  src: StaticImageData;
};

export default function CommissionCard({
  id,
  name,
  images,
  tags,
  handleShowModal,
}: {
  id: number;
  name: string;
  images: images[];
  tags?: string;
  handleShowModal: ({ id }: { id: Number }) => any;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
    });

  const style: React.CSSProperties = {
    transition,
    transform: CSS.Transform.toString(transform),
    overflow: "hidden",
    position: "relative", //this has to be relative because by default, the image is absolute, and will fill the entire section of the page that is viewable since the page is relative
  };

  return (
    <div className="mx-5">
      <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
        <div className="h-72 rounded-md outline outline-4 relative overflow-hidden m-5">
          <Carousel id={id} images={images} handleShowModal={handleShowModal} />
        </div>
        <div className="m-5">
          <p className="font-bold text-xl">{name}</p>
          <p className="text-s text-justify">Lorem ipsum</p>
        </div>
      </div>
    </div>
  );
}
