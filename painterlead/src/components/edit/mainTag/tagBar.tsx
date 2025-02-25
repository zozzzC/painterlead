import BigSortButton from "@/components/general/bigSortButton";
import SmallSortButton from "@/components/general/smallSortButton";

export default function tagBar() {
  const testTagData = [
    {
      name: "test1",
    },
    {
      name: "test2",
    },
    {
      name: "test3",
    },
  ];

  return (
    <div className="flex w-full h-20 flex-row">
      {testTagData.map((i) => (
        <div className="min-w-10 p-10">
          <SmallSortButton color="">{i.name}</SmallSortButton>
        </div>
      ))}
    </div>
  );
}
