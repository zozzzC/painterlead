interface GridProps {
  children: string;
}

export default function Grid({
  cols,
  children,
}: {
  cols: number;
  children: React.ReactNode;
}) {
  return <div className="grid grid-cols-3 gap-2"> {children} </div>;
}
