import React from "react";

export default function FormComponentSideBar({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col h-full w-20">{children}</div>;
}
