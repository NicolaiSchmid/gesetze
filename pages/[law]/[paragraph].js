import DOMParser from "dom-parser";
import flatten from "lodash/flatten";
import Link from "next/link";

const DOMAIN = "https://www.gesetze-im-internet.de";
export default function Display({
  headers = [],
  content = [],
  footnotes = [],
  forward,
  backward,
  law,
  paragraph,
}) {
  return (
    <div className="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 py-5">
      <div
        className="w-full mx-auto rounded-lg bg-white shadow-lg px-5 pt-5 pb-10 text-gray-800"
        style={{ maxWidth: "700px" }}
      >
        <div className="w-full pt-1 pb-5">
          <div className="">
            {headers.map((header) => (
              <h2
                className="text-lg"
                dangerouslySetInnerHTML={{ __html: header }}
              />
            ))}
          </div>
        </div>
        <div className="w-full mb-10">
          {content.map((content) => (
            <p
              className="text-sm text-gray-600px-5 m-2"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ))}
        </div>
        <div className="w-full">
          {footnotes.map((footnote) => (
            <p
              className="text-md text-gray-600"
              dangerouslySetInnerHTML={{ __html: footnote }}
            />
          ))}
        </div>
        <div className="w-full flex justify-between">
          <NavigationButton href={`/${law}/${backward}`}>
            Zurück
          </NavigationButton>
          <NavigationButton href={`/${law}/${forward}`}>Vor</NavigationButton>
        </div>
      </div>
    </div>
  );
}

function NavigationButton({ href, children }) {
  return (
    <Link href={href}>
      <a className="px-1 py-1 border border-transparent text-sm leading-2 font-medium rounded-md hover:bg-indigo-500 hover:text-white focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700">
        {children}
      </a>
    </Link>
  );
}

function getLinkHref(element) {
  const originalLink = element.attributes
    .map((attribute) => (attribute.name === "href" ? attribute.value : null))
    .filter(Boolean)[0];

  return originalLink.match(/__(.+)\.html/)[1];
}

export async function getServerSideProps({ params: { law, paragraph } }) {
  const domparser = new DOMParser();

  const html = await fetch(
    `${DOMAIN}/${law.toLowerCase()}/__${paragraph.toLowerCase()}.html`
  )
    .then((response) => response.text())
    .then((response) => domparser.parseFromString(response));

  const headers = flatten(
    html
      .getElementsByClassName("jnheader")
      .map((header) =>
        header.getElementsByTagName("h1").map((heading) => heading.innerHTML)
      )
  );
  const content = html
    .getElementsByClassName("jurAbsatz")
    .map((content) => content.innerHTML);
  const footnotes = html
    .getElementsByClassName("jnfussnote")
    .map((footnote) => footnote.innerHTML);

  const backward = getLinkHref(
    html.getElementById("blaettern_zurueck").firstChild
  );
  const forward = getLinkHref(
    html.getElementById("blaettern_weiter").firstChild
  );

  return {
    props: { headers, content, footnotes, forward, backward, law, paragraph },
  };
}

// // Generate all possible laws and paragraphs
// export async function getStaticPaths({ law, paragraph }) {
//   console.log(law, paragraph);
//   // Call an external API endpoint to get posts
//   const res = await fetch(
//     `https://www.gesetze-im-internet.de/{law}/__{paragraph}.html`
//   );
//   console.log(response);
// }
