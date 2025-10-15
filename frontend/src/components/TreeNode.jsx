"use client";

import clsx from "clsx";
import { ChevronDown, ChevronRight, Folder, FolderOpen } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentFolder } from "../store/slices/explorerSlice";

export default function TreeNode({ item, allItems, level }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const currentFolder = useSelector((state) => state.explorer.currentFolder);

  if (item.type !== "folder") return null;

  const children = allItems.filter((child) => child.parentId === item._id);
  const hasChildren = children.length > 0;
  const isActive = currentFolder === item._id;

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleClick = () => {
    dispatch(setCurrentFolder(item._id));
    if (hasChildren && !isExpanded) {
      setIsExpanded(true);
    }
  };

  return (
    <div>
      <div
        className={clsx(
          "flex items-center gap-1 px-2 py-1.5 rounded-md cursor-pointer transition-colors",
          "hover:bg-secondary",
          isActive && "bg-primary/10 text-primary font-medium"
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={handleClick}
      >
        {hasChildren ? (
          <button
            onClick={handleToggle}
            className="p-0.5 hover:bg-muted rounded"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        ) : (
          <span className="w-5" />
        )}
        {isExpanded ? (
          <FolderOpen className="w-4 h-4 text-primary" />
        ) : (
          <Folder className="w-4 h-4 text-primary" />
        )}
        <span className="text-sm truncate flex-1">{item.name}</span>
      </div>
      {isExpanded && hasChildren && (
        <div>
          {children?.map((child) => (
            <TreeNode
              key={child._id}
              item={child}
              allItems={allItems}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
