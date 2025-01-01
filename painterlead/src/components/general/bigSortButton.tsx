export default function BigSortButton({
  name,
  color,
  setActive,
}: {
  name: String;
  color: String;
  setActive: () => any; 
}) {
  let style =
    "py-1 px-3 rounded-lg outline outline-" +
    color +
    " outline-4 hover:bg-" +
    color +
    "";

  if (setActive) {
    style = style + " active:bg-" + color;
  }

  return (
    <>
    
    </>
  );
}
