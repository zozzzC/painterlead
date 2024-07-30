export default function BigSortButton({
  name,
  color,
  active,
}: {
  name: String;
  color: String;
  active?: boolean;
}) {
  let style =
    "py-1 px-3 rounded-lg outline outline-" +
    color +
    " outline-4 hover:bg-" +
    color +
    "";

  if (active) {
    style = style + " active:bg-" + color;
  }

  return (
    <>
      <button className={style}>{name}</button>
    </>
  );
}
