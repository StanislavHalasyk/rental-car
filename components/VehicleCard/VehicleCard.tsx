"use client";

import Image from "next/image";
import Link from "next/link";
import { useRentalStore } from "@/store/useRentalStore";
import { Car } from "@/types/car";

interface VehicleCardProps {
  car: Car;
  index?: number;
}

// 1. ВЫНОСИМ СЮДА (вне функции VehicleCard)
// Теперь он виден всему файлу и точно не будет красным
const Separator = () => (
  <span className="inline-block w-[1px] h-[16px] bg-[#121417]/10 mx-[6px] align-middle" />
);

export default function VehicleCard({ car, index = 0 }: VehicleCardProps) {
  const { favorites, addToFavorites, removeFromFavorites } = useRentalStore();

  const isFavorite =
    Array.isArray(favorites) && favorites.some((fav) => fav.id === car.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(car.id);
    } else {
      addToFavorites(car);
    }
  };

  const addressParts = car.address?.split(",") || [];
  const city = addressParts[1]?.trim() || "";
  const country = addressParts[2]?.trim() || "";

  const carBrand = car.make || (car as Car & { brand?: string }).brand || "Car";
  const carPhoto =
    car.img ||
    (car as Car & { photo?: string }).photo ||
    "/placeholder-car.png";

  const mileageFormatted =
    typeof car.mileage === "number" ? car.mileage.toLocaleString("ru-RU") : "0";

  return (
    <div className="relative flex flex-col w-full h-[426px] bg-white rounded-[14px] overflow-hidden group border border-[#121417]/5 shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={toggleFavorite}
        className="absolute top-3.5 right-3.5 z-10 p-0 bg-transparent border-none cursor-pointer active:scale-90 transition-transform"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={isFavorite ? "#3470FF" : "none"}
          stroke={isFavorite ? "#3470FF" : "white"}
          strokeWidth="2"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      <div className="relative w-full h-[268px] rounded-[14px] overflow-hidden bg-[#F3F3F2]">
        <Image
          src={carPhoto}
          alt={`${carBrand} ${car.model}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
          priority={index < 4}
        />
      </div>

      <div className="flex flex-col flex-grow pt-3.5 px-1.5 pb-2">
        <div className="flex justify-between items-center mb-2 font-medium text-[16px] leading-[24px] text-[#121417]">
          <span className="truncate">
            <span className="text-[#3470FF]">{carBrand}</span> {car.model},{" "}
            {car.year}
          </span>
          <span className="shrink-0 font-semibold text-[18px] leading-[24px]">
            ${car.rentalPrice?.replace(/\D/g, "") || "0"}
          </span>
        </div>

        <div className="text-[#121417]/50 text-[12px] leading-[18px] mb-7 overflow-hidden">
          <p className="truncate flex items-center mb-1">
            {city} <Separator /> {country} <Separator /> {car.rentalCompany}
          </p>
          <p className="truncate flex items-center">
            {car.type} <Separator /> {mileageFormatted} km
          </p>
        </div>

        <Link
          href={`/catalog/${car.id}`}
          className="mt-auto w-full py-3 bg-[#3470FF] text-white rounded-[12px] font-semibold text-[14px] hover:bg-[#0B44CD] transition-colors cursor-pointer text-center no-underline"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
}
