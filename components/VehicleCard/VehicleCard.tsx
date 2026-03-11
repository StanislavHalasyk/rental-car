"use client";

import Image from "next/image";
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

  const formattedMileage =
    car.mileage?.toLocaleString("ru-RU").replace(",", " ") || "0";

  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        {car.img ? (
          <Image
            src={car.img}
            alt={`${car.make} ${car.model}`}
            fill
            sizes="(max-width: 768px) 100vw, 274px"
            className={css.image}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            No image
          </div>
        )}

        <button
          className={css.favoriteBtn}
          onClick={() => car.id && toggleFavorite(car.id)}
          type="button"
        >
          <svg width="18" height="18">
            <use
              href={`/sprite.svg#${isFavorite ? "icon-icon-heart-filled" : "icon-icon-heart-outline"}`}
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
          <span>{car.rentalCompany || "Rental Co"}</span>
          <span className={css.divider}>{car.type}</span>
          <span>{car.model}</span>
          <span>{formattedMileage} km</span>
          {car.accessories?.[0] && <span>{car.accessories[0]}</span>}
        </div>
      </div>

      <button className={css.learnMoreBtn} type="button">
        Read more
      </button>
    </div>
  );
};

export default VehicleCard;
