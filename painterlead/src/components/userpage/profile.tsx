import Image from "next/image";

export type userInfo = {
  username: String;
  pfpURL: String;
  status: String;
};

export default function profile(userInfo: userInfo) {
  const { username, pfpURL } = userInfo;

  return <div></div>;
}
