"use client";

import { useState, useEffect, useRef } from "react";

interface FiltersProps {
  onSearch: (filters: {
    brand: string;
    price: string;
    mileageFrom: string;
    mileageTo: string;
  }) => void;
}

// Расширенный список брендов для полноты списка
const ALL_BRANDS = [
  "Aston Martin",
  "Audi",
  "BMW",
  "Bentley",
  "Buick",
  "Chevrolet",
  "Chrysler",
  "Ferrari",
  "GMC",
  "HUMMER",
  "Hyundai",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Mercedes-Benz",
  "Mitsubishi",
  "Nissan",
  "Oldsmobile",
  "Pontiac",
  "Subaru",
  "Volvo",
].sort();

export default function Filters({ onSearch }: FiltersProps) {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [mileageFrom, setMileageFrom] = useState("");
  const [mileageTo, setMileageTo] = useState("");
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const brandRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  const prices = Array.from({ length: 15 }, (_, i) => (i + 1) * 10);

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

  const formatMileage = (value: string) => {
    const digits = value.replace(/\D/g, "");
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleSearch = () => {
    onSearch({
      brand,
      price,
      mileageFrom: mileageFrom.replace(/,/g, ""),
      mileageTo: mileageTo.replace(/,/g, ""),
    });
  };

  // Функция сброса
  const handleReset = () => {
    setBrand("");
    setPrice("");
    setMileageFrom("");
    setMileageTo("");
    onSearch({ brand: "", price: "", mileageFrom: "", mileageTo: "" });
  };

  const dropdownTriggerClass =
    "flex items-center justify-between w-full h-[48px] bg-[#F7F7FB] rounded-[14px] px-[18px] text-[18px] leading-[20px] text-[#121417] outline-none cursor-pointer select-none";
  const dropdownMenuClass =
    "absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-[#121417]/5 rounded-[14px] shadow-[0px_4px_36px_0px_rgba(0,0,0,0.02)] z-50 overflow-hidden";
  const dropdownOptionClass =
    "px-[18px] py-[8px] text-[16px] leading-[20px] text-[#121417]/20 hover:text-[#121417] hover:bg-[#F7F7FB] cursor-pointer transition-colors select-none";

  return (
    <div className="flex flex-wrap items-end justify-center gap-[18px] mb-12">
      {/* Brand Select */}
      <div className="flex flex-col gap-2 relative" ref={brandRef}>
        <label className="text-[14px] text-[#8A8A89] font-medium">
          Car brand
        </label>
        <div
          className={`${dropdownTriggerClass} w-[224px]`}
          onClick={() => setIsBrandOpen(!isBrandOpen)}
        >
          <span className={brand ? "" : "text-[#121417]/50"}>
            {brand || "Enter the text"}
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className={`transition-transform ${isBrandOpen ? "rotate-180" : ""}`}
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
          <div className={`${dropdownMenuClass} max-h-[272px] overflow-y-auto`}>
            {}
            <div
              className={dropdownOptionClass}
              onClick={() => {
                setBrand("");
                setIsBrandOpen(false);
              }}
            >
              All brands
            </div>
            {ALL_BRANDS.map((b) => (
              <div
                key={b}
                className={`${dropdownOptionClass} ${brand === b ? "text-[#121417]" : ""}`}
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

      {}
      <div className="flex flex-col gap-2 relative" ref={priceRef}>
        <label className="text-[14px] text-[#8A8A89] font-medium">
          Price/ 1 hour
        </label>
        <div
          className={`${dropdownTriggerClass} w-[190px]`}
          onClick={() => setIsPriceOpen(!isPriceOpen)}
        >
          <span className={price ? "" : "text-[#121417]/50"}>
            {price ? `To ${price}$` : "Choose a price"}
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className={`transition-transform ${isPriceOpen ? "rotate-180" : ""}`}
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
          <div className={`${dropdownMenuClass} max-h-[216px] overflow-y-auto`}>
            {prices.map((p) => (
              <div
                key={p}
                className={`${dropdownOptionClass} ${price === p.toString() ? "text-[#121417]" : ""}`}
                onClick={() => {
                  setPrice(p.toString());
                  setIsPriceOpen(false);
                }}
              >
                {p}
              </div>
            ))}
          </div>
        )}
      </div>

      {}
      <div className="flex flex-col gap-2">
        <label className="text-[14px] text-[#8A8A89] font-medium">
          Car mileage / km
        </label>
        <div className="flex">
          <div className="relative">
            <span className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[18px] text-[#121417]">
              From
            </span>
            <input
              type="text"
              value={mileageFrom}
              onChange={(e) => setMileageFrom(formatMileage(e.target.value))}
              className="w-[160px] h-[48px] bg-[#F7F7FB] border-r border-[#8A8A89]/20 rounded-l-[14px] pl-[72px] pr-[12px] text-[18px] outline-none text-[#121417]"
            />
          </div>
          <div className="relative">
            <span className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[18px] text-[#121417]">
              To
            </span>
            <input
              type="text"
              value={mileageTo}
              onChange={(e) => setMileageTo(formatMileage(e.target.value))}
              className="w-[160px] h-[48px] bg-[#F7F7FB] rounded-r-[14px] pl-[48px] pr-[12px] text-[18px] outline-none text-[#121417]"
            />
          </div>
        </div>
      </div>

      {}
      <div className="flex gap-2">
        <button
          onClick={handleSearch}
          className="w-[136px] h-[48px] bg-[#3470FF] text-white rounded-[12px] font-semibold text-[14px] hover:bg-[#0B44CD] transition-colors"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="h-[48px] px-4 text-[#3470FF] font-medium text-[14px] hover:underline transition-all"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
