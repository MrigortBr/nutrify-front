import { RoutesAPI } from "@/enum/Routes";
import ApiService, { ApiResponse, dataResponse } from "./api";

export type PublishData = {
  image: string;
  caption: string;
  markers: string[];
  canSee: string;
  canComment: string;
};

export async function publishAPI(publishData: PublishData): Promise<ApiResponse<dataResponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.post(RoutesAPI.publish, publishData, { Authorization: apiKey });
}
