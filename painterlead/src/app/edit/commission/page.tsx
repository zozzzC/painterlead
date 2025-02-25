"use client";
import SortableGrid from "@/components/edit/SortableGrid";
import Profile from "@/components/userpage/Profile";
import kaveh from "@/test/kaveh.jpg";
import alhaitham from "@/test/alhaitham.jpg";
import eula from "@/test/eula.png";
import kokomi from "@/test/kokomi.png";
import { commissionImages } from "@/types/commissionImages";

const testCommissionImageData: commissionImages[] = [
  {
    sort: 1,
    id: "1",
    src: kaveh,
  },
  {
    sort: 2,
    id: "2",
    src: alhaitham,
  },
  {
    sort: 3,
    id: "3",
    src: kokomi,
  },
  {
    sort: 4,
    id: "4",
    src: eula,
  },
];

export default function Commission() {
  return (
    <div className="ml-sidebar">
      <Profile />
      <SortableGrid commissionImages={testCommissionImageData}></SortableGrid>
    </div>
  );
}
