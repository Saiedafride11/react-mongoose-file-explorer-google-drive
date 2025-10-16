"use client";

import { Save, X } from "lucide-react";
import { useState } from "react";
import { useUpdateContentMutation } from "../store/api/fileApi";
import { toaster } from "../utils/toaster";

export default function FilePreviewModal({ file, setPreviewFile, onClose }) {
  const [content, setContent] = useState(file.content || "");
  const [isEditing, setIsEditing] = useState(false);
  const [updateContent, { isLoading, isSuccess }] = useUpdateContentMutation();

  const handleSave = async () => {
    try {
      if (content !== file?.content) {
        await updateContent({ id: file._id, content });
        toaster.success("Content updated successfully");
      }
    } catch (error) {
      toaster.error("Failed content updated");
    }
    setIsEditing(false);
    setPreviewFile({ ...file, content });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground truncate">
            {file.name?.length > 25
              ? `${file.name?.slice(0, 25)}...`
              : file.name}
          </h3>
          <div className="flex items-center gap-2">
            {file.fileType === "text" && (
              <>
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-3 py-1.5 border border-border rounded-lg hover:bg-secondary transition-colors text-sm font-medium"
                  >
                    Edit
                  </button>
                )}
              </>
            )}
            <button
              onClick={onClose}
              className="p-1 hover:bg-secondary rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {file.fileType === "text" ? (
            isEditing ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-full min-h-[400px] px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm"
              />
            ) : (
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap font-mono text-sm bg-secondary/30 p-4 rounded-lg">
                  {content || "No content"}
                </pre>
              </div>
            )
          ) : (
            <div className="flex items-center justify-center">
              {file.imageUrl ? (
                <img
                  src={file.imageUrl || "/placeholder.svg"}
                  alt={file.name}
                  className="max-w-full max-h-[600px] object-contain rounded-lg"
                />
              ) : (
                <div className="animate-pulse w-full h-[330px] bg-gray-300 rounded-lg" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
