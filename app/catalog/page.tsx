"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useRentalStore } from "@/store/useRentalStore";
import { fetchCars } from "@/lib/api/cars-api";
import VehicleCard from "@/components/VehicleCard/VehicleCard";
import Filters from "@/components/Filters/Filters";
import { Car } from "@/types/car";

interface FilterState {
  brand?: string;
  price?: string;
  mileageFrom?: string;
  mileageTo?: string;
  [key: string]: string | number | boolean | undefined;
}

export default function CatalogPage() {
  const { cars, setCars, addCars, filters, editFilters } = useRentalStore();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loadData = useCallback(
    async (nextPage: number, isNew: boolean, brandName: string) => {
      setIsLoading(true);
      try {
        const data = await fetchCars(nextPage, 12, brandName);
        if (isNew) {
          setCars(data);
        } else {
          addCars(data);
        }
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [setCars, addCars],
  );

  useEffect(() => {
    if (mounted) {
      loadData(1, true, filters.brand || "");
    }
  }, [mounted, loadData, filters.brand]);

  const filteredCars = useMemo(() => {
    const list = Array.isArray(cars) ? cars : [];
    return list.filter((car: Car) => {
      if (filters.brand) {
        const carMake = (
          car?.make ||
          (car as Car & { brand?: string })?.brand ||
          ""
        ).toLowerCase();
        if (!carMake.includes(filters.brand.toLowerCase())) return false;
      }
      if (filters.price) {
        const carPrice = parseInt(
          car?.rentalPrice?.replace(/\D/g, "") || "0",
          10,
        );
        if (carPrice > parseInt(filters.price, 10)) return false;
      }

      const mFrom = filters.mileageFrom ? parseInt(filters.mileageFrom, 10) : 0;
      const mTo = filters.mileageTo
        ? parseInt(filters.mileageTo, 10)
        : Infinity;

      if (car.mileage < mFrom || car.mileage > mTo) return false;

      return true;
    });
  }, [cars, filters]);

  const handleSearch = (newFilters: FilterState) => {
    editFilters(newFilters);
    setPage(1);
    loadData(1, true, newFilters.brand || "");
  };

  const handleReset = () => {
    const empty: FilterState = {
      brand: "",
      price: "",
      mileageFrom: "",
      mileageTo: "",
    };
    editFilters(empty);
    setPage(1);
    loadData(1, true, "");
  };

  if (!mounted) return null;

  return (
    <section className="py-10 px-8 max-w-[1440px] mx-auto min-h-screen">
      <Filters onSearch={handleSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[32px] mt-10">
        {filteredCars.map((car: Car, index: number) => (
          <VehicleCard key={`${car.id}-${index}`} car={car} index={index} />
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center mt-10">
          <p className="text-[#3470FF] font-bold animate-pulse text-lg">
            Loading...
          </p>
        </div>
      )}

      {!isLoading && filteredCars.length === 0 && (
        <div className="text-center mt-20">
          <p className="text-[#121417]/50 text-xl font-medium mb-4">
            No cars found.
          </p>
          <button onClick={handleReset} className="text-[#3470FF] underline">
            Show all cars
          </button>
        </div>
      )}

      {!isLoading &&
        Array.isArray(cars) &&
        cars.length >= 12 &&
        !filters.brand && (
          <div className="flex justify-center mt-10 pb-10">
            <button
              onClick={() => {
                const next = page + 1;
                setPage(next);
                loadData(next, false, "");
              }}
              className="px-[40px] py-[12px] text-[#121417] border border-[#3470FF] rounded-[12px] hover:bg-[#3470FF]/5 transition-all"
            >
              Load more
            </button>
          </div>
        )}
    </section>
  );
}
