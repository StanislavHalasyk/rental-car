import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RentalState {
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export const useRentalStore = create<RentalState>()(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),
    }),
    {
      name: "rental-favorites-storage",
    },
  ),
);
