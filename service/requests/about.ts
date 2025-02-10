import { RoutesAPI } from "@/enum/Routes";
import ApiService, { ApiResponse, dataResponse } from "./api";

export type loginInfo = {
  email: string;
  password: string;
};

export type aboutData = {
  name: string;
  version: string;
  author: string;
  license: string;
  repository: {
    url: string;
  };
};

type loginResponse = dataResponse & {
  jwt?: string;
};

export async function aboutAPI(): Promise<ApiResponse<loginResponse>> {
  return await ApiService.get(RoutesAPI.about);
}
