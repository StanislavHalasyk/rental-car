"use client";

import { useState, useRef, useEffect } from "react";
import css from "./Filters.module.css";

const brands = [
  "Buick",
  "Volvo",
  "HUMMER",
  "Subaru",
  "Mitsubishi",
  "Nissan",
  "Lincoln",
  "GMC",
  "Hyundai",
  "Mini",
  "Bentley",
  "Mercedes-Benz",
  "Aston Martin",
  "Pontiac",
  "Lamborghini",
  "Audi",
  "BMW",
  "Chevrolet",
  "Chrysler",
  "Kia",
  "Land Rover",
];

const priceOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

interface FiltersProps {
  onSearch: (filters: {
    brand: string;
    price: string;
    mileageFrom: string;
    mileageTo: string;
  }) => void;
}

export default function Filters({ onSearch }: FiltersProps) {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [mileageFrom, setMileageFrom] = useState("");
  const [mileageTo, setMileageTo] = useState("");

  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const brandRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  const formatNumber = (value: string) => {
    const number = value.replace(/\D/g, "");
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (brandRef.current && !brandRef.current.contains(event.target as Node))
        setIsBrandOpen(false);
      if (priceRef.current && !priceRef.current.contains(event.target as Node))
        setIsPriceOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    onSearch({
      brand,
      price,
      mileageFrom: mileageFrom.replace(/,/g, ""),
      mileageTo: mileageTo.replace(/,/g, ""),
    });
  };

  return (
    <div className={css.filtersContainer}>
      {/* BRAND (9 items) */}
      <div className={css.filterGroup}>
        <p className={css.label}>Car brand</p>
        <div
          className={css.customSelectWrapper}
          ref={brandRef}
          style={{ width: "224px" }}
        >
          <div
            className={css.customSelectHeader}
            onClick={() => {
              setIsBrandOpen(!isBrandOpen);
              setIsPriceOpen(false);
            }}
          >
            <span className={!brand ? css.placeholder : ""}>
              {brand || "Choose a brand"}
            </span>
            <svg
              className={isBrandOpen ? css.chevronUp : ""}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="#121417"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {isBrandOpen && (
            <div className={`${css.customSelectList} ${css.brandList}`}>
              {brands.map((b) => (
                <div
                  key={b}
                  className={`${css.customSelectOption} ${brand === b ? css.selectedOption : ""}`}
                  onClick={() => {
                    setBrand(b);
                    setIsBrandOpen(false);
                  }}
                >
                  {b}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* PRICE (6 items) */}
      <div className={css.filterGroup}>
        <p className={css.label}>Price/ 1 hour</p>
        <div
          className={css.customSelectWrapper}
          ref={priceRef}
          style={{ width: "125px" }}
        >
          <div
            className={css.customSelectHeader}
            onClick={() => {
              setIsPriceOpen(!isPriceOpen);
              setIsBrandOpen(false);
            }}
          >
            <span className={!price ? css.placeholder : ""}>
              {price ? `To $${price}` : "Choose a price"}
            </span>
            <svg
              className={isPriceOpen ? css.chevronUp : ""}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="#121417"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {isPriceOpen && (
            <div className={`${css.customSelectList} ${css.priceList}`}>
              {priceOptions.map((p) => (
                <div
                  key={p}
                  className={`${css.customSelectOption} ${price === String(p) ? css.selectedOption : ""}`}
                  onClick={() => {
                    setPrice(String(p));
                    setIsPriceOpen(false);
                  }}
                >
                  {p}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MILEAGE */}
      <div className={css.filterGroup}>
        <p className={css.label}>Car mileage / km</p>
        <div className={css.mileageInputs}>
          <div className={css.inputWrapper}>
            <span className={css.inputLabel}>From</span>
            <input
              className={css.input}
              type="text"
              value={mileageFrom}
              onChange={(e) => setMileageFrom(formatNumber(e.target.value))}
            />
          </div>
          <div className={css.inputWrapper}>
            <span className={css.inputLabel}>To</span>
            <input
              className={css.input}
              type="text"
              value={mileageTo}
              onChange={(e) => setMileageTo(formatNumber(e.target.value))}
            />
          </div>
        </div>
      </div>

      <button className={css.searchBtn} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
