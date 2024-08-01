export default function Grid({
  cols,
  children,
}: {
  cols: number;
  children: React.ReactNode;
}) {
  return <div className="grid grid-cols-3"> {children} </div>;
}
