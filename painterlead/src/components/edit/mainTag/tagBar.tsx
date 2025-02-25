import BigSortButton from "@/components/general/bigSortButton";
import SmallSortButton from "@/components/general/smallSortButton";

export default function TagBar() {
  const testTagData = [
    {
      name: "test1",
    },
    {
      name: "test2",
    },
    {
      name: "example of something super super long",
    },
  ];

  return (
    <div className="flex w-full h-20 flex-row">
      {testTagData.map((i) => (
        <div className="min-w-2 px-5 py-3">
          <SmallSortButton color="">{i.name}</SmallSortButton>
        </div>
      ))}
    </div>
  );
}
