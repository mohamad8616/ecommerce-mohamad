import React, { Dispatch, SetStateAction } from "react";
import { Button } from "./Button";
import { digitsEnToFa } from "@persian-tools/persian-tools";

interface PaginationProps {
  page: number;
  setPages: Dispatch<SetStateAction<number>>;
  data: {
    projects: Array<{
      name: string;
      id: number;
    }>;
    hasMore: boolean;
    totalPage: number;
  };
  isPlaceholderData: boolean;
}

const Pagination = ({
  page,
  setPages,
  data,
  isPlaceholderData,
}: PaginationProps) => {
  return (
    <div className="mx-auto mt-8 flex w-full items-center justify-evenly gap-4 p-4 xl:w-3/4">
      <button
        onClick={() => setPages((old) => Math.max(old - 1, 1))}
        disabled={page === 1}
        className="font-semibold disabled:text-gray-600"
      >
        صفحه قبل
      </button>{" "}
      <ul className="flex w-1/2 items-center justify-between font-bold">
        {/* Always show first page */}
        <li>
          <Button
            onClick={() => setPages(1)}
            className={page === 1 ? "bg-blue-600" : ""}
          >
            {digitsEnToFa("1")}
          </Button>
        </li>

        {page > 3 && <li>...</li>}

        {Array.from({ length: 3 }, (_, i) => {
          let pageNumber;
          if (page <= 3) {
            // For pages 1-3, show 2, 3, 4
            pageNumber = i + 2;
          } else if (page >= data?.totalPage - 2) {
            // For last pages, show totalPage-3, totalPage-2, totalPage-1
            pageNumber = data?.totalPage - 3 + i;
          } else {
            // For middle pages, show page-1, page, page+1
            pageNumber = page - 1 + i;
          }

          // Only render if page number is valid and not first/last page
          if (pageNumber > 1 && pageNumber < data?.totalPage) {
            return (
              <li key={pageNumber}>
                <Button
                  onClick={() => setPages(pageNumber)}
                  className={page === pageNumber ? "bg-blue-600" : ""}
                >
                  {digitsEnToFa(pageNumber.toString())}
                </Button>
              </li>
            );
          }
          return null;
        })}

        {page < data?.totalPage - 2 && <li>...</li>}

        {/* Always show last page */}
        <Button
          onClick={() => setPages(data?.totalPage)}
          className={page === data?.totalPage ? "bg-blue-600" : ""}
        >
          <li>{digitsEnToFa(data?.totalPage.toString())}</li>
        </Button>
      </ul>
      <button
        onClick={() => {
          setPages((old) => (data?.hasMore ? old + 1 : old));
        }}
        disabled={isPlaceholderData || !data?.hasMore}
        className="font-semibold disabled:text-gray-600"
      >
        صفحه بعد
      </button>
    </div>
  );
};

export default Pagination;
