import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { StaticImageData } from "next/image";
import NextImage from "next/image";
// import Carousel from "../general/ClickableCarousel";
import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import { useState } from "react";
import { commissionImages } from "@/types/commissionImages";

type images = {
  id: string;
  name: string;
  blurb?: string;
  desc?: string;
  src: StaticImageData;
};

export default function CommissionCard({
  id,
  name,
  commissionImages,
  // mainTag,
  tags,
}: {
  id: string;
  name: string;
  commissionImages: commissionImages[];
  // mainTag: string,
  tags?: string;
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
    <div className="mx-5 z-10">
      <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
        <div className="h-72 flex rounded-md outline outline-4 relative overflow-hidden m-5">
          {/* <Carousel id={parseInt(id)} commissionImages={commissionImages} /> */}
          <Carousel
            dragFree
            draggable={false}
            withIndicators
            slideSize="100%"
            loop
            align="start"
            className="h-72 overflow-hidden flex"
            // height="100%"
            // className="flex-1"
          >
            {commissionImages.map((i) => (
              <Carousel.Slide key={parseInt(i.id)}>
                <Image
                  component={NextImage}
                  draggable={false}
                  src={i.src}
                  alt="image"
                  className="h-72"
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
        <div className="m-5">
          <p className="font-bold text-xl">{name}</p>
          <p className="text-s text-justify">Lorem ipsum</p>
        </div>
      </div>
    </div>
  );
}
