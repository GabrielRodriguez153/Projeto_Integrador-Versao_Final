import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import { PopupConfirmarEdicao } from "../components/PopupConfirmarEdicao";
import { PopupConfirmarExclusao } from "../components/PopupConfirmarExclusao";
import { caseService } from "../services/caseService";
import { iaService } from "../services/iaService";

const WebCard = ({ item, onEdit, onDelete }) => {
  const getInfestationColor = (level) => {
    switch (level) {
      case "Healthy":
        return "bg-green-100 text-green-800";
      case "Moderate":
        return "bg-yellow-100 text-yellow-800";
      case "Under treatment":
        return "bg-orange-100 text-orange-800";
      case "Critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-blue-100 text-blue-800";
      case "Critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-gray-800">{item.location}</h3>
            <p className="text-gray-500 text-sm">{item.date}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(item)}
              className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getInfestationColor(
              item.infestationLevel
            )}`}
          >
            {item.infestationLevel}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              item.status
            )}`}
          >
            {item.status}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Owner</p>
              <p className="text-sm font-medium">{item.owner}</p>
            </div>
          </div>

          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Area</p>
              <p className="text-sm font-medium">{item.hectares} ha</p>
            </div>
          </div>

          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Seedlings</p>
              <p className="text-sm font-medium">{item.qtdMudas}</p>
            </div>
          </div>

          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h WBC-5 w-5 text-gray-400 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Humidity</p>
              <p className="text-sm font-medium">{item.umidade}%</p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-gray-600 text-sm">
            <span className="font-medium">Observations:</span> {item.notes}
          </p>
        </div>
      </div>
    </div>
  );
};

const IACard = ({ item }) => {
  const getInfestationColor = (level) => {
    switch (level) {
      case "Baixo":
        return "bg-green-100 text-green-800";
      case "Médio":
        return "bg-yellow-100 text-yellow-800";
      case "Alto":
        return "bg-orange-100 text-orange-800";
      case "Crítico":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Saudável":
        return "bg-green-100 text-green-800";
      case "Estável":
        return "bg-blue-100 text-blue-800";
      case "Em tratamento":
        return "bg-purple-100 text-purple-800";
      case "Crítico":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100 hover:shadow-xl transition-all duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-gray-800">{item.location}</h3>
            <p className="text-gray-500 text-sm">{item.date}</p>
          </div>
          <div className="flex space-x-2">
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              AI
            </span>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
              Automatic
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getInfestationColor(
              item.infestationLevel
            )}`}
          >
            {item.infestationLevel}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              item.status
            )}`}
          >
            {item.status}
          </span>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
            <span className="text-sm font-medium text-blue-800">
              AI Confidence
            </span>
            <span className="text-lg font-bold text-blue-800">
              {item.confidence}%
            </span>
          </div>

          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Diagnosis</p>
              <p className="text-sm font-medium">{item.prediction}</p>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Prediction Confidence</span>
              <span className="font-medium">{item.confidence}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  item.confidence >= 80
                    ? "bg-green-500"
                    : item.confidence >= 50
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${item.confidence}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-gray-600 text-sm">
            <span className="font-medium">Analysis:</span> {item.notes}
          </p>
        </div>
      </div>
    </div>
  );
};

