/* eslint-disable react/react-in-jsx-scope */
import RoundButton from "@/components/general/RoundButton";
import Sidebar from "@/components/layout/sidebar";

export default function EditCommissionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex flex-row">
      <div className="h-full mr-10">
        <Sidebar />
      </div>
      <RoundButton />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
