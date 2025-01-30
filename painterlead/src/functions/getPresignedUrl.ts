import axios from "axios";
import React from "react";
import kokomi from "@/test/kokomi.png";

type presignedUrlResponse = {
  s3Url: string;
};

export default async function getPresignedUrl({
  accessToken,
  fileType,
  fileSize,
}: {
  accessToken: string;
  fileType: string;
  fileSize: string;
}): Promise<string | null> {
  // const fileType = kokomi.src.split(".").pop();

  //NOTE: this error occurs because the imported file is a png, so it will never be jpeg
  //however when uploading actual files, clearly it CAN be jpeg.
  if (fileType != "png" && fileType != "jpeg") {
    //then do not return an s3 url
    return null;
  }

  const res = await fetch(
    "http://localhost:4321/edit/image?" +
      new URLSearchParams({
        fileType: fileType,
        fileSize: fileSize,
      }).toString(),
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },

      //assuming fetch is successful, this will return s3 url.
    },
  );

  //TODO: fix the issue where the s3 url is not returning properly/is unaccessible

  return ((await res.json()) as presignedUrlResponse).s3Url;
}
