import BookmarkButton from "./BookmarkButton";

import Link from "next/link";

import useBookmarks from "../lib/useBookmarks";

const BookmarkList = () => {
  const [bookmarks] = useBookmarks();

  if (Object.keys(bookmarks).length === 0)
    return <div className="italic">Keine Lesezeichen</div>;

  return (
    <div>
      {Object.keys(bookmarks).map((bookmark) => (
        <span className="flex justify-start align-center p-2" key={bookmark}>
          <BookmarkButton bookmark={bookmark} disableShortcut />
          <Link href={bookmark}>
            <a className="text-blue-800 underline">
              {bookmark} - {bookmarks[bookmark]}
            </a>
          </Link>
        </span>
      ))}
    </div>
  );
};

export default BookmarkList;