const ImageModal = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen || !imageUrl) return null;

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl max-h-full overflow-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-bold text-green-600 pr-3">
            Imagem Analisada
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <img
            src={imageUrl}
            alt="Imagem analisada pela IA"
            className="max-w-full max-h-96 object-contain mx-auto"
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5YzljOWMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjM1ZW0iPkltYWdlbSBuw6NvIGRpc3BvbsOtdmVsPC90ZXh0Pjwvc3ZnPg==";
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default function History() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showConfirmEdit, setShowConfirmEdit] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [webData, setWebData] = useState([]);
  const [mobileData, setMobileData] = useState([]);
  const [activeTab, setActiveTab] = useState("web");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWebData = async () => {
    try {
      const response = await caseService.getAllCases();
      const data = Array.isArray(response) ? response : [];
      const mapped = data.map((item) => ({
        id: item._id || item.id,
        date: item.dataDeteccao || item.date,
        location: item.localizacao || item.location,
        infestationLevel: item.nivelInfestacao || item.infestationLevel,
        status: item.status,
        notes: item.observacoes || item.notes,
        owner: item.proprietario || item.owner,
        hectares: item.hectares || 0,
        qtdMudas: item.qtdMudas || 0,
        umidade: item.umidade || 0,
        source: "web",
      }));
      setWebData(mapped);
    } catch (err) {
      console.error("Erro ao buscar dados Web:", err);
      setWebData([]);
    }
  };

  const fetchMobileData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const farmId = user.farmId || "691a3f08551d69f7901d3e25";

      const response = await iaService.getHistorical(farmId);
      const data = Array.isArray(response) ? response : [];

      const mapped = data.map((item) => ({
        id: item._id || `ia-${Date.now()}-${Math.random()}`,
        date: item.timestamp
          ? new Date(item.timestamp).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        location: item.location || "Localização não especificada",
        infestationLevel: getInfestationLevelFromPrediction(item.prediction),
        status: item.prediction,
        notes: item.confidence
          ? `Análise realizada com ${item.confidence}% de confiança`
          : "Análise IA",
        confidence: item.confidence,
        prediction: item.prediction,
        image: item.image,
        timestamp: item.timestamp,
        source: "mobile",
      }));
      setMobileData(mapped);
    } catch (err) {
      console.error("Erro ao buscar dados Mobile:", err);
      setMobileData([]);
    }
  };

  const getInfestationLevelFromPrediction = (prediction) => {
    if (!prediction) return "Desconhecido";
    const p = prediction.toLowerCase();
    if (p.includes("saudável") || p.includes("healthy")) return "Baixo";
    if (p.includes("doente") || p.includes("doença")) return "Alto";
    if (p.includes("moderado")) return "Médio";
    return "Em análise";
  };

  const loadTabData = async () => {
    setLoading(true);
    setError(null);

    try {
      if (activeTab === "web") {
        setWebData([]);
        await fetchWebData();
      } else if (activeTab === "mobile") {
        setMobileData([]);
        await fetchMobileData();
      }
    } catch (e) {
      setError("Erro ao carregar dados" + e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTabData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "web") loadTabData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (item) => {
    if (item.source === "web") {
      setSelectedItem(item);
      setIsModalOpen(true);
    }
  };

  const requestEditConfirm = async () => {
    try {
      const apiData = {
        dataDeteccao: selectedItem.date,
        localizacao: selectedItem.location,
        nivelInfestacao: selectedItem.infestationLevel,
        status: selectedItem.status,
        observacoes: selectedItem.notes,
        proprietario: selectedItem.owner,
        hectares: selectedItem.hectares,
        qtdMudas: selectedItem.qtdMudas,
        umidade: selectedItem.umidade,
      };
      await caseService.updateCase(selectedItem.id, apiData);
      setShowConfirmEdit(true);
      await fetchWebData();
    } catch (err) {
      setError("Erro ao atualizar caso");
      console.error(err);
    }
  };

  const handleSave = () => {
    setIsModalOpen(false);
    setShowConfirmEdit(false);
  };

  const requestDeleteConfirm = (id) => {
    setItemToDelete(id);
    setShowConfirmDelete(true);
  };

  const handleDelete = async () => {
    try {
      await caseService.deleteCase(itemToDelete);
      setShowConfirmDelete(false);
      setItemToDelete(null);
      await fetchWebData();
    } catch (err) {
      setError("Erro ao deletar caso");
      console.error(err);
    }
  };

  const handleViewImage = (url) => {
    setSelectedImage(url);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
  };

  const currentData = activeTab === "web" ? webData : mobileData;

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-xl">Loading Data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar title="Detection History" />

        <main className="p-8">
          <div className="flex justify-between items-center mt-20 mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {currentData.length} detections found
            </h2>
          </div>

          <div className="mb-6">
            <div className="flex space-x-4 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("web")}
                className={`px-4 py-2 font-medium ${
                  activeTab === "web"
                    ? "border-b-2 border-green-600 text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Web Data
              </button>
              <button
                onClick={() => setActiveTab("mobile")}
                className={`px-4 py-2 font-medium ${
                  activeTab === "mobile"
                    ? "border-b-2 border-green-600 text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Mobile / AI
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentData.map((item) =>
              item.source === "web" ? (
                <WebCard
                  key={item.id}
                  item={item}
                  onEdit={handleEdit}
                  onDelete={requestDeleteConfirm}
                />
              ) : (
                <IACard
                  key={item.id}
                  item={item}
                  onViewImage={handleViewImage}
                />
              )
            )}
          </div>

          {currentData.length === 0 && (
            <div className="bg-white rounded-xl shadow-md p-10 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-xl font-medium text-gray-700">
                Nenhuma detecção encontrada
              </h3>
              <p className="mt-2 text-gray-500">
                {activeTab === "web"
                  ? "Não há dados cadastrados no sistema Web."
                  : "Não há análises realizadas pelo sistema de IA."}
              </p>
            </div>
          )}
        </main>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Edit Detection"
        >
          {selectedItem && (
            <form
              id="edit-form"
              onSubmit={(e) => {
                e.preventDefault();
                requestEditConfirm();
              }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detection Date
                  </label>
                  <input
                    type="date"
                    value={selectedItem.date}
                    onChange={(e) =>
                      setSelectedItem({ ...selectedItem, date: e.target.value })
                    }
                    className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={selectedItem.location}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        location: e.target.value,
                      })
                    }
                    className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Infestation Level
                  </label>
                  <select
                    value={selectedItem.infestationLevel}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        infestationLevel: e.target.value,
                      })
                    }
                    className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
                  >
                    <option value="Healthy">Healthy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Under treatment">Under treatment</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Palm Status
                  </label>
                  <select
                    value={selectedItem.status}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        status: e.target.value,
                      })
                    }
                    className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={selectedItem.notes}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        notes: e.target.value,
                      })
                    }
                    className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Owner
                  </label>
                  <input
                    type="text"
                    value={selectedItem.owner}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        owner: e.target.value,
                      })
                    }
                    className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hectares
                  </label>
                  <input
                    type="number"
                    value={selectedItem.hectares}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        hectares: e.target.value,
                      })
                    }
                    className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seedling Quantity
                  </label>
                  <input
                    type="number"
                    value={selectedItem.qtdMudas}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        qtdMudas: parseInt(e.target.value),
                      })
                    }
                    className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Humidity (%)
                  </label>
                  <input
                    type="number"
                    value={selectedItem.umidade}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        umidade: parseFloat(e.target.value),
                      })
                    }
                    className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
                    min="0"
                    max="100"
                    step="0.1"
                    required
                  />
                </div>
              </div>
            </form>
          )}
        </Modal>

        <ImageModal
          isOpen={isImageModalOpen}
          onClose={closeImageModal}
          imageUrl={selectedImage}
        />

        <PopupConfirmarEdicao
          isOpen={showConfirmEdit}
          onClose={() => setShowConfirmEdit(false)}
          onConfirm={handleSave}
        />
        <PopupConfirmarExclusao
          isOpen={showConfirmDelete}
          onClose={() => setShowConfirmDelete(false)}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
}
