import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type dataResponse = {
  description?: string;
  message: string;
  stack?: string;
  statusCode?: number;
};

class AppService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.API_URL || "http://localhost:2000",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async get<T>(url: string, params?: object): Promise<ApiResponse<dataResponse>> {
    return this.ThenCatch(this.api.get(url, { params }));
  }

  async post<T>(url: string, data?: object): Promise<ApiResponse<dataResponse>> {
    return this.ThenCatch(this.api.post(url, data)).catch((e) => {
      console.log("catch");
      return e;
    });
  }

  async put<T>(url: string, data?: object): Promise<ApiResponse<dataResponse>> {
    return this.ThenCatch(this.api.put(url, data));
  }

  async delete<T>(url: string): Promise<ApiResponse<dataResponse>> {
    return this.ThenCatch(this.api.delete(url));
  }

  private ThenCatch(res: Promise<AxiosResponse<dataResponse, dataResponse>>) {
    return res
      .then((resThen) => {
        const result: ApiResponse<dataResponse> = {
          success: true,
          data: resThen.data,
        };
        return result;
      })
      .catch((resCatch: AxiosError) => {
        const result: ApiResponse<dataResponse> = {
          success: false,
          data: resCatch.response?.data as dataResponse,
          error: resCatch.message,
        };
        return result;
      });
  }
}

const ApiService = new AppService();

export default ApiService;
