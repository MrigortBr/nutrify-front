import { RoutesAPI } from "@/enum/Routes";
import ApiService, { ApiResponse, dataResponse } from "./api";
export enum PostStatus {
  ALL = "*",
  ONLY_FOLLOWERS = "onlyFallowers",
  ONLY_I_FOLLOW = "onlyIFallow",
  FOLLOWERS_AND_I_FOLLOW = "fallowersAndIFallow",
}

export enum VisibilityStatus {
  ALL = "*",
  ONLY_FOLLOWERS = "onlyFallowers",
  ONLY_I_FOLLOW = "onlyIFallow",
  FOLLOWERS_AND_I_FOLLOW = "fallowersAndIFallow",
  DRAFT = "draft",
  ARCHIVED = "archived",
  PUBLISHED = "published",
}

export interface Post {
  id: number;
  user_id: number;
  post_commentable: PostStatus;
  visibility: VisibilityStatus;
  picture: Buffer; // Representa o campo BYTEA no PostgreSQL
  caption: string;
  posted_at?: Date | null;
  created_at: Date;
  userMark: string[];
  tags?: string[]; // O campo de tags é opcional
}

type postResponse = dataResponse & {
  post?: Post;
};

type postSimpleResponse = dataResponse & {
  simplePost?: SimplePost;
};

export type comments = {
  pictureUser: string;
  username: string;
  comment: string;
};

export interface SimplePost {
  pictureUser: string; //
  username: string; //
  iCanComment: boolean;
  iLike: boolean;
  commentState: string;
  picture: string; //
  caption: string; //
  created_at: Date; //
  userMark: string[];
  likes: number;
  commentsNumber: number;
  comments: comments[];
}

export interface SimplePostNew {
  id: string;
  pictureUser: string; //
  username: string; //
  iCanComment: boolean;
  iLike: boolean;
  ilike: boolean;
  commentState: string;
  picture: string; //
  caption: string; //
  created_at: Date; //
  userMark: string[];
  likes: number;
  commentsnumber: number;
  comments: comments[];
}

export type updatePost = {
  caption: string;
  userMark: string[];
  post_commentable: PostStatus;
  visibility: VisibilityStatus;
  tags: string[];
};

export async function getMyPostForEditAPI(idPost: number): Promise<ApiResponse<postResponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.get(RoutesAPI.getMyPostForEditAPI + idPost, {}, { Authorization: apiKey });
}

export async function removeMyPost(id: string) {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.delete(RoutesAPI.removeMyPost + id, {}, { Authorization: apiKey });
}

export async function updatePost(data: updatePost, idPost: string) {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.put(RoutesAPI.updatePost + idPost, { data }, { Authorization: apiKey });
}

export async function likeAPI(idPost: string) {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.get(RoutesAPI.likeRoute + idPost, {}, { Authorization: apiKey });
}

export async function getSimplePost(idPost: string): Promise<ApiResponse<postSimpleResponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.get(RoutesAPI.simplePost + idPost, {}, { Authorization: apiKey });
}

export async function sendCommentAPI(idPost: string, comment: string): Promise<ApiResponse<postSimpleResponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.post(RoutesAPI.comment + idPost, { comment: comment }, { Authorization: apiKey });
}

export async function homeAPI(): Promise<ApiResponse<dataResponse & { simplePost?: SimplePostNew[] }>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.get(RoutesAPI.foryou, {}, { Authorization: apiKey });
}
