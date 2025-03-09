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
import { createNewMainTag, getMainTag } from "@/api/mainTag";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, UseQueryResult } from "react-query";
import { useQueryClient } from "react-query";
import { AxiosError } from "axios";

export default function TagBar() {
  const queryClient = useQueryClient();
  const [newTag, setNewTag] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputError, setInputError] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getAccessToken = async () => {
      const token = await getAccessTokenSilently();
      setToken(token);
    };
    getAccessToken();
  }, []);

  const { mutate } = useMutation({
    mutationFn: async () => createNewMainTag(inputText, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getMainTag"] });
    },
    onError: (error: AxiosError) => {
      setInputError(error.message);
    },
  });

  const getMainTagQ: UseQueryResult<any, unknown> = useQuery({
    queryKey: ["getMainTag"],
    queryFn: async () => getMainTag(token),
    enabled: !!token,
  });

  function showNewTag() {
    setNewTag(() => !newTag);
  }

  return (
    <div className="flex w-full items-center h-20 flex-row">
      {getMainTagQ.data?.map((i: any) => {
        return (
          <div className="min-w-2 m-2 px-5 items-center">
            <SmallSortButton color="">{i.name}</SmallSortButton>
          </div>
        );
      })}
      {token ? (
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
              required
            ></input>
          ) : (
            <button className="items-center" onClick={showNewTag}>
              <PlusSignCircleIcon size={30} />
            </button>
          )}
        </div>
      ) : undefined}
    </div>
  );
}
