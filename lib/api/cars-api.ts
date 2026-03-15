import axios from "axios";
import { Car } from "@/types/car";

const instance = axios.create({
  baseURL: "https://car-rental-api.goit.global",
});

interface FetchCarsParams {
  page?: number;
  limit?: number;
  make?: string;
}

export const fetchCars = async (
  page: number = 1,
  limit: number = 12,
  brand: string = "",
): Promise<Car[]> => {
  try {
    const params: FetchCarsParams = brand
      ? { limit: 100, make: brand }
      : { page, limit };

    const { data } = await instance.get<{ cars?: Car[] } | Car[]>("/cars", {
      params,
    });

    if (data && "cars" in data && Array.isArray(data.cars)) {
      return data.cars;
    }

    if (Array.isArray(data)) {
      return data;
    }

    return [];
  } catch (error) {
    console.error("API Error (fetchCars):", error);
    return [];
  }
};

export const fetchCarById = async (id: string): Promise<Car | null> => {
  try {
    const { data } = await instance.get<Car>(`/cars/${id}`);
    return data;
  } catch (error) {
    console.error("API Error (fetchCarById):", error);
    return null;
  }
};

export const fetchBrands = async (): Promise<string[]> => {
  try {
    const { data } = await instance.get<string[]>("/brands");
    return data || [];
  } catch (error) {
    return [];
  }
};
