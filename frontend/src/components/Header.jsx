import { FolderTree } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCurrentFolder } from "../store/slices/explorerSlice";

export default function Header() {
  const dispatch = useDispatch();

  const handleRootFolder = () => {
    dispatch(setCurrentFolder(null));
  };
  return (
    <header className="h-14 border-b border-border bg-white px-6">
      <div
        className="h-full flex items-center gap-3 cursor-pointer"
        onClick={handleRootFolder}
      >
        <FolderTree className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-semibold text-foreground">
          Mini File Explorer
        </h1>
      </div>
    </header>
  );
}
