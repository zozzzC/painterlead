import axios from "axios";
import kokomi from "@/test/kokomi.png";

export default async function getPresignedUrl({
  accessToken,
}: {
  accessToken: string;
}) {
  const fileType = kokomi.src.split(".").pop();

  await fetch("http://localhost:4321/edit/image", {
    method: "GET",
    body: JSON.stringify({ fileType: fileType }),
    headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
}
