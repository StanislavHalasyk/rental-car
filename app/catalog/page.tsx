"use client";

import { useEffect, useState, useCallback } from "react";
import { fetchCars } from "@/lib/api/cars-api";
import { Car } from "@/types/car";
import VehicleCard from "@/components/VehicleCard/VehicleCard";
import Filters from "@/components/Filters/Filters";

interface FilterState {
  brand: string;
  price: string;
  mileageFrom: string;
  mileageTo: string;
}

export default function CatalogPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    brand: "",
    price: "",
    mileageFrom: "",
    mileageTo: "",
  });

  const loadCars = useCallback(
    async (
      pageNum: number,
      currentFilters: FilterState,
      isNewSearch: boolean,
    ) => {
      setLoading(true);
      try {
        const data = await fetchCars(pageNum, 12, currentFilters.brand);

        if (isNewSearch) {
          setCars(data);
        } else {
          setCars((prev) => [...prev, ...data]);
        }

        if (data.length < 12) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    loadCars(1, filters, true);
  }, [loadCars]);

  const handleSearch = (newFilters: FilterState) => {
    setFilters(newFilters);
    setPage(1);
    loadCars(1, newFilters, true);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadCars(nextPage, filters, false);
  };

  const displayedCars = cars.filter((car) => {
    let isMatch = true;

    if (filters.price) {
      const carPrice = parseInt(car.rentalPrice.replace("$", ""), 10);
      const filterPrice = parseInt(filters.price, 10);
      if (carPrice > filterPrice) isMatch = false;
    }

    if (filters.mileageFrom) {
      if (car.mileage < parseInt(filters.mileageFrom, 10)) isMatch = false;
    }

    if (filters.mileageTo) {
      if (car.mileage > parseInt(filters.mileageTo, 10)) isMatch = false;
    }

    return isMatch;
  });

  return (
    <section className="py-10 px-8 max-w-[1440px] mx-auto min-h-screen">
      <Filters onSearch={handleSearch} />

      {displayedCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[32px] gap-y-[48px]">
          {displayedCars.map((car) => (
            <VehicleCard key={`${car.id}-${Math.random()}`} car={car} />
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-center text-xl mt-20 text-gray-500">
            No cars found matching your criteria. Try to change filters.
          </p>
        )
      )}

      {loading && (
        <p className="text-center text-xl mt-10 text-[var(--color-primary)] animate-pulse">
          Loading cars...
        </p>
      )}

      {hasMore && !loading && displayedCars.length > 0 && (
        <div className="flex justify-center mt-16">
          <button
            onClick={handleLoadMore}
            className="text-[var(--color-primary)] font-medium underline hover:text-[var(--color-primary-hover)] transition-colors"
          >
            Load more
          </button>
        </div>
      )}
    </section>
  );
}
