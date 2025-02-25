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
  const [items, setItems] = useState<commissionImages[]>(
    testCommissionImageData,
  ); // must be state since the order of the elements changes using setItems

  return (
    <div className="ml-sidebar">
      <Profile />
      <SortableGrid items={items} setItems={setItems}>
        <Grid cols={4}>
          {items.map((t) => (
            <CommissionCard
              key={t.id}
              id={t.id}
              name={t.id}
              commissionImages={testCommissionImageData} //NOT STATE because these images are independant from the other images in the commissions
            />
          ))}
          <CommissionAddCard />
        </Grid>
      </SortableGrid>
    </div>
  );
}
