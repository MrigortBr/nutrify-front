import { RoutesAPI } from "@/enum/Routes";
import ApiService, { ApiResponse, dataResponse } from "./api";

export type picture = {
  picture: string;
  id: number;
  likes: number;
  comments: number;
};

export class ProfileUser {
  picture: string;
  username: string;
  followers: number;
  following: number;
  name: string;
  bio: string;
  pictures: picture[];
  iFollow: boolean;
  isMyProfile: boolean;

  constructor(
    picture: string,
    username: string,
    followers: number,
    following: number,
    name: string,
    bio: string,
    pictures: picture[],
    iFollow: boolean,
    isMyProfile: boolean
  ) {
    this.picture = picture;
    this.username = username;
    this.followers = followers;
    this.following = following;
    this.name = name;
    this.bio = bio;
    this.pictures = pictures;
    this.isMyProfile = isMyProfile;
    this.iFollow = iFollow;
  }
}

export type profileResponse = dataResponse & {
  profile?: ProfileUser;
};

export type simpleprofileResponse = dataResponse & {
  simpleProfile?: simpleProfile;
};

export type configPrivacyResponse = dataResponse & {
  privacy?: configPrivacy;
};

export type simpleProfile = {
  picture: string;
  name: string;
  username: string;
};

export type configPrivacy = {
  whosendmessage: PrivacyLevel;
  whoseemyposts: PrivacyLevel;
  whoseemyplanning: PrivacyLevel;
};

export type configUpdate = configPrivacy & {
  email: string;
  password: string;
};

export enum PrivacyLevel {
  Public = "*",
  OnlyFollowers = "onlyFallowers",
  OnlyIFollow = "onlyIFallow",
  FollowersAndIFollow = "fallowersAndIFallow",
  OnlyMe = "onlyI",
}

export async function profileAPI(username: string): Promise<ApiResponse<profileResponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.get(RoutesAPI.profile + username, {}, { Authorization: apiKey });
}

export async function profileMarkedAPI(username: string): Promise<ApiResponse<dataResponse & { picture?: picture[] }>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.get(RoutesAPI.marked + username, {}, { Authorization: apiKey });
}

export async function profileSimpleAPI(): Promise<ApiResponse<simpleprofileResponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.get(RoutesAPI.simpleProfile, {}, { Authorization: apiKey });
}

export async function followAPI(username: string): Promise<ApiResponse<profileResponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.get(RoutesAPI.follow + username, {}, { Authorization: apiKey });
}

export async function unfollowAPI(username: string): Promise<ApiResponse<profileResponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.get(RoutesAPI.unfollow + username, {}, { Authorization: apiKey });
}

export async function updateAPI(user: ProfileUser) {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }
  return await ApiService.put(RoutesAPI.updateProfile, user, { Authorization: apiKey });
}

export async function getConfigAPI(): Promise<ApiResponse<configPrivacyResponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.get(RoutesAPI.getConfigPrivacy, {}, { Authorization: apiKey });
}

export async function updateConfigAPI(data: configUpdate): Promise<ApiResponse<configPrivacyResponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.put(RoutesAPI.updateConfigPrivacy, { data }, { Authorization: apiKey });
}
