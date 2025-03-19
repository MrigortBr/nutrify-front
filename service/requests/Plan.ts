import { RoutesAPI } from "@/enum/Routes";
import ApiService, { ApiResponse, dataResponse } from "./api";
import { SimplePost } from "./Post";

export type planFood = {
  id: number;
  dateInit: Date;
  dateFinal: Date;
  name: string;
  nameType: string;
  recipe: string;
  picture: string;
  marked: boolean;
};

type planCreate = dataResponse & {
  idPlan?: number;
  plans?: planFood[];
};

export async function insertPlanAPI(data: planFood): Promise<ApiResponse<planCreate>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.post(RoutesAPI.planInsert, data, { Authorization: apiKey });
}

export async function getPlanAPI(username: string, date: string): Promise<ApiResponse<planCreate>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.get(RoutesAPI.planList + username, { date }, { Authorization: apiKey });
}

export async function updateAPI(plan: planFood): Promise<ApiResponse<planCreate>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.put(RoutesAPI.planInsert, { plan }, { Authorization: apiKey });
}

export async function deleteAPI(planid: number): Promise<ApiResponse<planCreate>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.delete(RoutesAPI.planDelete + planid, {}, { Authorization: apiKey });
}

export async function markedAPI(planid: number, marked: boolean): Promise<ApiResponse<planCreate>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.put(RoutesAPI.planMarked + planid, { marked }, { Authorization: apiKey });
}
