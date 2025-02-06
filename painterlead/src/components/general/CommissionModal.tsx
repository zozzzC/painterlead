import Image from "next/image";
import Carousel from "./ClickableCarousel";
import kaveh from "@/test/kaveh.jpg";
import { CancelCircleIcon } from "hugeicons-react";
import { useAuth0 } from "@auth0/auth0-react";
import SmallSortButton from "./smallSortButton";
import React, { useRef, useState } from "react";
import getPresignedUrl from "@/functions/getPresignedUrl";

export default function CommissionModal({
  id,
  toggleActive,
}: {
  id: Number;
  toggleActive: () => void;
}) {
  const [editImage, setEditImage] = useState<boolean>(false);
  const inputFile = useRef<HTMLInputElement | null>(null);
  const { getAccessTokenSilently } = useAuth0();

  async function handleFileChange() {
    console.log("handle file changed");
    const token = await getAccessTokenSilently();
    if (inputFile.current?.files) {
      console.log("file found");
      const file = inputFile.current.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = async (e) => {
        const s3 = await getPresignedUrl({
          accessToken: token,
          fileType: file.type.toString().split("/")[1],
          fileSize: file.size.toString(),
        });

        if (s3) {
          console.log(s3);
          try {
            const res = await fetch(s3, {
              method: "PUT",
              headers: {
                "Content-Type": file.type.toString(),
              },
              body: file,
            });
            console.log(res + "done");
          } catch (err: any) {
            console.log(err);
          }
        }
        console.log("Cannot find s3");
      };
    }
  }

  return (
    <div className="z-10 fixed left-0 top-0 flex box-border items-center justify-center h-full w-full bg-lightest-grey bg-opacity-50">
      <input
        type="file"
        ref={inputFile}
        style={{ display: "none" }}
        accept=".png,.jpeg"
        onChange={handleFileChange}
      ></input>
      <div className="relative outline-lightest-grey outline outline-4 rounded-md h-5/6 w-5/6 bg-dark-grey">
        <div className="z-20 absolute right-0 m-5">
          <button onClick={toggleActive}>
            <CancelCircleIcon size={30} />
          </button>
        </div>
        <div className="grid grid-cols-2 place-items-center h-full">
          <div className="px-3">
            {/* this should be replaced with a carousel later on. */}
            <Image src={kaveh} alt="image" />
            <SmallSortButton
              name="edit"
              color="black"
              onClick={() => {
                setEditImage(false);
                if (inputFile.current !== null) {
                  inputFile.current.click();
                }
              }}
            ></SmallSortButton>
          </div>
          <div className="h-full w-full py-10">
            <p className="text-5xl">title {JSON.stringify(id)}</p>
            <div>
              <p className="text-2xl">open</p>
            </div>
            <p className="text-lg">desc</p>
            <p className="text-2xl">features</p>
            <p>test</p>
            <p className="text-2xl">add-ons</p>
            <p>test</p>
            <button>create request</button>
          </div>
        </div>
      </div>
    </div>
  );
}
