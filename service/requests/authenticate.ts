import { RoutesAPI } from "@/enum/Routes";
import ApiService, { ApiResponse, dataResponse } from "./api";

export type loginInfo = {
  email: string;
  password: string;
};

export type registerData = {
  name: string;
  email: string;
  password: string;
};

type loginResponse = dataResponse & {
  jwt?: string;
};

export async function logInAPI(loginInfo: loginInfo): Promise<ApiResponse<loginResponse>> {
  return await ApiService.post(RoutesAPI.login, loginInfo);
}

export async function registerAPI(registerData: registerData): Promise<ApiResponse<loginResponse>> {
  return await ApiService.post(RoutesAPI.register, registerData);
}
