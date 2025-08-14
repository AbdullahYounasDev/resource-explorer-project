"use client";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import SearchAndFilter from "@/components/SearchAndFilter";
import CharacterGrid from "@/components/CharacterGrid";
import Pagination from "@/components/Pagination";
import { useTheme } from "@/app/providers";

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
}

interface CharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

function HomePageContent() {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { favorites, toggleFavorite } = useFavorites();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const debouncedSearch = useDebounce(search, 400);

  const page = Number(searchParams.get("page") || 1);
  const statusFilter = searchParams.get("status") || "";
  const sortOrder = searchParams.get("sort") || "asc";

  const { data, isLoading, isError, refetch } = useQuery<CharacterResponse>({
    queryKey: ["characters", page, debouncedSearch, statusFilter, sortOrder],
    queryFn: async ({ signal }) => {
      const res = await api.get<CharacterResponse>("/character", {
        params: {
          page,
          name: debouncedSearch || undefined,
          status: statusFilter || undefined,
        },
        signal,
      });
      return res.data;
    },
    placeholderData: keepPreviousData,
  });

  const updateParams = (params: Record<string, string | number | undefined>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value) newParams.set(key, String(value));
      else newParams.delete(key);
    });
    router.push(`/?${newParams.toString()}`);
  };

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState message="Failed to load characters." onRetry={refetch} />;
  if (!data?.results?.length) return <EmptyState message="No characters found." />;

  const containerClass = theme === "dark"
    ? "p-4 space-y-4 font-comic min-h-screen relative overflow-hidden bg-gray-900"
    : "p-4 space-y-4 font-comic min-h-screen relative overflow-hidden bg-[#FFD580] text-black";

  return (
    <div className={containerClass}>
      <SearchAndFilter
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          updateParams({ q: val, page: 1 });
        }}
        statusFilter={statusFilter}
        onFilterChange={(val) => updateParams({ status: val, page: 1 })}
        sortOrder={sortOrder}
        onSortChange={(val) => updateParams({ sort: val })}
      />

      <CharacterGrid
        characters={data.results}
        sortOrder={sortOrder}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />

      <Pagination
        currentPage={page}
        totalPages={data.info.pages}
        hasPrev={!!data.info.prev}
        hasNext={!!data.info.next}
        onPageChange={(newPage: any) => updateParams({ page: newPage })}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="p-4 space-y-4 font-comic min-h-screen flex items-center justify-center">
        <div className="border-4 border-black bg-white p-8 rounded-xl shadow-comic-lg text-center">
          <h2 className="text-2xl font-bold mb-2">LOADING COMIC UNIVERSE...</h2>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden border-2 border-black">
            <div className="h-full bg-blue-500 animate-pulse" style={{ width: "70%" }}></div>
          </div>
        </div>
      </div>
    }>
      <HomePageContent />
    </Suspense>
  );
}