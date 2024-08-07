import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { StaticImageData } from "next/image";
import Image from "next/image";

export default function CommissionCard({
  id,
  name,
  image,
  tags,
}: {
  id: number;
  name: string;
  image: StaticImageData;
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
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={`w-3/4 h-72 rounded-md outline outline-4 m-5`}
        style={style}
      >
        <Image
          className={"rounded-md"}
          src={image.src}
          alt="image"
          fill={true}
          style={{ objectFit: "cover" }}
        />
      </div>
    </>
  );
}
