import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useExamStore } from "../store/examStore";
import Question from "../components/Question.jsx";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const ExamPage = () => {
  const {
    questions,
    answers,
    candidateName,
    setCandidateName,
    setAnswer,
    submitExam,
    loading,
    error,
  } = useExamStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (questions.length === 0) {
      navigate("/start");
    } else {
      // LOG QUESTIONS HERE - Paste this console output to me!
      console.log("Current exam questions:", questions);
    }
  }, [questions, navigate]);

  const handleSubmit = async () => {
    const res = await submitExam();
    if (res.success) {
      navigate("/result");
    }
  };

  return (
    <>
      {loading && <Loading message="Submitting exam..." />}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-blue-800">
          AML/CFT Certification Exam
        </h2>

        <ErrorMessage message={error} />

        <div className="mb-6 sm:mb-8">
          <label className="block text-base sm:text-lg font-medium mb-2">
            Your Full Name (for certificate)
          </label>
          <input
            type="text"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            required
            placeholder="John Doe"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
          />
        </div>

        <div className="space-y-6 sm:space-y-8">
          {questions.map((q, idx) => (
            <Question
              key={q.id}
              question={q}
              index={idx}
              selectedAnswer={answers[q.id]}
              onAnswer={setAnswer}
            />
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <button
            onClick={handleSubmit}
            disabled={loading || !candidateName.trim()}
            className="w-full sm:w-auto bg-green-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors duration-200"
          >
            Submit Exam
          </button>
        </div>
      </div>
    </>
  );
};

export default ExamPage;