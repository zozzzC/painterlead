import React, { useEffect, useState } from "react";

export default function useModal(
) {
  const [active, setActive] = useState<boolean>(false);

  function toggleActive(): void {
    setActive(() => !active);
  }
  
  const returnArray: [boolean, () => void] = [active, toggleActive];
  return returnArray;
}
