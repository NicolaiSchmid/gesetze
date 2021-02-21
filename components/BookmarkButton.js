import { useHotkeys } from "react-hotkeys-hook";

import useBookmarks from "../lib/useBookmarks";

import { AddCircle, RemoveCircle } from "@material-ui/icons";

const BookmarkButton = ({ bookmark, disableShortcut }) => {
  const [bookmarks, addBookmark, removeBookmark] = useBookmarks();
  const exists = bookmarks[bookmark] !== undefined;

  const handleBookmark = () => {
    if (exists) {
      removeBookmark(bookmark);
      return;
    }

    addBookmark(bookmark);
  };

  useHotkeys(
    "b",
    (event) => {
      event.preventDefault();
      if (disableShortcut) return;
      handleBookmark();
    },
    [handleBookmark, bookmark]
  );

  return (
    <button
      onClick={handleBookmark}
      className="bg-blue-500 mr-2 text-white rounded-full h-8 w-8 flex items-center justify-center"
    >
      {exists ? <RemoveCircle /> : <AddCircle />}
    </button>
  );
};

export default BookmarkButton;
