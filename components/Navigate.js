import React, { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useRouter } from "next/router";

function processEntry(string) {
  const parts = string.split("§");

  if (parts.length === 1) {
    return { paragraph: parts[0] };
  }

  if (parts.length > 2) {
    console.error("Wrong entry");
  }

  return { law: parts[0], paragraph: parts[parts.length - 1] };
}

function NavigateForm({ law, setOpen }) {
  const router = useRouter();

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const { law: newLaw, paragraph: newParagraph } = processEntry(
            event.target.paragraph.value
          );

          if (!newParagraph) {
            setOpen(false);
            return;
          }

          setOpen(false);

          // route to new paragraph
          router.push(`/${newLaw || law}/${newParagraph}`);
        }}
      >
        <input
          type="text"
          id="paragraph"
          name="paragraph"
          placeholder="Shortcut"
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
