"use client";

import { useEffect, useState } from "react";

import { Car } from "../../types/car";
import VehicleCard from "../../components/VehicleCard/VehicleCard";

export default function FavoritesPage() {
  const [favoriteCars, setFavoriteCars] = useState<Car[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      const parsed = JSON.parse(saved) as Car[];
      setFavoriteCars(parsed);
    }
  }, []);

  const handleUpdate = () => {
    const saved = localStorage.getItem("favorites");
    const updated = saved ? (JSON.parse(saved) as Car[]) : [];
    setFavoriteCars(updated);
  };

  return (
    <section className="py-10 px-8 max-w-[1440px] mx-auto min-h-screen">
      <h1 className="text-[32px] font-bold mb-10 text-[#121417]">
        Your Favorite Cars
      </h1>

      {favoriteCars.length > 0 ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[32px]"
          onClick={handleUpdate}
        >
          {favoriteCars.map((car) => (
            <VehicleCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20">
          <p className="text-xl text-gray-500 mb-4">
            Your favorites list is empty.
          </p>
        </div>
      )}
    </section>
  );
}
