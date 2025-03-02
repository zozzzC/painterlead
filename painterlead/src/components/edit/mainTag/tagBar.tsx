import BigSortButton from "@/components/general/bigSortButton";
import SmallSortButton from "@/components/general/smallSortButton";
import CommissionAddCard from "../CommissionAddCard";
import { PlusSignCircleIcon } from "hugeicons-react";
import React, {
  useState,
  useRef,
  KeyboardEventHandler,
  MutableRefObject,
  useEffect,
} from "react";
import { createNewMainTag } from "@/app/api/mainTag";

export default function TagBar() {
  const [newTag, setNewTag] = useState<boolean>(false);

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

  function showNewTag() {
    setNewTag(() => !newTag);
  }

  return (
    <div className="flex w-full items-center h-20 flex-row">
      {testTagData.map((i) => (
        <div className="min-w-2 m-2 px-5 items-center">
          <SmallSortButton color="">{i.name}</SmallSortButton>
        </div>
      ))}
      <div className="min-w-2 m-2 px-5 items-center flex bg-transparent">
        {newTag ? (
          <input
            type="text"
            className="outline py-1 px-3 rounded-xl outline-10 bg-transparent"
            onBlur={createNewMainTag}
          ></input>
        ) : (
          <button className="items-center" onClick={showNewTag}>
            <PlusSignCircleIcon size={30} />
          </button>
        )}
      </div>
    </div>
  );
}
