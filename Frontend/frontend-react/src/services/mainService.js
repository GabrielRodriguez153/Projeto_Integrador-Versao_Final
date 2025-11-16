import { apiOld } from "./api";

export const caseService = {
  async getAllCases() {
    try {
      const response = await apiOld.get("/api/case");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Erro ao buscar casos");
    }
  },
};
