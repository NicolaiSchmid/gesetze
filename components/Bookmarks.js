import BookmarkList from "./BookmarkList";

const Bookmarks = () => {
  return (
    <div className="mb-4 rounded-lg bg-white shadow-lg px-5 pt-5 pb-10 text-gray-800">
      <h2 className="text-xl">Lesezeichen</h2>
      <div>
        <BookmarkList />
      </div>
    </div>
  );
};

export default Bookmarks;
