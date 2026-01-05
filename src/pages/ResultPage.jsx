// frontend/src/pages/ResultPage.jsx (fixed version)
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useExamStore } from "../store/examStore";
import api from "../store/api";

const ResultPage = () => {
  const { result, clearExam, setQuestions, setSessionId, setAnswers, setResult, candidateName } = useExamStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!result) {
      navigate("/");
    }
  }, [result, navigate]);

  if (!result) return null;

  const isPassed = result.percentage >= 80;
  const attempts = result.attempts || 1; // Fallback if not sent from backend

  const handleRetry = async () => {
    try {
      const res = await api.post("/api/exam/start");

      setQuestions(res.data.questions);
      setSessionId(res.data.sessionId);
      setAnswers({});
      setResult(null);

      navigate("/exam");
    } catch (err) {
      alert(err.response?.data?.message || "Cannot start new attempt");
      clearExam();
      navigate("/");
    }
  };

  const handleBackToHome = () => {
    clearExam();
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 sm:py-12 md:py-16">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-blue-800">
        Exam Result
      </h2>

      <div className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 ${isPassed ? "text-green-600" : "text-red-600"}`}>
        {isPassed ? "PASSED!" : "FAILED"}
      </div>

      <p className="text-xl sm:text-2xl mb-6 sm:mb-8">
        Score: {result.score} / {result.percentage.toFixed(2)}%
      </p>

      {isPassed ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 sm:px-6 md:px-8 py-4 sm:py-6 rounded-lg mb-6 sm:mb-8">
          <p className="text-lg sm:text-xl font-semibold">
            Congratulations! Your certificate has been downloaded automatically.
          </p>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base wrap-break-word">
            Check your downloads folder for <strong>AML_CFT_Certificate_{candidateName || "Candidate"}.pdf</strong>
          </p>
        </div>
      ) : (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 sm:px-6 md:px-8 py-4 sm:py-6 rounded-lg mb-6 sm:mb-8">
          <p className="text-base sm:text-lg md:text-xl">
            You need 80% to pass. 
            You have used {attempts} attempt{attempts > 1 ? 's' : ''}.
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
        {isPassed ? (
          <button
            onClick={handleBackToHome}
            className="w-full sm:w-auto bg-blue-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Home
          </button>
        ) : (
          <>
            {attempts < 3 && (
              <button
                onClick={handleRetry}
                className="w-full sm:w-auto bg-orange-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-orange-700 transition-colors duration-200"
              >
                Try Again (Attempt {attempts + 1}/3)
              </button>
            )}
            <button
              onClick={handleBackToHome}
              className="w-full sm:w-auto bg-gray-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-gray-700 transition-colors duration-200"
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultPage;