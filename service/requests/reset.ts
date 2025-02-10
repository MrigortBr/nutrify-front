import { RoutesAPI } from "@/enum/Routes";
import ApiService, { ApiResponse, dataResponse } from "./api";

export async function requestReset(email: string): Promise<ApiResponse<dataResponse>> {
  return await ApiService.post(RoutesAPI.requestReset, { email });
}

export async function resetPassword(password: string, token: string): Promise<ApiResponse<dataResponse>> {
  return await ApiService.post(RoutesAPI.resetPWD + token, { password });
}
