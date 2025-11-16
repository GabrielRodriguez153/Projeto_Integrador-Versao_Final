import { apiNew } from "./api";

export const iaService = {
  getHistorical: async (farmId) => {
    if (!farmId) {
      throw new Error("farmId é obrigatório para buscar histórico");
    }
    try {
      const endpoint = `/ia/historico/${farmId}`;
      console.log("Endpoint chamado:", endpoint);
      const response = await apiNew.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao buscar histórico da IA (API nova):",
        error.response?.status,
        error.message
      );
      throw error;
    }
  },
};
