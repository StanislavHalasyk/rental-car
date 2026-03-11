"use client";

import { useEffect, useState } from "react";
import { fetchCars } from "@/lib/api/cars-api";
import { Car } from "@/types/car";
import VehicleCard from "@/components/VehicleCard/VehicleCard";

export default function CatalogPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const data = await fetchCars(1, 12);
        setCars(data);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  return (
    <section className="py-20 px-8 max-w-[1440px] mx-auto">
      {loading ? (
        <p className="text-center text-xl">Loading cars...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-7 gap-y-12">
          {cars.map((car) => (
            <VehicleCard key={car.id} car={car} />
          ))}
        </div>
      )}

      {/* Кнопка Load More (пока просто для вида, логику добавим позже) */}
      <div className="flex justify-center mt-16">
        <button className="text-[var(--color-primary)] font-medium underline hover:text-[var(--color-primary-hover)] transition-colors">
          Load more
        </button>
      </div>
    </section>
  );
}
