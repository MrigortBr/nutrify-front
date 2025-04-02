import { RoutesAPI } from "@/enum/Routes";
import ApiService, { ApiResponse, dataResponse } from "./api";

export type CRN = "CRN-1" | "CRN-2" | "CRN-3" | "CRN-4" | "CRN-5" | "CRN-6" | "CRN-7" | "CRN-8" | "CRN-9" | "CRN-10" | "CRN-11";

export type loginInfo = {
  email: string;
  password: string;
};

export type registerData = {
  name: string;
  email: string;
  password: string;
};

export type registerNutri = registerData & {
  typeCRN: CRN;
  crn: string;
};

type loginResponse = dataResponse & {
  jwt?: string;
  type?: string;
};

export async function logInAPI(loginInfo: loginInfo): Promise<ApiResponse<loginResponse>> {
  return await ApiService.post(RoutesAPI.login, loginInfo);
}

export async function registerAPI(registerData: registerData): Promise<ApiResponse<loginResponse>> {
  return await ApiService.post(RoutesAPI.register, registerData);
}

export async function registerNutriAPI(registerData: registerNutri): Promise<ApiResponse<loginResponse>> {
  return await ApiService.post(RoutesAPI.registerNutri, registerData);
}
