"use client";

import { useRentalStore } from "@/store/useRentalStore";
import VehicleCard from "@/components/VehicleCard/VehicleCard";
import { Car } from "@/types/car";

export default function FavoritesPage() {
  const { favorites } = useRentalStore();

  const favoriteList = Array.isArray(favorites) ? favorites : [];

  return (
    <section className="py-10 px-8 max-w-[1440px] mx-auto min-h-screen">
      <h1 className="text-[32px] font-semibold text-[#121417] mb-10">
        Your Favorite Cars
      </h1>

      {favoriteList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[32px]">
          {favoriteList.map((car: Car, index: number) => (
            <VehicleCard key={`${car.id}-${index}`} car={car} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-20">
          <p className="text-gray-500 text-xl font-medium">
            You haven&apos;t added any cars to favorites yet.
          </p>
        </div>
      )}
    </section>
  );
}
