"use client";

import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetItemsQuery } from "../store/api/fileApi";
import BreadCrumb from "./BreadCrumb";
import CreateItemModal from "./CreateItemModal";
import FileItem from "./FileItem";
import FilePreviewModal from "./FilePreviewModal";

export default function MainPanel() {
  const { data: items = [], isLoading } = useGetItemsQuery();
  const currentFolder = useSelector((state) => state.explorer.currentFolder);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);

  const currentItems = items.filter((item) => item.parentId === currentFolder);
  const currentFolderData = items.find((item) => item._id === currentFolder);

  if (isLoading) {
    return (
      <main className="flex-1 p-6 overflow-y-auto flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </main>
    );
  }

  return (
    <main className="flex-1 p-1 sm:p-6 overflow-y-auto scrollbar-thin bg-background">
      <div className="max-w-6xl mx-auto">
        <BreadCrumb currentFolder={currentFolder} items={items} />
        <div className="flex items-center justify-between flex-wrap mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              {currentFolderData
                ? currentFolderData?.name?.length > 25
                  ? `${currentFolderData?.name?.slice(0, 25)}...`
                  : currentFolderData?.name
                : "Home"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {currentItems.length}{" "}
              {currentItems.length === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            New Item
          </button>
        </div>

        {currentItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              This folder is empty
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Click "New Item" to create a folder or file
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentItems.map((item) => (
              <FileItem key={item._id} item={item} onPreview={setPreviewFile} />
            ))}
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateItemModal
          parentId={currentFolder}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {previewFile && (
        <FilePreviewModal
          file={previewFile}
          onClose={() => setPreviewFile(null)}
        />
      )}
    </main>
  );
}
