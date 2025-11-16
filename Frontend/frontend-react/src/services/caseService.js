import { apiOld } from "./api";

export const caseService = {
  getAllCases: async () => {
    try {
      const response = await apiOld.get("/api/case");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar casos:", error);
      throw error;
    }
  },

  getCaseById: async (id) => {
    try {
      const response = await apiOld.get(`/api/case/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar caso com ID ${id}:`, error);
      throw error;
    }
  },

  createCase: async (caseData) => {
    try {
      const response = await apiOld.post("/api/case", caseData);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar caso:", error);
      throw error;
    }
  },

  updateCase: async (id, caseData) => {
    try {
      const response = await apiOld.put(`/api/case/${id}`, caseData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar caso com ID ${id}:`, error);
      throw error;
    }
  },
  deleteCase: async (id) => {
    try {
      const response = await apiOld.delete(`/api/case/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar caso:", error);
      throw error;
    }
  },
};
