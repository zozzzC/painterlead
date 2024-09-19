"use client";
import SortableGrid from "@/components/edit/SortableGrid";
import Profile from "@/components/userpage/Profile";

export default function Commission() {
  return (
    <div className="ml-sidebar">
      <Profile />
      <SortableGrid />
    </div>
  );
}
