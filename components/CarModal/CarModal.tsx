"use client";

import Image from "next/image";
import { Car } from "@/types/car";

interface CarModalProps {
  car: Car;
  onClose: () => void;
}

export default function CarModal({ car, onClose }: CarModalProps) {
  const addressParts = car.address.split(",");
  const city = addressParts[1]?.trim() || "";
  const country = addressParts[2]?.trim() || "";
  const conditions =
    typeof car.rentalConditions === "string"
      ? car.rentalConditions.split("\n")
      : [];
  const mileageFormatted = car.mileage.toLocaleString("en-US");

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#121417]/50 backdrop-blur-[2px] p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-[541px] max-h-[90vh] overflow-y-auto rounded-[24px] p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer hover:rotate-90 transition-transform"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#121417"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <div className="relative w-full h-[248px] rounded-[14px] overflow-hidden mb-3.5 bg-[#F3F3F2]">
          <Image
            src={car.img || car.photo || "/placeholder-car.png"}
            alt={car.make || "Car rental"}
            fill
            className="object-cover"
          />
        </div>
        <h2 className="text-[18px] font-medium mb-2">
          {car.make || "Car"}{" "}
          <span className="text-[#3470FF]">{car.model}</span>, {car.year}
        </h2>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[#121417]/50 text-[12px] mb-3.5">
          <span>{city}</span> | <span>{country}</span> |{" "}
          <span>Id: {car.id}</span> | <span>Year: {car.year}</span> |{" "}
          <span>Type: {car.type}</span>
          <span>Fuel: {car.fuelConsumption}</span> |{" "}
          <span>Engine: {car.engineSize}</span>
        </div>
        <p className="text-[14px] leading-[20px] mb-6">{car.description}</p>
        <div className="mb-6">
          <h3 className="text-[14px] font-medium mb-2">
            Accessories and functionalities:
          </h3>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[#121417]/50 text-[12px]">
            {[...car.accessories, ...car.functionalities].map((item, i) => (
              <span key={i}>
                {item}{" "}
                {i !==
                  car.accessories.length + car.functionalities.length - 1 &&
                  "|"}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-[14px] font-medium mb-2">Rental Conditions:</h3>
          <div className="flex flex-wrap gap-2">
            {conditions.map((c, i) => {
              const parts = c.split(/(\d+)/);
              return (
                <div
                  key={i}
                  className="bg-[#F9F9F9] px-3 py-1.5 rounded-[35px] text-[12px]"
                >
                  {parts.map((p, j) =>
                    /\d+/.test(p) ? (
                      <span key={j} className="text-[#3470FF] font-semibold">
                        {p}
                      </span>
                    ) : (
                      p
                    ),
                  )}
                </div>
              );
            })}
            <div className="bg-[#F9F9F9] px-3 py-1.5 rounded-[35px] text-[12px]">
              Mileage:{" "}
              <span className="text-[#3470FF] font-semibold">
                {mileageFormatted}
              </span>
            </div>
            <div className="bg-[#F9F9F9] px-3 py-1.5 rounded-[35px] text-[12px]">
              Price:{" "}
              <span className="text-[#3470FF] font-semibold">
                {car.rentalPrice}
              </span>
            </div>
          </div>
        </div>
        <a
          href="tel:+380730000000"
          className="inline-block px-[50px] py-[12px] bg-[#3470FF] text-white rounded-[12px] font-semibold hover:bg-[#0B44CD] cursor-pointer text-center"
        >
          Rental car
        </a>
      </div>
    </div>
  );
}
