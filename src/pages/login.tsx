import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg?react";
import fondo from "../assets/fondo1.svg";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error en login");
        return;
      }
      localStorage.setItem("token", data.token);
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="h-screen w-screen bg-hamani-bg flex items-center justify-center">
      <div className="w-full h-full bg-white shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center mb-8 flex flex-col items-center">
            <Logo className="w-32 h-32 mb-4" />
            <h1 className="font-hanalei text-6xl text-hamani-dark">HAMANI</h1>
          </div>

          <div className="w-full max-w-md bg-hamani-red/95 p-8 rounded-2xl shadow-xl mx-auto">
            <h2 className="text-white text-2xl md:text-3xl font-semibold text-center mb-6">
              Login Now
            </h2>

            <form className="space-y-4" onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Email or Username"
                className="w-full p-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                className="w-1/2 px-14 py-3 mt-4 rounded-full bg-hamani-dark text-white font-semibold hover:bg-black transition-colors mx-auto block"
              >
                LOGIN
              </button>

              {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            </form>

            <p className="text-center text-white mt-4 text-sm opacity-90">
              Or <Link to="/signup" className="font-semibold underline">Signup</Link>
            </p>
          </div>
        </div>
        <div
          className="hidden lg:block bg-cover bg-center h-full w-full"
          style={{
            backgroundImage: `linear-gradient(
              to right, 
              rgba(255,255,255,1), 
              rgba(255,255,255,0.75), 
              rgba(255,255,255,0.15), 
              rgba(255,255,255,0)
            ), url(${fondo})`,
          }}
        />
      </div>
    </div>
  );
}
