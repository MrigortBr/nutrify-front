import { RoutesAPI } from "@/enum/Routes";
import ApiService, { ApiResponse, dataResponse } from "./api";

export type comment = {
  id: string;
  username: string;
  comment: string;
  created_at: string;
};

export type ListPost = {
  comments: comment[];
  page: number | string;
  nextPage: boolean;
  commentsNumber: number;
};

export async function getComments(idPost: string, page: number = 0, size: number = 10): Promise<ApiResponse<dataResponse & { comments?: ListPost }>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.get(RoutesAPI.getComments + idPost + `?page=${page}&size=${size}`, {}, { Authorization: apiKey });
}
