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
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
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
];

const onDragEnd = (event: DragEndEvent) => {
  // const {active, over} = event;
  // if (active.id == over.id) {
  // }
};

export default function Commission() {
  const [commissions, setCommissions] = useState<Array<any> | null>(
    testCommissionData,
  );

  return (
    <div>
      <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
        <Grid cols={4}>
          <SortableContext
            items={testCommissionData}
            strategy={rectSortingStrategy}
          >
            {testCommissionData.map((t) => (
              <CommissionCard id={t.id} name={t.name} />
            ))}
          </SortableContext>
        </Grid>
      </DndContext>
    </div>
  );
}
