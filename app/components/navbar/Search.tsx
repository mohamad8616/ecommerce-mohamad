"use client";
import useDebounce from "@/hooks/useDebounce";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/Input";
import Link from "next/link";
import { Product } from "@/lib/definitions";

const Search = ({
  className,
  input,
}: {
  className?: string;
  input?: string;
}) => {
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const debounced = useDebounce(search, 1000);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadItems = async () => {
      if (debounced.length >= 2) {
        setLoading(true);
        setIsOpen(true);

        try {
          const response = await fetch(`/api/search?q=${debounced}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          setResults(data.results);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    };
    loadItems();
  }, [debounced]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <Input
        placeholder="جستجو"
        className={`relative ${input}
            flex w-auto items-center justify-between gap-2 border-0
            text-slate-200 ring-2 ring-ring/40 transition-all placeholder:text-slate-300 focus:w-11/12 sm:text-sm lg:focus:text-lg xl:w-9/12 
          `}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
      />
      {isOpen &&
        debounced.length >= 2 &&
        (loading || results.length > 0 || !loading) && (
          <div className="absolute top-full right-0 z-20 mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-xl transition-all">
            <div className="max-h-64 overflow-y-auto p-2 md:p-4">
              {loading && (
                <p className="animate-pulse text-sm text-gray-400">
                  در حال جستجو...
                </p>
              )}

              {!loading && results.length === 0 && (
                <p className="text-sm text-gray-500">نتیجه‌ای یافت نشد</p>
              )}

              {!loading && results?.length > 0 && (
                <ul className="flex flex-col space-y-2">
                  {results.map((item, index) => (
                    <li
                      key={index}
                      className="cursor-pointer rounded px-2 py-1 text-sm text-stone-700 transition hover:bg-gray-100"
                    >
                      <Link
                        href={`/products/${item.id}`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default Search;
