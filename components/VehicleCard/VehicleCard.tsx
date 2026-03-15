"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Car } from "@/types/car"; // Убедись, что этот путь правильный
import css from "./VehicleCard.module.css";

interface VehicleCardProps {
  car: Car;
}

const VehicleCard = ({ car }: VehicleCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkFavorite = () => {
      const saved = localStorage.getItem("favorites");
      const favorites: Car[] = saved ? JSON.parse(saved) : [];
      const isSaved = favorites.some((fav) => fav.id === car.id);
      setIsFavorite(isSaved);
    };

    checkFavorite();
  }, [car.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("favorites");
    const favorites: Car[] = saved ? JSON.parse(saved) : [];

    let updated: Car[];
    if (isFavorite) {
      updated = favorites.filter((fav) => fav.id !== car.id);
    } else {
      updated = [...favorites, car];
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  const addressParts = car.address?.split(",") || [];
  const city = addressParts[addressParts.length - 2]?.trim() || "N/A";
  const country = addressParts[addressParts.length - 1]?.trim() || "N/A";

  const formattedPrice = car.rentalPrice?.includes("$")
    ? car.rentalPrice
    : `$${car.rentalPrice}`;

  const topRow = [city, country, car.rentalCompany].filter(Boolean);
  const bottomRow = [
    car.type,
    car.brand, // Добавляем марку авто (Buick/Volvo) в детали
    car.mileage.toLocaleString("en-US") + " km",
  ].filter(Boolean);

  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={car.img || "/placeholder-car.png"}
          alt={`${car.brand} ${car.model}`}
          fill
          className={css.image}
        />

        <button
          className={`${css.favoriteBtn} ${isFavorite ? css.active : ""}`}
          aria-label="Add to favorite"
          onClick={toggleFavorite}
          type="button"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.63 3.4575C15.247 3.07428 14.7922 2.77026 14.2916 2.56284C13.791 2.35542 13.2545 2.24866 12.7125 2.24866C12.1705 2.24866 11.634 2.35542 11.1334 2.56284C10.6328 2.77026 10.178 3.07428 9.795 3.4575L9 4.2525L8.205 3.4575C7.43132 2.68382 6.3817 2.24905 5.2875 2.24905C4.1933 2.24905 3.14368 2.68382 2.37 3.4575C1.59632 4.23118 1.16155 5.2808 1.16155 6.375C1.16155 7.4692 1.59632 8.51882 2.37 9.2925L3.165 10.0875L9 15.9225L14.835 10.0875L15.63 9.2925C16.0132 8.90951 16.3172 8.45474 16.5247 7.95414C16.7321 7.45354 16.8389 6.91701 16.8389 6.375C16.8389 5.83299 16.7321 5.29646 16.5247 4.79586C16.3172 4.29526 16.0132 3.84049 15.63 3.4575V3.4575Z"
              stroke={isFavorite ? "#3470FF" : "white"}
              fill={isFavorite ? "#3470FF" : "none"}
              strokeOpacity={isFavorite ? "1" : "0.8"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className={css.info}>
        <div className={css.titleRow}>
          <h3 className={css.title}>
            {/* Название бренда черным */}
            <span>{car.brand} </span>
            {/* Модель синим цветом */}
            <span className={css.accent}>{car.model}</span>,{/* Год черным */}
            <span> {car.year}</span>
          </h3>
          <span className={css.price}>{formattedPrice}</span>
        </div>

        <div className={css.details}>
          <div className={css.tagLine}>
            {topRow.map((tag, i) => (
              <span key={`top-${i}`} className={css.tagItem}>
                {tag}
              </span>
            ))}
          </div>
          <div className={css.tagLine}>
            {bottomRow.map((tag, i) => (
              <span key={`bottom-${i}`} className={css.tagItem}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <Link href={`/catalog/${car.id}`} className={css.learnMoreBtn}>
          Read more
        </Link>
      </div>
    </div>
  );
};

export default VehicleCard;
