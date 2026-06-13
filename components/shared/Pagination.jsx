"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages, basePath }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page") || 1);

  const changePage = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    router.push(`${basePath}?${params.toString()}`);
  };

  return (
    <div className="flex justify-center mt-12">
      <nav>
        <ul className="inline-flex items-center -space-x-px text-gray-600">
          {/* Prev */}
          <li>
            <button
              disabled={currentPage === 1}
              onClick={() => changePage(currentPage - 1)}
              className="px-3 py-2 border rounded-l-lg bg-white disabled:opacity-40"
            >
              ‹
            </button>
          </li>

          {/* Pages */}
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            return (
              <li key={page}>
                <button
                  onClick={() => changePage(page)}
                  className={`px-3 py-2 border ${
                    currentPage === page
                      ? "bg-green-600 text-white"
                      : "bg-white"
                  }`}
                >
                  {page}
                </button>
              </li>
            );
          })}

          {/* Next */}
          <li>
            <button
              disabled={currentPage === totalPages}
              onClick={() => changePage(currentPage + 1)}
              className="px-3 py-2 border rounded-r-lg bg-white disabled:opacity-40"
            >
              ›
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
