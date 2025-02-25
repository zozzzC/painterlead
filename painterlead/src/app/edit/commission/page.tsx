"use client";
import SortableGrid from "@/components/edit/SortableGrid";
import Profile from "@/components/userpage/Profile";
import kaveh from "@/test/kaveh.jpg";
import alhaitham from "@/test/alhaitham.jpg";
import eula from "@/test/eula.png";
import kokomi from "@/test/kokomi.png";
import { commissionImages } from "@/types/commissionImages";
import { Key, useState } from "react";
import Grid from "@/components/edit/Grid";
import CommissionCard from "@/components/edit/CommissionCard";
import CommissionAddCard from "@/components/edit/CommissionAddCard";
import TagBar from "@/components/edit/mainTag/tagBar";

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

const testCommissionData = [
  {
    id: "1",
    name: "com 1",
  },
  {
    id: "2",
    name: "com 2",
  },
  {
    id: "3",
    name: "com 3",
  },
];

export default function Commission() {
  const [items, setItems] = useState(testCommissionData); // must be state since the order of the elements changes using setItems

  return (
    <div className="ml-sidebar">
      <Profile />
      <TagBar />
      <SortableGrid items={items} setItems={setItems}>
        <Grid cols={4}>
          {items.map((t) => (
            <CommissionCard
              key={t.id}
              id={t.id}
              name={t.name}
              commissionImages={testCommissionImageData}
              //NOT STATE because these images are independent from the other images in the commissions
            />
          ))}
          <CommissionAddCard />
        </Grid>
      </SortableGrid>
    </div>
  );
}
