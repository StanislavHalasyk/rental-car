import axios from "axios";
import { Car } from "@/types/car";

const instance = axios.create({
  baseURL: "https://car-rental-api.goit.global",
});

export const fetchCars = async (
  page: number = 1,
  limit: number = 12,
): Promise<Car[]> => {
  const { data } = await instance.get("/cars", {
    params: {
      page,
      limit,
    },
  });

  return Array.isArray(data) ? data : data.cars || [];
};

export const fetchBrands = async (): Promise<string[]> => {
  const { data } = await instance.get("/brands");
  return data;
};
