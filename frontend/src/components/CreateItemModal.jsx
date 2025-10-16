"use client";

import { FileText, Folder, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import uploaderImage from "../assets/upload-icon.svg";
import { useCreateItemMutation } from "../store/api/fileApi";

export default function CreateItemModal({ parentId, currentItems, onClose }) {
  const [type, setType] = useState("folder");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [contentType, setContentType] = useState("text");
  const [imageUpload, setImageUpload] = useState(uploaderImage);
  const [allowImageUpload, setAllowImageUpload] = useState(true);

  const [
    createItem,
    {
      data: createResponseData,
      isSuccess: createIsSuccess,
      isLoading,
      isError: createIsError,
    },
  ] = useCreateItemMutation();

  // Image file upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setImageUpload(imageDataUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  // Image upload image remove
  const handleRemoveImage = (i) => {
    setImageUpload(uploaderImage);
    setAllowImageUpload(false);
    setTimeout(() => {
      setAllowImageUpload(true);
    }, 100);
  };

  // New folder | file create
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    const itemData = {
      name: name.trim(),
      type,
      parentId: parentId || null,
    };

    if (type === "file") {
      itemData.fileType = content ? "text" : "image";
      if (content) {
        itemData.content = content;
      } else if (imageUrl || imageUpload) {
        itemData.imageUrl = imageUrl ? imageUrl : imageUpload;
      }
    }

    const isDuplicateName = currentItems?.some(
      (data) =>
        data.type === type &&
        data.name.trim().toLowerCase() === name.trim().toLowerCase()
    );

    if (isDuplicateName) {
      toast.error(
        `${
          type === "folder" ? "Folder" : "File"
        } name already exists in this folder!`
      );
    } else {
      await createItem(itemData);
    }
  };

  // Response success or error
  useEffect(() => {
    if (createIsSuccess) {
      toast.success("Item created successfully");
      onClose();
    }
  }, [createIsSuccess]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">
            Create New Item
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setType("folder");
                  setName("");
                }}
                className={`flex items-center gap-2 p-3 border rounded-lg transition-colors ${
                  type === "folder"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Folder className="w-5 h-5" />
                <span className="font-medium">Folder</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setType("file");
                  setName("");
                }}
                className={`flex items-center gap-2 p-3 border rounded-lg transition-colors ${
                  type === "file"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className="font-medium">File</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={type === "folder" ? "Folder name" : "File name"}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>

          {type === "file" && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                File Type
              </label>

              <div className="space-y-3">
                <div className="flex gap-0 sm:gap-2">
                  <div
                    onClick={() => {
                      setImageUrl("");
                      setContentType("text");
                    }}
                    className={`text-[13px] sm:text-[16px] flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                      contentType === "text"
                        ? "bg-primary text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Text File
                  </div>
                  <div
                    onClick={() => {
                      setContent("");
                      setContentType("image_url");
                      setImageUpload(uploaderImage);
                    }}
                    className={`text-[13px] sm:text-[16px] flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                      contentType === "image_url"
                        ? "bg-primary text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Image Url
                  </div>
                  <div
                    onClick={() => {
                      setContent("");
                      setImageUrl("");
                      setContentType("image_upload");
                    }}
                    className={`text-[13px] sm:text-[16px] flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                      contentType === "image_upload"
                        ? "bg-primary text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Image Upload
                  </div>
                </div>

                {contentType === "text" && (
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter text content..."
                    className="w-full mt-2 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-h-[100px]"
                  />
                )}

                {contentType === "image_url" && (
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter image URL..."
                    className="w-full mt-2 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                )}

                {contentType === "image_upload" && (
                  <div className="h-full relative">
                    <label className="flex items-center gap-5 cursor-pointer bg-white overflow-hidden rounded-lg border border-gray-200 h-[114px] p-0">
                      <div className="flex justify-center items-center w-full h-[114px] p-6">
                        <img
                          src={imageUpload}
                          alt="image"
                          className="h-[90px] w-auto p-2 border-0"
                        />
                      </div>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        disabled={allowImageUpload === true ? false : true}
                      />
                    </label>
                    {imageUpload !== uploaderImage && (
                      <span
                        onClick={handleRemoveImage}
                        className="absolute top-0 right-0 w-6 h-6 leading-6 bg-red-500 text-white text-center rounded-bl-[5px] cursor-pointer"
                      >
                        ⨯
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                isLoading ||
                !name ||
                (type === "file" &&
                  !content &&
                  !imageUrl &&
                  imageUpload === uploaderImage) ||
                (type === "file" &&
                  imageUrl &&
                  !/^https?:\/\/.+/.test(imageUrl))
              }
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
