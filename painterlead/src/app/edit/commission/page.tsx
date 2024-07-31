"use client";

import CommissionCard from "@/components/edit/CommissionCard";
import Grid from "@/components/edit/Grid";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  useDndContext,
  useDraggable,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  arraySwap,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

const testCommissionData = [
  {
    id: 1,
    name: "1",
  },
  {
    id: 2,
    name: "2",
  },
  {
    id: 3,
    name: "3",
  },
  {
    id: 4,
    name: "4",
  },
];

export default function Commission() {
  const [commissions, setCommissions] = useState(testCommissionData);

  const dragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id === over.id) {
      return;
    }
    setCommissions((commissions) => {
      const oldIndex = commissions?.findIndex((c) => c.id === active.id);
      const newIndex = commissions?.findIndex((c) => c.id === over.id);
      return arrayMove(commissions, oldIndex, newIndex);
    });
  };

  console.log(commissions);

  return (
    <div>
      <DndContext collisionDetection={closestCorners} onDragEnd={dragEnd}>
        <SortableContext
          items={commissions} //a sorted array of the unique identifiers associated with the elements that use the useSortable hook within it.
          strategy={rectSortingStrategy}
        >
          <Grid cols={4}>
            {commissions.map((t) => (
              <CommissionCard key={t.id} id={t.id} name={t.name} /> //must be state since the order of the elements changes using setCommission 
            ))}
          </Grid>
        </SortableContext>
      </DndContext>
    </div>
  );
}
