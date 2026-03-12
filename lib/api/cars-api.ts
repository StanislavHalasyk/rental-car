import axios from "axios";
import { Car } from "@/types/car";

const instance = axios.create({
  baseURL: "https://car-rental-api.goit.global",
});

export const fetchCars = async (
  page: number = 1,
  limit: number = 12,
  brand?: string,
): Promise<Car[]> => {
  const { data } = await instance.get("/cars", {
    params: {
      page,
      limit,

      ...(brand ? { make: brand } : {}),
    },
  });

  return Array.isArray(data) ? data : data.cars || [];
};

export const fetchCarById = async (id: string): Promise<Car> => {
  const { data } = await instance.get<Car>(`/cars/${id}`);
  return data;
};
