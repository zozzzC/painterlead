"use client";

import CommissionCard from "@/components/edit/CommissionCard";
import Grid from "@/components/edit/Grid";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  arraySwap,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import kaveh from "@/test/kaveh.jpg"
import alhaitham from "@/test/alhaitham.jpg"
import eula from "@/test/eula.png"
import kokomi from "@/test/kokomi.png"

const testCommissionData = [
  {
    id: 1,
    name: "1",
    image: kaveh
  },
  {
    id: 2,
    name: "2",
    image: alhaitham
  },
  {
    id: 3,
    name: "3",
    image: kokomi
  },
  {
    id: 4,
    name: "4",
    image: eula
  },
];

export default function SortableGrid() {
  //get the last index of testCommissionData
  const [commissions, setCommissions] = useState(testCommissionData);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 100,
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 10,
      },
    }),
  );
  const dragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    // @ts-ignore
    if (active.id === over.id) {
      return;
    }
    setCommissions((commissions) => {
      const oldIndex = commissions?.findIndex((c) => c.id === active.id);
      const newIndex = commissions?.findIndex((c) => c.id === over.id);
      return arrayMove(commissions, oldIndex, newIndex);
    });
  };

  return (
    <div>
      <DndContext collisionDetection={closestCorners} onDragEnd={dragEnd}>
        <SortableContext
          items={commissions} //a sorted array of the unique identifiers associated with the elements that use the useSortable hook within it.
          strategy={rectSortingStrategy}
        >
          <Grid cols={4}>
            {commissions.map((t) => (
              <CommissionCard key={t.id} id={t.id} name={t.name} image={t.image}/> //must be state since the order of the elements changes using setCommission
            ))}
          </Grid>
        </SortableContext>
      </DndContext>
    </div>
  );
}
