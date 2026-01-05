import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const AdminDashboard = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { enrollStudent, loading, error } = useAuthStore();

  const handleEnroll = async (e) => {
    e.preventDefault();
    setMessage("");
    const res = await enrollStudent(email.trim());
    if (res.success) {
      setMessage(`Student enrolled successfully! Access code: ${res.data.accessCode}`);
      setEmail("");
    }
  };

  return (
    <>
      {loading && <Loading message="Enrolling student..." />}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-10 text-blue-800">
          Admin Dashboard
        </h2>

        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
            Enroll New Student
          </h3>

          <ErrorMessage message={error} />

          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 sm:px-6 py-3 sm:py-4 rounded mb-4 sm:mb-6 text-sm sm:text-base">
              {message}
            </div>
          )}

          <form onSubmit={handleEnroll} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-base sm:text-lg font-medium mb-2">
                Student Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="student@example.com"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2.5 sm:py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors duration-200"
            >
              Enroll Student & Send Access
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;