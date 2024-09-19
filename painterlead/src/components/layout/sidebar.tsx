import React from "react";
import { Edit01Icon, UserIcon, ClipboardIcon } from "hugeicons-react";
import { useAuth0 } from "@auth0/auth0-react";

const Sidebar = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="flex flex-col outline justify-end h-full outline-light-grey outline-2 fixed">
      <div className="pb-10 flex-col flex">
        <button className="text-xl p-3 flex justify-center">
          <Edit01Icon />
        </button>
        <button className="text-xl p-3 flex justify-center">
          <ClipboardIcon />
        </button>
        <button
          className="text-xl p-3 flex justify-center"
          onClick={() => loginWithRedirect()}
        >
          <UserIcon />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
