import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function CommissionCard({
  id,
  name,
}: {
  id: number;
  name: string;
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
        className="w-3/4 h-72 rounded-md outline outline-4 outline-light-grey m-5"
        style={style}
      >
        <p className="text-xl text-lightest-grey">{name}</p>
      </div>
    </>
  );
}
