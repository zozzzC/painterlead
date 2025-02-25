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
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  arraySwap,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import React, { Key, useState } from "react";

/**
 * A generic way of sorting items.
 * @remarks This does not include a grid in itself. The grid used
 * @param children - The collection of sortable items. EG: If we are sorting commissions, a grid with an array of commission image components, ORDERED in the way they will be displayed.
 * @param items - The array of items that are uniquely identified as different components that are draggable and droppable. EG: it is the same array that is passed into the commission image components.
 * @param setItems - The set function for the items.
 */
export default function SortableGrid({
  children,
  items,
  setItems,
}: {
  children: React.ReactNode;
  items: any[];
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 500,
        distance: 20,
        tolerance: 100,
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

      setItems((items: any[]) => {
        const oldIndex = items.findIndex(
          (c: { id: UniqueIdentifier }) => c.id === active.id,
        );
        const newIndex = items.findIndex(
          (c: { id: UniqueIdentifier }) => c.id === over.id,
        );
        return arrayMove(items, oldIndex, newIndex);
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
            items={items} //a sorted array of the unique identifiers associated with the elements that use the useSortable hook within it.
            strategy={rectSortingStrategy}
          >
            {children}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
