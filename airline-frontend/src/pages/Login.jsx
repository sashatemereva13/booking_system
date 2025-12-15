import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/http";
import PageTransition from "../components/PageTransition";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) return alert("Fill all fields");

    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
      navigate("/my-trips");
    } catch (e) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageTransition>
      <div className="h-full flex items-center justify-center bg-dark text-plum">
        <div className="w-full max-w-md bg-brand/20 backdrop-blur-xl p-10 rounded-2xl border border-plum/20 shadow-xl">
          <h1 className="font-display text-4xl text-gold text-center mb-6">
            Welcome Back
          </h1>

          <div className="flex flex-col gap-4">
            <input
              className="bg-dark/40 border border-brand/30 rounded-lg p-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="bg-dark/40 border border-brand/30 rounded-lg p-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              className="mt-4 py-3 rounded-xl bg-brand hover:bg-gold hover:text-dark transition"
            >
              {loading ? "Logging in..." : "Login ✈"}
            </button>
          </div>

          <p className="text-center text-sm text-plum/60 mt-6">
            No account yet?{" "}
            <Link to="/register" className="text-gold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
