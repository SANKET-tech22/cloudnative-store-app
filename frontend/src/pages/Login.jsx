import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      const token = res.data.token;

      localStorage.setItem("token", token);

      const profile = await api.get("/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem(
        "userId",
        profile.data.user.userId
      );

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-96">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          CloudNative Store
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg mb-4 bg-slate-700 text-white outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg mb-6 bg-slate-700 text-white outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition"
        >
          Login
        </button>

        <div className="text-center mt-4">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-300"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;