import React from "react";
import { Edit01Icon, UserIcon, ClipboardIcon } from "hugeicons-react";


const Sidebar = () => {
    return ( 
        <div className="flex flex-col outline justify-end h-full outline-light-grey outline-4">
            <div className="pb-10 flex-col flex">
            <button className="text-xl p-3 flex justify-center"><Edit01Icon/></button>
            <button className="text-xl p-3 flex justify-center" ><ClipboardIcon/></button>
            <button className="text-xl p-3 flex justify-center" ><UserIcon/></button>
            </div>
        </div>
     );
}
 
export default Sidebar;