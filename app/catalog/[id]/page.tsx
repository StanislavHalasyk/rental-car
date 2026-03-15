"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { fetchCarById } from "@/lib/api/cars-api";
import { Car } from "@/types/car";
import css from "./CarDetails.module.css";

export default function CarDetailsPage() {
  const params = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  // Состояние для инпута даты
  const [dateInputType, setDateInputType] = useState("text");

  useEffect(() => {
    if (params?.id) {
      fetchCarById(params.id as string)
        .then((data) => setCar(data))
        .catch((err) => console.error("Error fetching car:", err))
        .finally(() => setLoading(false));
    }
  }, [params?.id]);

  if (loading)
    return (
      <p className="text-center mt-20 text-xl text-[var(--color-primary)] animate-pulse">
        Loading car details...
      </p>
    );
  if (!car) return <p className="text-center mt-20 text-xl">Car not found.</p>;

  let conditions: string[] = [];
  if (typeof car.rentalConditions === "string") {
    conditions = car.rentalConditions.includes("\n")
      ? car.rentalConditions.split("\n")
      : car.rentalConditions.split(",").map((c) => c.trim());
  } else if (Array.isArray(car.rentalConditions)) {
    conditions = car.rentalConditions;
  }

  const addressParts = car.address?.split(",") || [];
  const city = addressParts[addressParts.length - 2]?.trim() || "N/A";
  const country = addressParts[addressParts.length - 1]?.trim() || "N/A";

  const formattedPrice = car.rentalPrice?.includes("$")
    ? car.rentalPrice
    : `$${car.rentalPrice || ""}`;

  const formattedMileage = car.mileage
    ?.toLocaleString("en-US")
    .replace(/,/g, " ");
  const shortId = car.id ? String(car.id).slice(0, 4) : "";

  return (
    <section className={css.container}>
      {/* ЛЕВАЯ КОЛОНКА */}
      <div className={css.leftCol}>
        <div className={css.imageWrapper}>
          <Image
            src={car.img || ""}
            alt={`${car.brand} ${car.model}`}
            fill
            className={css.image}
          />
        </div>

        <div className={css.formCard}>
          <h3 className={css.formTitle}>Book your car now</h3>
          <p className={css.formSubtitle}>
            Stay connected! We are always ready to help you.
          </p>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Name*"
              className={css.input}
              required
            />
            <input
              type="email"
              placeholder="Email*"
              className={css.input}
              required
            />
            {/* Инпут даты с переключением типа */}
            <input
              type={dateInputType}
              placeholder="Booking date"
              className={css.input}
              onFocus={() => setDateInputType("date")}
              onBlur={(e) => {
                if (!e.target.value) setDateInputType("text");
              }}
              required
            />
            <textarea placeholder="Comment" className={css.input}></textarea>
            <button type="submit" className={css.submitBtn}>
              Send
            </button>
          </form>
        </div>
      </div>

      {/* ПРАВАЯ КОЛОНКА */}
      <div className={css.rightCol}>
        <div>
          <h1 className={css.headerTitle}>
            {car.brand} {car.model}, {car.year}{" "}
            <span className={css.idTag}>Id: {shortId}</span>
          </h1>
          <div className={css.meta}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <svg className={css.icon} width="16" height="16">
                <use href="/sprite.svg#icon-icon-location" />
              </svg>
              {city}, {country}
            </span>
            <span className={css.headerSpan}>
              Mileage: {formattedMileage} km
            </span>
          </div>
        </div>

        <div className={css.price}>{formattedPrice}</div>

        <p className={css.description}>{car.description}</p>

        {conditions.length > 0 && (
          <div style={{ marginBottom: "110px" }}>
            <h4 className={css.sectionTitle}>Rental Conditions:</h4>
            <div className={css.list}>
              {conditions.map((cond, i) => (
                <div key={i} className={css.listItem}>
                  <svg className={css.conditionIcon} width="16" height="16">
                    <use href="/sprite.svg#icon-icon-check" />
                  </svg>
                  {cond}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginBottom: "110px" }}>
          <h4 className={css.sectionTitle}>Car Specifications:</h4>
          <div className={css.list}>
            <div className={css.listItem}>
              <svg className={css.icon} width="16" height="16">
                <use href="/sprite.svg#icon-icon-calendar" />
              </svg>
              Year: {car.year}
            </div>
            <div className={css.listItem}>
              <svg className={css.icon} width="16" height="16">
                <use href="/sprite.svg#icon-icon-car" />
              </svg>
              Type: {car.type}
            </div>
            <div className={css.listItem}>
              <svg className={css.icon} width="16" height="16">
                <use href="/sprite.svg#icon-icon-fuel" />
              </svg>
              Fuel Consumption: {car.fuelConsumption}
            </div>
            <div className={css.listItem}>
              <svg className={css.icon} width="16" height="16">
                <use href="/sprite.svg#icon-icon-settings" />
              </svg>
              Engine Size: {car.engineSize}
            </div>
          </div>
        </div>

        <div>
          <h4 className={css.sectionTitle}>Accessories and functionalities:</h4>
          <div className={css.list}>
            {[...(car.accessories || []), ...(car.functionalities || [])].map(
              (item, i) => (
                <div key={i} className={css.listItem}>
                  <svg className={css.conditionIcon} width="16" height="16">
                    <use href="/sprite.svg#icon-icon-check" />
                  </svg>
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
