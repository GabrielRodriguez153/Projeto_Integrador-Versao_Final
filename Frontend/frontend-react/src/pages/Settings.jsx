import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { PopupConfirmarExclusaoConta } from "../components/PopupConfirmarExclusaoConta";
import { PopupConfirmarPerfil } from "../components/PopupConfirmarPerfil";
import { authService } from "../services/authService";

export default function Settings() {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const currentUserIdRef = useRef(currentUser?.id);

  const [userData, setUserData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    state: "",
    city: "",
    zipCode: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmSave, setShowConfirmSave] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const hasUserChanged = currentUser?.id !== currentUserIdRef.current;

    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (hasUserChanged || loading) {
      currentUserIdRef.current = currentUser.id;

      setUserData({
        fullName: currentUser.username || "",
        phone: currentUser.phone || "",
        email: currentUser.email || "",
        password: "",
        address: currentUser.address?.logradouro || "",
        state: currentUser.address?.estado || "",
        city: currentUser.address?.cidade || "",
        zipCode: currentUser.address?.cep || "",
      });
      setLoading(false);
    }
  }, [currentUser, navigate, loading]);

  const validatePassword = (password) => {
    if (password && password.length < 8) {
      setPasswordError("The password must be at least 8 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const resetStates = () => {
    setIsEditing(false);
    setShowPassword(false);
    setShowConfirmSave(false);
    setShowConfirmDelete(false);
  };

  useEffect(() => {
    return () => {
      resetStates();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmSave(true);
  };

  const confirmSave = async () => {
    if (userData.password && !validatePassword(userData.password)) {
      return;
    }
    try {
      const updateData = {
        username: userData.fullName,
        phone: userData.phone,
        email: userData.email,
        address: {
          logradouro: userData.address,
          cidade: userData.city,
          estado: userData.state,
          cep: userData.zipCode,
        },
      };

      if (userData.password) {
        updateData.password = userData.password;
      }

      await authService.updateProfile(currentUser.id, updateData);
      setIsEditing(false);
      setShowPassword(false);
      setShowConfirmSave(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleDeleteAccount = () => {
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await authService.deleteAccount(currentUser.id);
      window.location.href = "/";
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="ml-64 flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading Data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-64 flex-1 overflow-auto">
        <Navbar title="Settings" />

        <div className="p-6 max-w-4xl mx-auto mt-18">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
              <p className="text-gray-500 text-sm">
                Manage your personal information
              </p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-md cursor-pointer focus:outline-none"
            >
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-emerald-600 to-green-700">
              <h2 className="text-xl font-bold text-neutral-50">
                Personal Data
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="fullName"
                        value={userData.fullName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg font-medium">
                        {userData.fullName}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Phone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg font-medium">
                        {userData.phone}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      E-mail
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg font-medium">
                        {userData.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Password
                    </label>
                    {isEditing ? (
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={userData.password}
                          onChange={(e) => {
                            handleChange(e);
                            validatePassword(e.target.value);
                          }}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 pr-10 focus:outline-none"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 px-3 flex items-center"
                          onClick={togglePasswordVisibility}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 ${
                              showPassword ? "text-green-600" : "text-gray-400"
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            {showPassword ? (
                              <>
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                />
                              </>
                            ) : (
                              <>
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </>
                            )}
                          </svg>
                        </button>
                        {passwordError && (
                          <p className="text-red-500 text-sm mt-1">
                            {passwordError}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg font-medium flex justify-between items-center">
                        <span>••••••••</span>
                        <button
                          type="button"
                          className="text-green-600 hover:text-green-800 text-sm"
                          onClick={() => {
                            setIsEditing(true);
                            setShowPassword(false);
                          }}
                        >
                          Change Password
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-6 border-t border-gray-100">
                <div className="p-1 mb-5">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Address Data
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        Address
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="address"
                          value={userData.address}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg font-medium">
                          {userData.address}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        City
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="city"
                          value={userData.city}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg font-medium">
                          {userData.city}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        State
                      </label>
                      {isEditing ? (
                        <select
                          name="state"
                          value={userData.state}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 bg-white focus:outline-none"
                        >
                          <option value="Acre (AC)">Acre (AC)</option>
                          <option value="Alagoas (AL)">Alagoas (AL)</option>
                          <option value="Amapá (AP)">Amapá (AP)</option>
                          <option value="Amazonas (AM)">Amazonas (AM)</option>
                          <option value="Bahia (BA)">Bahia (BA)</option>
                          <option value="Ceará (CE)">Ceará (CE)</option>
                          <option value="Distrito Federal (DF)">
                            Distrito Federal (DF)
                          </option>
                          <option value="Espírito Santo (ES)">
                            Espírito Santo (ES)
                          </option>
                          <option value="Goiás (GO)">Goiás (GO)</option>
                          <option value="Maranhão (MA)">Maranhão (MA)</option>
                          <option value="Mato Grosso (MT)">
                            Mato Grosso (MT)
                          </option>
                          <option value="Mato Grosso do Sul (MS)">
                            Mato Grosso do Sul (MS)
                          </option>
                          <option value="Minas Gerais (MG)">
                            Minas Gerais (MG)
                          </option>
                          <option value="Pará (PA)">Pará (PA)</option>
                          <option value="Paraíba (PB)">Paraíba (PB)</option>
                          <option value="Paraná (PR)">Paraná (PR)</option>
                          <option value="Pernambuco (PE)">
                            Pernambuco (PE)
                          </option>
                          <option value="Piauí (PI)">Piauí (PI)</option>
                          <option value="Rio de Janeiro (RJ)">
                            Rio de Janeiro (RJ)
                          </option>
                          <option value="Rio Grande do Norte (RN)">
                            Rio Grande do Norte (RN)
                          </option>
                          <option value="Rio Grande do Sul (RS)">
                            Rio Grande do Sul (RS)
                          </option>
                          <option value="Rondônia (RO)">Rondônia (RO)</option>
                          <option value="Roraima (RR)">Roraima (RR)</option>
                          <option value="Santa Catarina (SC)">
                            Santa Catarina (SC)
                          </option>
                          <option value="São Paulo (SP)">São Paulo (SP)</option>
                          <option value="Sergipe (SE)">Sergipe (SE)</option>
                          <option value="Tocantins (TO)">Tocantins (TO)</option>
                        </select>
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg font-medium">
                          {userData.state}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        ZIP Code
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="zipCode"
                          value={userData.zipCode}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg font-medium">
                          {userData.zipCode}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md focus:outline-none cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>

          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-emerald-600 to-green-700">
              <h2 className="text-xl font-bold text-neutral-50">
                Security Settings
              </h2>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-center  border-t border-gray-100">
                <div>
                  <h3 className="font-medium text-red-600">Delete Account</h3>
                  <p className="text-red-500 text-sm mt-1">
                    This action is permanent and cannot be undone
                  </p>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-white border border-red-200 rounded-lg text-red-600 hover:bg-red-50 text-sm"
                >
                  Delete My Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PopupConfirmarPerfil
        isOpen={showConfirmSave}
        onClose={() => setShowConfirmSave(false)}
        onConfirm={confirmSave}
      />

      <PopupConfirmarExclusaoConta
        isOpen={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
