import CharacterCard from "./CharacterCard";

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
}

interface Props {
  characters: Character[];
  sortOrder: string;
  favorites: number[];
  toggleFavorite: (id: number) => void;
}

export default function CharacterGrid({ characters, sortOrder, favorites, toggleFavorite }: Props) {
  const sorted = [...characters].sort((a, b) =>
    sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {sorted.map((char) => (
        <CharacterCard
          key={char.id}
          character={char}
          isFavorite={favorites.includes(char.id)}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}
