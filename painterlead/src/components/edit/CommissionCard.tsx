import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function CommissionCard({
  id,
  name,
  addCard,
}: {
  id: number;
  name: string;
  addCard?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={`w-3/4 h-72 rounded-md outline outline-4 m-5 ${addCard ? "outline-text-white" : "outline-light-grey"}`}
        style={style}
      >
        <p className="text-xl text-lightest-grey">{name}</p>
      </div>
    </>
  );
}
