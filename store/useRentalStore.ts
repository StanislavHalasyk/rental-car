import { Car } from "@/types/car";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Экспортируем интерфейс, чтобы CatalogPage его видел
export interface FilterState {
  brand: string;
  price: string;
  mileageFrom: string;
  mileageTo: string;
}

export interface RentalState {
  cars: Car[];
  favorites: Car[];
  filters: FilterState;
  addCars: (cars: Car[]) => void;
  setCars: (cars: Car[]) => void;
  editFilters: (filters: Partial<FilterState>) => void;
  addToFavorites: (car: Car) => void;
  removeFromFavorites: (carId: string) => void;
}

export const useRentalStore = create<RentalState>()(
  persist(
    (set) => ({
      cars: [],
      favorites: [],
      filters: {
        brand: "",
        price: "",
        mileageFrom: "",
        mileageTo: "",
      },

      addCars: (newCars) =>
        set((state) => ({
          cars: [...state.cars, ...newCars],
        })),

      setCars: (newCars) =>
        set({
          cars: newCars,
        }),

      editFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),

      addToFavorites: (car) =>
        set((state) => ({
          favorites: [...state.favorites, car],
        })),

      removeFromFavorites: (carId) =>
        set((state) => ({
          favorites: state.favorites.filter((car) => car.id !== carId),
        })),
    }),
    {
      name: "rental-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        favorites: state.favorites,
        filters: state.filters,
      }),
    },
  ),
);
