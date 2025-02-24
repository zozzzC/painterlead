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
    <div className="flex">
      {testTagData.map((i) => (
        <SmallSortButton color="">me</SmallSortButton>
      ))}
    </div>
  );
}
