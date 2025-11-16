import axios from "axios";

const API_BASE_URL_OLD = "http://18.222.232.93:4000";
const API_BASE_URL_NEW = "http://18.118.134.200:3000";

const apiOld = axios.create({
  baseURL: API_BASE_URL_OLD,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 100000,
});

const apiNew = axios.create({
  baseURL: API_BASE_URL_NEW,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 100000,
});

const addInterceptors = (instance) => {
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    console.log("Token no localStorage:", token ? "Sim" : "Não"); // LOG DEBUG
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Header adicionado:", config.headers.Authorization); // LOG DEBUG
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log("Erro de response:", error.response?.status, error.message); // LOG DEBUG
      if (error.code === "ECONNABORTED") {
        throw new Error("Tempo de conexão excedido. Verifique sua internet.");
      }
      if (!error.response) {
        throw new Error("Erro de rede. Verifique sua conexão.");
      }
      return Promise.reject(error);
    }
  );
};

addInterceptors(apiOld);
addInterceptors(apiNew);

export { apiOld, apiNew };
