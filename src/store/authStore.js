import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "./api";

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      role: null, // "admin" | "candidate"
      loading: false,
      error: null,

      // ✅ ADMIN LOGIN (unchanged)
      loginAdmin: async (email, password) => {
        try {
          set({ loading: true, error: null });
          const res = await api.post("/api/admin/login", { email, password });
          set({
            token: res.data.token,
            role: "admin",
            loading: false,
          });
          return { success: true };
        } catch (err) {
          const message =
            err.response?.data?.message || "Login failed";
          set({ error: message, loading: false });
          return { success: false, message };
        }
      },

      // ✅ NEW: STUDENT AUTH SETTER (THIS FIXES YOUR ERROR)
      setAuth: (token, role) => {
        set({
          token,
          role,
        });
      },

      // ✅ ADMIN ENROLL (unchanged)
      enrollStudent: async (email) => {
        try {
          set({ loading: true, error: null });
          const res = await api.post("/api/admin/enroll", { email });
          set({ loading: false });
          return { success: true, data: res.data };
        } catch (err) {
          const message =
            err.response?.data?.message || "Enrollment failed";
          set({ error: message, loading: false });
          return { success: false, message };
        }
      },

      logout: () => {
        set({ token: null, role: null });
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
