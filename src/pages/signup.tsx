import Logo from "../assets/logo.svg?react";
import fondo2 from "../assets/fondo2.svg"; // usa la imagen que quieras
import { Link } from "react-router-dom";

export default function Signup() {
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
              Signup Now
            </h2>

            <form className="space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 
                focus:outline-none focus:ring-2 focus:ring-red-300"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 
                focus:outline-none focus:ring-2 focus:ring-red-300"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 
                focus:outline-none focus:ring-2 focus:ring-red-300"
              />

              <button
                type="submit"
                className="w-1/2 px-14 py-3 mt-4 rounded-full bg-hamani-dark text-white font-semibold 
                hover:bg-black transition-colors mx-auto block"
              >
                SIGNUP
              </button>
            </form>

            <p className="text-center text-white mt-4 text-sm opacity-90">
              Or <Link to="/login" className="font-semibold underline">Login</Link>
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
            ), url(${fondo2})`,
          }}
        />
      </div>
    </div>
  );
}
