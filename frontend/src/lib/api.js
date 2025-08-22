import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let isAuthing = false;

api.interceptors.response.use(
  (r) => r,
  async (err) => {
    if (err?.response?.status === 401 && !!isAuthing) {
      try {
        isAuthing = true;
        await ensureGuestAuth();
        isAuthing = false;

        return api.request(err.confing);
      } catch (error) {
        isAuthing = false;
      }
    }
    return Promise.reject(err);
  }
);

export async function ensureGuestAuth() {
  let devicedId = localStorage.getItem("devicedId");

  if (!devicedId) {
    devicedId =
      (crypto?.randomUUID && crypto.randomUUID()) ||
      Math.random().toString(36).slice(2);
    localStorage.setItem("devicedId", devicedId);
  }
  await api.post("/api/auth/guest", { devicedId });
}
