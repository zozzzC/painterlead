import React, { useEffect, useState } from "react";

export default function useModal(
  containerRef: React.MutableRefObject<React.JSX.Element | undefined>,
) {
  const [activeModal, setActiveModal] =
    useState<React.Ref<React.JSX.Element | undefined>>(containerRef);
  const [active, setActive] = useState<boolean>(false);

  function toggleActive(): void {
    setActive(() => !active);
    console.log("HELLO!");
  }
  const returnArray: [boolean, () => void] = [active, toggleActive];
  return returnArray;
}
