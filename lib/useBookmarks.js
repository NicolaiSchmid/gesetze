import { useState } from "react";

import useLocalStorage from "./useLocalStorage";

export default function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage("bookmarks", {});

  const addBookmark = (link, title) => {
    const books = { ...bookmarks };
    books[link] = title || "";

    setBookmarks(books);
  };

  const removeBookmark = (link) => {
    const books = { ...bookmarks };

    delete books[link];

    setBookmarks(books);
  };

  return [bookmarks, addBookmark, removeBookmark];
}
