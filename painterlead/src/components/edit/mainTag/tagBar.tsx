"use client";
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
import { createNewMainTag } from "@/api/mainTag";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";

export default function TagBar() {
  const queryClient = useQueryClient();
  const [newTag, setNewTag] = useState<boolean>(false);
  const [tags, setTags] = useState([
    {
      name: "test1",
    },
    {
      name: "test2",
    },
    {
      name: "example of something super super long",
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputText, setInputText] = useState<string>("");

  const getAccessToken = async () => {
    const { getAccessTokenSilently } = useAuth0();
    const token = await getAccessTokenSilently();
    return token;
  };

  const token = getAccessToken();

  function updateTags() {
    if (inputText.length != 0) {
      setTags(() => [...tags, { name: inputText }]);
    }
  }

  const { error, data, mutate } = useMutation({
    mutationFn: async () => createNewMainTag(inputText, await token),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  function showNewTag() {
    setNewTag(() => !newTag);
  }

  return (
    <div className="flex w-full items-center h-20 flex-row">
      {tags.map((i) => (
        <div className="min-w-2 m-2 px-5 items-center">
          <SmallSortButton color="">{i.name}</SmallSortButton>
        </div>
      ))}
      <div className="min-w-2 m-2 px-5 items-center flex bg-transparent">
        {newTag ? (
          <input
            type="text"
            className="outline py-1 px-3 rounded-xl outline-10 bg-transparent"
            ref={inputRef}
            onKeyUp={() =>
              setInputText(
                inputRef.current?.value ? inputRef.current?.value : "",
              )
            }
            onBlur={() => mutate()}
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
