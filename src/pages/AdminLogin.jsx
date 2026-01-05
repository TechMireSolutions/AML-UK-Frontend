import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginAdmin, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginAdmin(email, password);
    if (res.success) {
      navigate("/admin/dashboard");
    }
  };

  return (
    <>
      {loading && <Loading message="Logging in..." />}
      <div className="max-w-md mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-blue-800">
            Admin Login
          </h2>

          <ErrorMessage message={error} />

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-base sm:text-lg font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                placeholder="admin@gmail.com"
              />
            </div>

            <div>
              <label className="block text-base sm:text-lg font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                placeholder="admin123"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;