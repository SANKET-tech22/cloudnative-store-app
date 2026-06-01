import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signup = async () => {
    try {
      await api.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      alert("Signup Successful");

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Signup Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-96">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 rounded-lg mb-4 bg-slate-700 text-white outline-none"
          onChange={(e) => setName(e.target.value)}
        />

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
          onClick={signup}
          className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition"
        >
          Sign Up
        </button>

        <div className="text-center mt-5">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-400 hover:text-blue-300"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;