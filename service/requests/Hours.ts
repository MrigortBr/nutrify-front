import { RoutesAPI } from "@/enum/Routes";
import ApiService, { ApiResponse, dataResponse } from "./api";

export type HoursObject = {
  id: number;
  nutri_id: number;
  service_final: string;
  service_init: string;
  void: boolean;
};

type HoursReponse = dataResponse & {
  hours?: HoursObject[];
  id?: number;
};

export async function getHours(date: string): Promise<ApiResponse<HoursReponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.get(RoutesAPI.getHours + date, {}, { Authorization: apiKey });
}

export async function getHoursByid(id: number, date: string): Promise<ApiResponse<HoursReponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.get(RoutesAPI.getHours + date + "/" + id, {}, { Authorization: apiKey });
}

export async function createHours(hours: HoursObject): Promise<ApiResponse<HoursReponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.post(RoutesAPI.createHours, { hours }, { Authorization: apiKey });
}

export async function updateHours(hours: HoursObject): Promise<ApiResponse<HoursReponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.put(RoutesAPI.updateHours, { hours }, { Authorization: apiKey });
}

export async function deleteHours(id: number): Promise<ApiResponse<HoursReponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.delete(RoutesAPI.deleteHours + id, {}, { Authorization: apiKey });
}
