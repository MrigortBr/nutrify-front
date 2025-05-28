import { RoutesAPI } from "@/enum/Routes";
import ApiService, { ApiResponse, dataResponse } from "./api";
import React, { useState } from "react";

export type Revenue = {
  id: number;
  picture: string;
  name: string;
  nameType: string;
  dateInit: string;
  dateFinal: string;
  kcal: number;
  recipe: string;
};

type NutriResponse = dataResponse & {
  revenue?: Revenue[];
  id?: number;
};

export async function GetRevenues(): Promise<ApiResponse<NutriResponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.get(RoutesAPI.GetRevenues, {}, { Authorization: apiKey });
}

export async function getRevenueUser(userId: number, date: string, id: number): Promise<ApiResponse<NutriResponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.get(RoutesAPI.getRevenueUser + userId + "/" + date + "/" + id, {}, { Authorization: apiKey });
}

export async function createRevenue(revenue: Revenue): Promise<ApiResponse<NutriResponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.post(RoutesAPI.createRevenue, { revenue }, { Authorization: apiKey });
}

export async function createRevenueUser(revenue: Revenue[], userid: number): Promise<ApiResponse<NutriResponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.post(RoutesAPI.createRevenueUser + userid, { revenue }, { Authorization: apiKey });
}

export async function updateRevenue(revenue: Revenue): Promise<ApiResponse<NutriResponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.put(RoutesAPI.updateRevenue, { revenue }, { Authorization: apiKey });
}

export async function deleteRevenue(id: number): Promise<ApiResponse<NutriResponse>> {
  const apiKey = localStorage.getItem("token");

  if (!apiKey) {
    return {
      success: false,
      data: { message: "Você precisa estar autenticado para isso" },
    };
  }

  return await ApiService.delete(RoutesAPI.deleteRevenue + id, {}, { Authorization: apiKey });
}
