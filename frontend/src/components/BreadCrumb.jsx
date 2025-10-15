import { useDispatch } from "react-redux";
import { setCurrentFolder } from "../store/slices/explorerSlice";

const BreadCrumb = ({ currentFolder, items }) => {
  const dispatch = useDispatch();

  // Build the path from current folder up to root
  const buildPath = (folderId) => {
    const path = [];
    let folder = items?.find((item) => item._id === folderId);

    while (folder) {
      path.unshift(folder);
      folder = items?.find((item) => item._id === folder.parentId);
    }

    return path;
  };

  const path = currentFolder ? buildPath(currentFolder) : [];
  return (
    <div className="flex items-center flex-wrap gap-1 text-sm text-gray-600 mb-2">
      <span
        className="cursor-pointer hover:underline text-base"
        onClick={() => dispatch(setCurrentFolder(null))}
      >
        My Drive
      </span>
      {/* {path?.slice(0, path?.length - 1)?.map((folder, idx) => ( */}
      {path?.map((folder, idx) => (
        <span key={folder._id} className="flex items-center gap-2">
          <span>›</span>
          <span
            className="cursor-pointer hover:underline text-base"
            onClick={() => dispatch(setCurrentFolder(folder._id))}
          >
            {folder?.name?.length > 15
              ? `${folder?.name?.slice(0, 15)}...`
              : folder?.name}
          </span>
        </span>
      ))}
    </div>
  );
};

export default BreadCrumb;
