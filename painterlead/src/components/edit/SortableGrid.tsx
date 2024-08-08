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
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  arraySwap,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import kaveh from "@/test/kaveh.jpg";
import alhaitham from "@/test/alhaitham.jpg";
import eula from "@/test/eula.png";
import kokomi from "@/test/kokomi.png";
import CommissionModal from "../general/CommissionModal";

const testCommissionData = [
  {
    id: 1,
    name: "1",
    src: kaveh,
  },
  {
    id: 2,
    name: "2",
    src: alhaitham,
  },
  {
    id: 3,
    name: "3",
    src: kokomi,
  },
  {
    id: 4,
    name: "4",
    src: eula,
  },
];

export default function SortableGrid() {
  //get the last index of testCommissionData
  const [commissions, setCommissions] = useState(testCommissionData);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedShowModalId, setSelectedShowModalId] = useState<Number>(0);

  function handleShowModal({ id }: { id: Number }) {
    setShowModal(() => !showModal);

    if (showModal) {
      console.log("showmodal " + showModal);
      setSelectedShowModalId(id);
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 100,
        distance: 10,
        tolerance: 100,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        distance: 10,
        tolerance: 100,
      },
    }),
  );
  const dragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    // @ts-ignore
    if (active.id === over.id) {
      return;
    }

    if (over) {
      setCommissions((commissions) => {
        const oldIndex = commissions?.findIndex((c) => c.id === active.id);
        const newIndex = commissions?.findIndex((c) => c.id === over.id);
        return arrayMove(commissions, oldIndex, newIndex);
      });
    }
  };

  return (
    <div>
      {showModal ? <CommissionModal id={selectedShowModalId} /> : undefined}
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
                name={t.name}
                images={testCommissionData}
                handleShowModal={handleShowModal}
              /> //must be state since the order of the elements changes using setCommission
            ))}
          </Grid>
        </SortableContext>
      </DndContext>
    </div>
  );
}
