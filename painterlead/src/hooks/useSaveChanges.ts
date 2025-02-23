import React, { useEffect, useState } from "react";

export default function useSaveChanges() {
  const [change, setChange] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(false); 

  function toggleChange(): void {
    setChange(() => !change);
  }

  function toggleSave(): void {
    setSave(() => !save);
  }

  useEffect(() => {
    if (change == true && save == false) {
        
    }
  }, [setChange]);

  const returnArray: [boolean, () => void] = [change, toggleChange];

  return returnArray;
}
