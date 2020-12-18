import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="min-w-screen min-h-screen bg-gray-100">
      <div className="z-50 relative bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-3 md:justify-start md:space-x-10">
            <div className="w-0 flex-1 flex">
              <Link href="/">
                <a>Gesetze</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
