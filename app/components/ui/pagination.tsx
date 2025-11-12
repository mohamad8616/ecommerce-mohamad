import { cn } from "@/lib/utils";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { DummyProduct, FakeProduct } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

interface PaginationProps {
  page: number;
  setPages: Dispatch<SetStateAction<number>>;
  data: {
    products: {
      products: Array<DummyProduct | FakeProduct>;
      summary: {
        totalCombined: number;
        totalFake: number;
        totalDummy: number;
      };
    };
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
    <div className="mx-auto mt-8 flex w-full items-center justify-evenly gap-4 lg:p-4 xl:w-3/4">
      <button
        onClick={() => setPages((old) => Math.max(old - 1, 1))}
        disabled={page === 1}
        className={cn(
          "cursor-pointer",
          "text-sm",
          page === 1 ? "text-gray-600" : "",
        )}
      >
        صفحه قبل
      </button>{" "}
      <ul className="flex w-1/2 items-center justify-between font-bold">
        {/* Always show first page */}
        <li>
          <button
            onClick={() => setPages(1)}
            className={cn("cursor-pointer", page === 1 ? "text-blue-600" : "")}
          >
            {digitsEnToFa("1")}
          </button>
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
                <button
                  onClick={() => setPages(pageNumber)}
                  className={cn(
                    "cursor-pointer",
                    page === pageNumber ? "text-blue-600" : "",
                  )}
                >
                  {digitsEnToFa(pageNumber.toString())}
                </button>
              </li>
            );
          }
          return null;
        })}

        {page < data?.totalPage - 2 && <li>...</li>}

        {/* Always show last page */}
        <button
          onClick={() => setPages(data?.totalPage)}
          className={page === data?.totalPage ? "text-blue-600" : ""}
        >
          <li>{digitsEnToFa(data?.totalPage.toString())}</li>
        </button>
      </ul>
      <button
        onClick={() => {
          setPages((old) => (data?.hasMore ? old + 1 : old));
        }}
        disabled={isPlaceholderData || !data?.hasMore}
        className={cn(
          "cursor-pointer",
          "text-sm",
          isPlaceholderData || !data?.hasMore ? "text-gray-600" : "",
        )}
      >
        صفحه بعد
      </button>
    </div>
  );
};

export default Pagination;
