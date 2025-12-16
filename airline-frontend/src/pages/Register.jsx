import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/http";
import PageTransition from "../components/PageTransition";
import { useAuth } from "../auth/AuthContext";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    birthdate: "",
  });

  async function handleRegister() {
    try {
      const res = await api.post("/auth/register", form);
      navigate("/login");
    } catch (e) {
      alert("Error registering user");
    }
  }

  return (
    <PageTransition>
      <div className="h-full flex items-center justify-center bg-dark text-plum">
        <div className="w-full max-w-md bg-brand/20 backdrop-blur-xl p-10 rounded-2xl border border-plum/20 shadow-xl">
          <h1 className="font-display text-4xl text-gold text-center mb-6">
            Create Account
          </h1>

          <div className="flex flex-col gap-4">
            {[
              "firstName",
              "lastName",
              "email",
              "password",
              "address",
              "phone",
              "birthdate",
            ].map((field) => (
              <input
                key={field}
                type={
                  field === "password"
                    ? "password"
                    : field === "birthdate"
                    ? "date"
                    : "text"
                }
                placeholder={field}
                className="bg-dark/40 border border-brand/30 rounded-lg p-3"
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              />
            ))}

            <button
              onClick={handleRegister}
              className="mt-4 py-3 rounded-xl bg-brand hover:bg-gold hover:text-dark transition"
            >
              Create Account ✨
            </button>
          </div>

          <p className="text-center text-sm text-plum/60 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-gold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
