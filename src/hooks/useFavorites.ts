import { useEffect, useState } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const newFavs = prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id];
      localStorage.setItem("favorites", JSON.stringify(newFavs));
      return newFavs;
    });
  };

  return { favorites, toggleFavorite };
}
