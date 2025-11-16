import React from "react";

export default function HistoryCards({
  data,
  onEdit,
  onDelete,
  isIaData = false,
}) {
  const getInfestationColor = (level) => {
    switch (level) {
      case "Baixo":
      case "Saudável":
        return "bg-green-100 text-green-800";
      case "Médio":
      case "Moderado":
        return "bg-yellow-100 text-yellow-800";
      case "Alto":
      case "Nocividade":
        return "bg-orange-100 text-orange-800";
      case "Crítico":
      case "Critico":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Saudável":
      case "Ativo":
        return "bg-green-100 text-green-800";
      case "Estável":
        return "bg-blue-100 text-blue-800";
      case "Em tratamento":
        return "bg-purple-100 text-purple-800";
      case "Crítico":
      case "Critico":
      case "Inativo":
      case "Inferiada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  {item.location}
                </h3>
                <p className="text-gray-500 text-sm">{item.date}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(item)}
                  className={`p-2 rounded-full hover:bg-blue-50 transition-colors ${
                    isIaData
                      ? "opacity-50 cursor-not-allowed"
                      : "text-blue-600 hover:text-blue-800"
                  }`}
                  disabled={isIaData}
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
                  className={`p-2 rounded-full hover:bg-red-50 transition-colors ${
                    isIaData
                      ? "opacity-50 cursor-not-allowed"
                      : "text-red-600 hover:text-red-800"
                  }`}
                  disabled={isIaData}
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
              {/* Sempre mostra umidade (vem da API em ambos os casos) */}
              <div className="flex items-center col-span-2">
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
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
                <div>
                  <p className="text-xs text-gray-500">Umidade</p>
                  <p className="text-sm font-medium">{item.umidade}%</p>
                </div>
              </div>

              {!isIaData && (
                <>
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
                      <p className="text-xs text-gray-500">Proprietário</p>
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
                      <p className="text-xs text-gray-500">Área</p>
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
                      <p className="text-xs text-gray-500">Mudas</p>
                      <p className="text-sm font-medium">{item.qtdMudas}</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Observações:</span> {item.notes}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
