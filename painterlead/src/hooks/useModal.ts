import { useEffect, useState } from "react";

export default function useModal(
  containerRef: React.Ref<HTMLDivElement>,
) {
  const [activeModal, setActiveModal] =
    useState<React.Ref<HTMLDivElement>>(containerRef);
  const [active, setActive] = useState<boolean>(false);

  function toggleActive() {
    setActive(() => !active);
  }

  return [toggleActive, active];
}
