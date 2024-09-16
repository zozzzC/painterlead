import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  const { user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated &&
    user?.picture && (
      <div className="p-5 flex flex-row items-center gap-5">
        <div className="relative w-28 h-28">
          <Image
            fill={true}
            src={user?.picture}
            alt="your profile picture"
            className="object-cover rounded-full"
          />
        </div>
        <p className="text-2xl">{user?.nickname}</p>
      </div>
    )
  );
}
