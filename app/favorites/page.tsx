"use client";

import { useState, useEffect, useMemo } from "react";
import { useRentalStore } from "@/store/useRentalStore";
import VehicleCard from "@/components/VehicleCard/VehicleCard";
import Filters from "@/components/Filters/Filters";
import { Car } from "@/types/car";

export default function FavoritesPage() {
  const { favorites, filters, editFilters } = useRentalStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredFavorites = useMemo(() => {
    const list = Array.isArray(favorites) ? favorites : [];
    if (!list.length) return [];

    return list.filter((car: Car) => {
      if (
        filters.brand &&
        !car?.make?.toLowerCase().includes(filters.brand.toLowerCase())
      )
        return false;
      if (filters.price) {
        const carPrice = parseInt(
          car?.rentalPrice?.replace(/\D/g, "") || "0",
          10,
        );
        if (carPrice > parseInt(filters.price, 10)) return false;
      }
      return true;
    });
  }, [favorites, filters]);

  if (!mounted) return null;

  return (
    <section className="py-10 px-8 max-w-[1440px] mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-10">Favorites</h1>

      <Filters onSearch={(newF) => editFilters(newF)} />

      {filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[32px] mt-10">
          {filteredFavorites.map((car, idx) => (
            <VehicleCard key={`${car.id}-${idx}`} car={car} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-20 text-gray-500">
          {favorites.length === 0
            ? "No favorites added yet."
            : "No results for these filters."}
        </p>
      )}
    </section>
  );
}
