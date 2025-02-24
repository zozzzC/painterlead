import useSaveChanges from "@/hooks/useSaveChanges";

export default function SaveChanges() {
  const [change, toggleChange] = useSaveChanges();

  return (
    <div className="w-full h-full flex">
      <div className="items-center justify-center h-28 w-28">
        <p>You have unsaved changes. Would you like to save your changes?</p>
        <button></button>
        <button>Discard Changes</button>
        <button>Save Changes</button>
      </div>
    </div>
  );
}
