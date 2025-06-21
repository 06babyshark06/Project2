// src/services/authService.js
import axios from "axios";

const KEYCLOAK_URL =
  "http://localhost:8080/realms/violation-system/protocol/openid-connect/token";
const CLIENT_ID = "react-app";
const STORAGE_KEY = "token_data";
const BACKEND_URL = "http://localhost:8888/api/v1";

export const login = async (username, password, rememberMe) => {
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("client_id", CLIENT_ID);
  params.append("username", username);
  params.append("password", password);

  const res = await axios.post(KEYCLOAK_URL, params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const data = res.data;
  storeTokenData(data, rememberMe);

  try {
    const userRes = await axios.get(`${BACKEND_URL}/users/token/${data.access_token}`, {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });

    const user = userRes.data;
    storeUserData(user, rememberMe);
  } catch (err) {
    console.error("Failed to fetch user info:", err);
  }

  return data;
};

export const storeUserData = (user, rememberMe) => {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem("user", JSON.stringify(user));
};

export const getUserData = () => {
  return (
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user")) ||
    null
  );
};

export const clearUserData = () => {
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
};


export const refreshToken = async () => {
  const tokenData = getTokenData();
  if (!tokenData?.refresh_token) throw new Error("No refresh token");

  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("client_id", CLIENT_ID);
  params.append("refresh_token", tokenData.refresh_token);

  const res = await axios.post(KEYCLOAK_URL, params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const data = res.data;
  storeTokenData(data, tokenData.rememberMe);
  return data.access_token;
};

export const storeTokenData = (data, rememberMe) => {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(STORAGE_KEY, JSON.stringify({ ...data, rememberMe }));
};

export const getTokenData = () => {
  return (
    JSON.parse(localStorage.getItem(STORAGE_KEY)) ||
    JSON.parse(sessionStorage.getItem(STORAGE_KEY)) ||
    null
  );
};

export const getAccessToken = () => {
  return getTokenData()?.access_token;
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem("user");
  sessionStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem("user");
  window.location.href = "/login";
};

