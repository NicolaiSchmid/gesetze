import React, { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useRouter } from "next/router";

function NavigateForm({ law, setOpen }) {
  const router = useRouter();

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const newParagraph = event.target.paragraph.value;

          if (!newParagraph) {
            setOpen(false);
            return;
          }

          setOpen(false);

          // route to new paragraph
          router.push(`/${law}/${newParagraph}`);
        }}
      >
        <input
          type="text"
          id="paragraph"
          name="paragraph"
          placeholder="Paragraph"
          autoFocus
          className="w-full max-auto p-2 mb-2 shadow-lg rounded-lg focus:outline-none focus:ring-2 ring-blue-200 text-gray-800"
        />
      </form>
    </div>
  );
}

export default function Navigate({ law, paragraph }) {
  const [open, setOpen] = useState(false);

  useHotkeys(
    "p",
    (event) => {
      // Don't type the p character directly into the text input
      event.preventDefault();

      if (!open) setOpen(true);
    },
    [open, setOpen]
  );

  if (open)
    return <NavigateForm law={law} paragraph={paragraph} setOpen={setOpen} />;

  return null;
}
