import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Home = () => {
  const { role } = useAuthStore();

  return (
    <div className="text-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-800 mb-4 sm:mb-6">
        AML/CFT Certification Exam
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto px-4">
        Welcome to the official Anti-Money Laundering and Countering the Financing of Terrorism certification exam system. 
        Achieve 80% or higher to receive your certificate.
      </p>

      <div className="space-y-4 sm:space-y-6">
        {!role ? (
          <>
            <Link
              to="/start"
              className="inline-block w-full sm:w-auto bg-blue-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Start Exam (Student)
            </Link>
            <br />
            <Link
              to="/admin/login"
              className="inline-block text-blue-600 underline text-base sm:text-lg hover:text-blue-800 transition-colors duration-200"
            >
              Admin Login
            </Link>
          </>
        ) : role === "admin" ? (
          <Link
            to="/admin/dashboard"
            className="inline-block w-full sm:w-auto bg-green-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-green-700 transition-colors duration-200"
          >
            Go to Admin Dashboard
          </Link>
        ) : (
          <Link
            to="/exam"
            className="inline-block w-full sm:w-auto bg-blue-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Continue Exam
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;