"use client";

import clsx from "clsx";
import {
  Edit2,
  FileText,
  Folder,
  ImageIcon,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  useDeleteItemMutation,
  useRenameItemMutation,
} from "../store/api/fileApi";
import { setCurrentFolder } from "../store/slices/explorerSlice";

export default function FileItem({ item, onPreview }) {
  const [showMenu, setShowMenu] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(item.name);
  const [deleteItem] = useDeleteItemMutation();
  const [renameItem] = useRenameItemMutation();
  const dispatch = useDispatch();

  const getIcon = () => {
    if (item.type === "folder")
      return <Folder className="w-8 h-8 text-primary" />;
    if (item.fileType === "image")
      return <ImageIcon className="w-8 h-8 text-green-500" />;
    return <FileText className="w-8 h-8 text-blue-500" />;
  };

  const handleClick = () => {
    if (item.type === "folder") {
      dispatch(setCurrentFolder(item._id));
    } else {
      onPreview(item);
    }
  };

  const handleDelete = () => {
    toast((t) => (
      <div className="text-sm">
        <p className="font-medium">
          Delete <span className="text-red-600">"{item.name}"</span>?
        </p>
        <div className="flex justify-end gap-2 mt-3">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 rounded-md border text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              await deleteItem(item._id);
              toast.dismiss(t.id);
              toast.success("Deleted successfully!");
            }}
            className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  const handleRename = async () => {
    if (newName.trim() && newName !== item.name) {
      try {
        await renameItem({ id: item._id, name: newName.trim() });
        toast.success(
          `Successfully "${item.name}" renamed to "${newName.trim()}"`
        );
      } catch (error) {
        toast.error("Failed to rename the item");
      }
    }
    setIsRenaming(false);
  };

  return (
    <div className="relative group">
      <div
        className={clsx(
          "border border-border rounded-lg p-4 bg-white hover:shadow-md transition-all cursor-pointer",
          "hover:border-primary/50"
        )}
        onClick={handleClick}
      >
        <div className="flex items-start justify-between mb-3">
          {getIcon()}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="p-1 hover:bg-secondary rounded opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {isRenaming ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRename();
              if (e.key === "Escape") {
                setNewName(item.name);
                setIsRenaming(false);
              }
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-full px-2 py-1 text-sm border border-primary rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
            autoFocus
          />
        ) : (
          <p className="text-sm font-medium text-foreground truncate">
            {item.name}
          </p>
        )}

        <p className="text-xs text-muted-foreground mt-1 capitalize">
          {item.type}
        </p>
      </div>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-2 top-12 z-20 bg-white border border-border rounded-lg shadow-lg py-1 min-w-[140px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsRenaming(true);
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-sm text-left hover:bg-secondary flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Rename
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="w-full px-4 py-2 text-sm text-left hover:bg-secondary flex items-center gap-2 text-red-600"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
