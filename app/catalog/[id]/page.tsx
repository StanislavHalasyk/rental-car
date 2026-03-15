"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { fetchCarById } from "@/lib/api/cars-api";
import { Car } from "@/types/car";

export default function CarDetailsPage() {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCarById(id as string)
        .then((data) => {
          if (data) setCar(data);
          else setError(true);
        })
        .catch(() => setError(true));
    }
  }, [id]);

  if (error)
    return (
      <div className="p-20 text-center text-red-500">
        Failed to load car details.
      </div>
    );
  if (!car)
    return (
      <div className="p-20 text-center text-[#121417] text-xl font-medium">
        Loading...
      </div>
    );

  const addressParts = car.address?.split(",") || [];
  const city = addressParts[1]?.trim() || "";
  const country = addressParts[2]?.trim() || "";
  const conditions =
    typeof car.rentalConditions === "string"
      ? car.rentalConditions.split("\n")
      : [];
  const mileageFormatted = car.mileage
    ? car.mileage.toLocaleString("ru-RU")
    : "0";
  const displayId = car.id
    ? car.id.length > 8
      ? car.id.slice(-4)
      : car.id
    : "N/A";

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-10 flex flex-col md:flex-row gap-16">
      <div className="w-full md:w-1/2">
        <div className="relative w-full h-[450px] rounded-[20px] overflow-hidden mb-8 bg-[#F3F3F2]">
          <Image
            src={
              car.img ||
              (car as Car & { photo?: string }).photo ||
              "/placeholder-car.png"
            }
            alt={`${car.make || "Car"} ${car.model || ""}`}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="bg-white border border-[#121417]/5 rounded-[20px] p-10">
          <h3 className="text-[20px] font-semibold mb-2 text-[#121417]">
            Book your car now
          </h3>
          <p className="text-[#121417]/50 mb-6 text-[14px]">
            Stay connected! We are always ready to help you.
          </p>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Name*"
              className="w-full h-[56px] bg-[#F7F7FB] rounded-[12px] px-4 outline-none"
              required
            />
            <input
              type="email"
              placeholder="Email*"
              className="w-full h-[56px] bg-[#F7F7FB] rounded-[12px] px-4 outline-none"
              required
            />
            <input
              type="text"
              placeholder="Booking date"
              className="w-full h-[56px] bg-[#F7F7FB] rounded-[12px] px-4 outline-none"
            />
            <textarea
              placeholder="Comment"
              className="w-full h-[120px] bg-[#F7F7FB] rounded-[12px] p-4 outline-none resize-none"
            />
            <button
              type="submit"
              className="w-[160px] h-[48px] bg-[#3470FF] text-white rounded-[12px] font-semibold hover:bg-[#0B44CD] cursor-pointer mt-4 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-[32px] font-semibold text-[#121417]">
              <span className="text-[#3470FF]">{car.make}</span> {car.model},{" "}
              {car.year}
            </h1>
            <span className="text-[#121417]/20 text-[14px] mt-4 font-light">
              Id: {displayId}
            </span>
          </div>
          <p className="text-[#121417]/50 mb-4 flex gap-4 text-[14px] items-center">
            <span>
              📍 {city}, {country}
            </span>
            <span className="w-[1px] h-[16px] bg-[#121417]/10" />
            <span>Mileage: {mileageFormatted} km</span>
          </p>
          <p className="text-[32px] font-bold text-[#121417] mb-6">
            ${car.rentalPrice?.replace(/\D/g, "")}
          </p>
          <p className="text-[16px] leading-[24px] text-[#121417] font-light">
            {car.description}
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-[18px] font-semibold mb-4 text-[#121417]">
            Rental Conditions:
          </h3>
          <div className="flex flex-wrap gap-2">
            {conditions.map((c, i) => {
              const parts = c.split(/(\d+)/);
              return (
                <div
                  key={i}
                  className="bg-[#F9F9F9] px-3 py-1.5 rounded-[35px] text-[12px] text-[#363535]"
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
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-[18px] font-semibold mb-4 text-[#121417]">
            Car Specifications:
          </h3>
          <div className="grid grid-cols-1 gap-4 text-[#121417] text-[14px]">
            <p>
              📅 Year: <span className="font-medium">{car.year}</span>
            </p>
            <p>
              🚗 Type: <span className="font-medium">{car.type}</span>
            </p>
            <p>
              ⛽ Fuel Consumption:{" "}
              <span className="font-medium">{car.fuelConsumption}</span>
            </p>
            <p>
              ⚙️ Engine Size:{" "}
              <span className="font-medium">{car.engineSize}</span>
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-[18px] font-semibold mb-4 text-[#121417]">
            Accessories and functionalities:
          </h3>
          <div className="flex flex-wrap gap-x-3 gap-y-2 text-[#121417]/50 text-[12px]">
            {[...(car.accessories || []), ...(car.functionalities || [])].map(
              (item, i, arr) => (
                <span key={i} className="flex items-center">
                  {item}{" "}
                  {i !== arr.length - 1 && (
                    <span className="mx-2 opacity-20">|</span>
                  )}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
