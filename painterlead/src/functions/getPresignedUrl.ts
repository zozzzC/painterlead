import axios from "axios";
import React from "react";
import kokomi from "@/test/kokomi.png";

export default async function getPresignedUrl({
  accessToken,
}: {
  accessToken: string;
}) {
  const fileType = kokomi.src.split(".").pop();

  if (fileType != "png" || fileType != "jpeg") {
    //then do not return an s3 url
  }

  const res = await fetch("http://localhost:4321/edit/image", {
    method: "GET",
    body: JSON.stringify({ fileType: fileType }),
    headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },

    //assuming fetch is successful, this will return s3 url.
  });
}
