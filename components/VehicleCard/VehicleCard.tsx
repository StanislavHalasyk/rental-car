"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Car } from "@/types/car";
import { useRentalStore } from "@/store/useRentalStore";
import css from "./VehicleCard.module.css";

interface Props {
  car: Car;
}

const VehicleCard = ({ car }: Props) => {
  const { favorites, toggleFavorite } = useRentalStore();
  const isFavorite = car.id ? favorites.includes(car.id) : false;

  const addressParts = car.address?.split(",") || [];
  const city = addressParts[addressParts.length - 2]?.trim() || "N/A";
  const country = addressParts[addressParts.length - 1]?.trim() || "N/A";

  const imageAltText = car.make ? `${car.make} ${car.model}` : "Rental car";

  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={car.img || ""}
          alt={imageAltText}
          fill
          sizes="(max-width: 768px) 100vw, 274px"
          className={css.image}
        />
        <button
          className={css.favoriteBtn}
          onClick={() => car.id && toggleFavorite(car.id)}
          type="button"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill={isFavorite ? "var(--color-primary)" : "none"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 17.0125L7.7625 15.8875C3.375 11.9125 0.5 9.3 0.5 6.125C0.5 3.55 2.525 1.5 5.1 1.5C6.55 1.5 7.9375 2.1875 8.85 3.2625H9.15C10.0625 2.1875 11.45 1.5 12.9 1.5C15.475 1.5 17.5 3.55 17.5 6.125C17.5 9.3 14.625 11.9125 10.2375 15.8875L9 17.0125Z"
              stroke={isFavorite ? "var(--color-primary)" : "white"}
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
            {car.make} <span className={css.accent}>{car.model}</span>,{" "}
            {car.year}
          </h3>
          <span className={css.price}>{car.rentalPrice}</span>
        </div>

        <div className={css.details}>
          <span>{city}</span>
          <span>{country}</span>
          <span>{car.rentalCompany}</span>
          <span>{car.type}</span>
          <span>{car.model}</span>
          <span>{car.id}</span>
          {car.accessories?.[0] && <span>{car.accessories[0]}</span>}
        </div>
      </div>

      <Link href={`/catalog/${car.id}`} className={css.learnMoreBtn}>
        Read more
      </Link>
    </div>
  );
};

export default VehicleCard;
