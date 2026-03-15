import axios from "axios";
import { Car } from "@/types/car";

const instance = axios.create({
  baseURL: "https://car-rental-api.goit.global",
});

export const fetchCars = async (
  page: number = 1,
  limit: number = 12,
  brand: string = "",
) => {
  try {
    const params: any = brand ? { limit: 100, make: brand } : { page, limit };
    const { data } = await instance.get<any>("/cars", { params });

    if (data && data.cars) return data.cars as Car[];
    if (Array.isArray(data)) return data as Car[];

    return [] as Car[];
  } catch (error) {
    console.error("API Error:", error);
    return [] as Car[];
  }
};

export const fetchBrands = async () => {
  try {
    const { data } = await instance.get<string[]>("/brands");
    return data || [];
  } catch (error) {
    return [];
  }
};

export const fetchCarById = async (id: string) => {
  try {
    const { data } = await instance.get<Car>(`/cars/${id}`);
    return data;
  } catch (error) {
    console.error("API Error (ID):", error);
    return null;
  }
};
