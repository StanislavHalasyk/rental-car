"use client";

import { useState } from "react";
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

const prices = [30, 40, 50, 60, 70, 80, 90, 100, 150];

interface FiltersProps {
  onSearch: (filters: {
    brand: string;
    price: string;
    mileageFrom: string;
    mileageTo: string;
  }) => void;
}

const Filters = ({ onSearch }: FiltersProps) => {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [mileageFrom, setMileageFrom] = useState("");
  const [mileageTo, setMileageTo] = useState("");

  const handleSearch = () => {
    onSearch({ brand, price, mileageFrom, mileageTo });
  };

  return (
    <div className={css.filtersContainer}>
      <div className={css.filterGroup}>
        <label className={css.label}>Car brand</label>
        <select
          className={css.select}
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="">Enter the text</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className={css.filterGroup}>
        <label className={css.label}>Price / 1hr</label>
        <select
          className={css.select}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        >
          <option value="">To $</option>
          {prices.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className={css.filterGroup}>
        <label className={css.label}>Car mileage / km</label>
        <div className={css.mileageInputs}>
          <input
            className={css.inputLeft}
            placeholder="From"
            type="number"
            value={mileageFrom}
            onChange={(e) => setMileageFrom(e.target.value)}
          />
          <input
            className={css.inputRight}
            placeholder="To"
            type="number"
            value={mileageTo}
            onChange={(e) => setMileageTo(e.target.value)}
          />
        </div>
      </div>

      <button className={css.searchBtn} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Filters;
