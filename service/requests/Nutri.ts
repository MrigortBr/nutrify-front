import { RoutesAPI } from "@/enum/Routes";
import ApiService, { ApiResponse, dataResponse } from "./api";

export type NutriSimple = { nutri_id: number; name: string; picture: string; price: number; rating: number; number_service: number };

export type NutriLast = {
  user_id: number;
  nutri_id: string;
  rating: number;
  created_at: Date;
  picture: string;
  name: string;
  ratingNutri: string;
  price: number;
  username: string;
};

export type NutriOpen = {
  user_id: number;
  nutri_id: string;
  service_init: Date;
  service_final: Date;
  picture: string;
  name: string;
  username: string;
  finished: boolean;
  rating: number;
  id: number;
  price: number;
};

type NutriResponse = dataResponse & {
  nutriSimple?: NutriSimple[];
  servicesLast?: NutriOpen[];
  servicesOpen?: NutriOpen[];
};

export async function getAllNutri(): Promise<ApiResponse<NutriResponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.get(RoutesAPI.listSimpleNutri, {}, { Authorization: apiKey });
}

export async function setForHour(nutri_id: number, hourid: number, price: string): Promise<ApiResponse<NutriResponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.post(RoutesAPI.markHour, { nutriId: nutri_id, hourId: hourid, price: price}, { Authorization: apiKey });
}

export async function getServices(): Promise<ApiResponse<NutriResponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.get(RoutesAPI.getServices, {}, { Authorization: apiKey });
}

export async function getServicesNutri(date: string): Promise<ApiResponse<NutriResponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.get(RoutesAPI.getServicesNutri + `?date=${date}`, {}, { Authorization: apiKey });
}
