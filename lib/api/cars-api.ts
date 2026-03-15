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

    if (data && data.cars) return data.cars;
    if (Array.isArray(data)) return data;
    return [];
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
};

export const fetchBrands = async () => {
  try {
    const { data } = await instance.get<string[]>("/brands");
    return data || [];
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};

export const fetchCarById = async (id: string) => {
  try {
    const { data } = await instance.get<Car>(`/cars/${id}`);
    return data;
  } catch (error) {
    return null;
  }
};
