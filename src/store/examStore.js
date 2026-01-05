import { create } from "zustand";
import api from "./api";
import { useAuthStore } from "./authStore";

export const useExamStore = create((set, get) => ({
  questions: [],
  answers: {}, // { questionId: selectedAnswer }
  sessionId: null,
  candidateName: "",
  result: null, // { score, percentage } or null
  loading: false,
  error: null,

  setAnswer: (questionId, answer) => {
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    }));
  },

  setCandidateName: (name) => set({ candidateName: name }),

startExam: async (email, accessCode) => {
  try {
    set({ loading: true, error: null });

    const res = await api.post("/api/exam/start", { email, accessCode });

    // ✅ Save student auth
    useAuthStore.getState().setAuth(res.data.token, "candidate");

    set({
      questions: res.data.questions,
      sessionId: res.data.sessionId,
      answers: {},
      result: null,
      loading: false,
    });

    return { success: true };
  } catch (err) {
    set({
      error: err.response?.data?.message || "Failed to start exam",
      loading: false,
    });
    return { success: false };
  }
},


  submitExam: async () => {
  const { answers, sessionId, candidateName } = get();
  if (!sessionId || !candidateName.trim()) {
    set({ error: "Name and session required" });
    return { success: false };
  }
  try {
    set({ loading: true, error: null });

    const res = await api.post(
      "/api/exam/submit",
      { answers, name: candidateName, sessionId },
      { responseType: "blob" } // Always blob
    );

    // Check if response is JSON (failed exam) or PDF (passed)
    let resultData = null;
    const contentType = res.headers["content-type"];
    if (contentType.includes("application/json")) {
      const text = await res.data.text();
      resultData = JSON.parse(text);
    }

    if (contentType.includes("application/pdf")) {
      const url = window.URL.createObjectURL(res.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `AML_CFT_Certificate_${candidateName}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      set({
        result: { percentage: 100, passed: true },
        loading: false,
      });
    } else if (resultData) {
      set({
        result: resultData,
        loading: false,
      });
    }

    return { success: true };
  } catch (err) {
    console.error("Submit error:", err.response || err);
    const message = err.response?.data?.message || "Submit failed";
    set({ error: message, loading: false });
    return { success: false, message };
  }
},


  clearExam: () => {
    set({
      questions: [],
      answers: {},
      sessionId: null,
      candidateName: "",
      result: null,
      error: null,
    });
  },
}));