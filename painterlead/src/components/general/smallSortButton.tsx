export default function SmallSortButton({
  color,
  onClick,
  children,
}: {
  color: String;
  onClick?: () => any;
  children: React.ReactNode;
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
        {children}
      </button>
    </>
  );
}
