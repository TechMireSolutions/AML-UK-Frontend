import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExamStore } from "../store/examStore";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const ExamStart = () => {
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const { startExam, loading, error } = useExamStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await startExam(email.trim(), accessCode.trim());
    if (res.success) {
      navigate("/exam");
    }
  };

  return (
    <>
      {loading && <Loading message="Starting exam..." />}
      <div className="max-w-md mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-blue-800">
            Start Your Exam
          </h2>

          <ErrorMessage message={error} />

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-base sm:text-lg font-medium mb-2">
                Your Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-base sm:text-lg font-medium mb-2">
                Access Code
              </label>
              <input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                required
                placeholder="e.g. A1B2C3D4"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 uppercase text-sm sm:text-base"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
            >
              Start Exam
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ExamStart;