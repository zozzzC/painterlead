import React from "react";

const Sidebar = () => {
    return ( 
        <div className="flex flex-col outline justify-end w-1/12 h-full outline-light-grey outline-4">
            <div className="pb-10 flex-col flex">
            <a className="text-xl p-3 text-center">home</a>
            <a className="text-xl p-3 text-center" >listings</a>
            <a className="text-xl p-3 text-center">board</a>
            </div>
        </div>
     );
}
 
export default Sidebar;