import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useGetItemsQuery } from "../store/api/fileApi";
import { setCurrentFolder } from "../store/slices/explorerSlice";
import TreeNode from "./TreeNode";

export default function Sidebar() {
  const { data: items = [], isLoading } = useGetItemsQuery();
  const dispatch = useDispatch();
  const currentFolder = useSelector((state) => state.explorer.currentFolder);

  const rootItems = items.filter((item) => !item.parentId);

  // When click home page
  const handleRootFolder = () => {
    dispatch(setCurrentFolder(null));
  };
  // When Home page active
  const isActive = currentFolder === null;

  if (isLoading) {
    return (
      <aside className="w-64 border-r border-border bg-secondary/30 p-4 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </aside>
    );
  }

  return (
    <aside className="w-64 border-r border-border bg-secondary/30 overflow-y-auto scrollbar-thin h-full">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Folders
        </h2>
        <div className="space-y-1">
          <div
            className={clsx(
              "px-2 py-1.5 rounded-md cursor-pointer transition-colors hover:bg-secondary",
              isActive && "bg-primary/10 text-primary font-medium"
            )}
            onClick={handleRootFolder}
          >
            Home
          </div>
          {rootItems?.map((item) => (
            <TreeNode key={item._id} item={item} allItems={items} level={0} />
          ))}
        </div>
      </div>
    </aside>
  );
}
