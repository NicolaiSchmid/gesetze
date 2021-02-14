import Link from "next/link";
import Layout from "../components/Layout";
export default function Home() {
  return (
    <Layout>
      <div className="p-8 text-gray-800">
        <p>
          Eine angenehme Webapp für{" "}
          <a
            href="gesetze-im-internet.de"
            target="_blank"
            rel="noopener"
            className="text-blue-800 underline"
          >
            Gesetze im Internet
          </a>
          . Die Inhalte sind genau die gleichen, es ist nur einfacher zu lesen
          und es gibt einige nette Features.
        </p>

        <h3 className="text-xl mt-4">Bedienung</h3>
        <p>
          Alle Gesetze sind über die URL aufrufbar. Man nimmt das Kürzel, dass
          auch Gesetze-im-Internet benutzt und fügt es an die URL an. Dahinter
          dann der gewünschte Paragraph, als zweites Pfadsegment. Zum Beispiel
          das{" "}
          <Link href="/hgb/1">
            <a className="text-blue-800 underline">Handelsgesetzbuch, §1</a>
          </Link>{" "}
          über{" "}
          <Link href="/hgb/1">
            <a className="text-blue-800 underline">"/hgb/1"</a>
          </Link>
        </p>
        <h3 className="text-xl mt-4">
          Shortcuts (warum es diese Seite überhaupt gibt)
        </h3>
        <p>
          Auf jeder Gesetzestextseite kann mit dem Drücken der Taste "p" eine
          schnelle Navigation aufgerufen werden, wo der Paragraphname eingegeben
          werden kann.
        </p>
        <br />
        <p className="">
          Autor -{" "}
          <a
            href="https://nicolaischmid.de"
            target="_blank"
            className="text-blue-800 underline"
          >
            Nicolai Schmid
          </a>
        </p>
      </div>
    </Layout>
  );
}
