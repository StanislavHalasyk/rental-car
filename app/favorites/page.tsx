"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRentalStore } from "@/store/useRentalStore";
import { fetchCarById } from "@/lib/api/cars-api";
import { Car } from "@/types/car";
import VehicleCard from "@/components/VehicleCard/VehicleCard";

export default function FavoritesPage() {
  const { favorites } = useRentalStore();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

 
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const loadFavorites = async () => {
      if (favorites.length === 0) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const fetchedCars = await Promise.all(
          favorites.map((id) => fetchCarById(id)),
        );
        setCars(fetchedCars);
      } catch (error) {
        console.error("Failed to fetch favorite cars:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
   
  }, []);


  const displayedCars = cars.filter((car) => favorites.includes(car.id));


  if (!mounted) return null;

  return (
    <section className="py-20 px-8 max-w-[1440px] mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Your Favorite Cars
      </h1>

      {loading ? (
        <p className="text-center text-xl animate-pulse text-[var(--color-primary)]">
          Loading favorites...
        </p>
      ) : displayedCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-7 gap-y-12">
          {displayedCars.map((car) => (
            <VehicleCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20">
          <p className="text-xl text-gray-500 mb-6">
            {"You haven't added any cars to your favorites yet."}
          </p>
          <Link
            href="/catalog"
            className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[var(--color-primary-hover)] transition"
          >
            Go to Catalog
          </Link>
        </div>
      )}
    </section>
  );
}
