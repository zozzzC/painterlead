export default function SmallSortButton({
  name,
  color,
  onClick,
}: {
  name: String;
  color: String;
  onClick: () => any;
}) {
  var style =
    "py-1 px-3 rounded-xl outline outline-" +
    color +
    " outline-10 hover:" +
    color +
    "";

  // if (onClick) {
  //   style = style + " active:bg-" + color;
  // }

  return (
    <>
      <button className={style} onClick={onClick}>
        {name}
      </button>
    </>
  );
}
