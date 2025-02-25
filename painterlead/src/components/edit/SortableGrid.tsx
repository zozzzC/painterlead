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

import CommissionModal from "../general/CommissionModal";
import { commissionImages } from "@/types/commissionImages";

export default function SortableGrid({
  commissionImages,
}: {
  commissionImages: commissionImages[];
}) {
  //get the last index of testCommissionData -- must be state since the order of the elements changes using setCommission
  const [commissions, setCommissions] =
    useState<commissionImages[]>(commissionImages);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 100,
        distance: 10,
        tolerance: 20,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 500,
        distance: 20,
        tolerance: 100,
      },
    }),
  );
  const dragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      if (active.id === over.id) {
        return;
      }

      setCommissions((commissions) => {
        const oldIndex = commissions.findIndex((c) => c.id === active.id);
        const newIndex = commissions.findIndex((c) => c.id === over.id);
        return arrayMove(commissions, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="h-full w-full">
      <div className="z-0">
        <DndContext
          id="sortable-grid"
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={dragEnd}
        >
          <SortableContext
            items={commissions} //a sorted array of the unique identifiers associated with the elements that use the useSortable hook within it.
            strategy={rectSortingStrategy}
          >
            <Grid cols={4}>
              {commissions.map((t) => (
                <CommissionCard
                  key={t.id}
                  id={t.id}
                  name={t.id}
                  commissionImages={commissionImages} //must be state since the order of the elements changes using setCommission
                />
              ))}
            </Grid>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
