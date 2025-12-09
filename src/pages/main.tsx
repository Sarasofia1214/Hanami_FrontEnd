import Logo from "../assets/logo.svg?react";
import fondo from "../assets/comida.svg";
export default function HamaniDashboard() {
  return (
    <div className="w-full min-h-screen bg-white font-sans">

      <header className="w-full flex flex-wrap items-center justify-between px-5 md:px-10 py-4 shadow-sm bg-white fixed top-0 left-0 z-50">
        <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-start">
          <Logo className="w-20 h-20" />
          <span className="text-xl md:text-7xl font-hanalei  tracking-wide">HAMANI</span>
        </div>

        <nav className="hidden md:flex text-3xl items-center space-x-20 text-lg font-medium mt-7 md:mt-0">
          <a href="#" className="hover:text-gray-600 transition">Inicio</a>
          <a href="#" className="hover:text-gray-600 transition">Nosotros</a>
          <a href="#" className="hover:text-gray-600 transition">Menú</a>
          <a href="#" className="hover:text-gray-600 transition">Contáctanos</a>
        </nav>

        <button className=" hidden md:flex bg-red-800 text-white text-xl px-7 py-3 rounded-lg shadow hover:bg-red-900 transition mt-4 md:mt-0">
          Reservar
        </button>
      </header>

    
      <section className="pt-40 pb-20 px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">

        <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">
          <h1 className="text-4xl font-david md:text-8xl font-bold text-center text-gray-900 leading-tight">
            El Arte de la
          </h1>
          <h2 className="font-dancing  font-bold text-3xl md:text-8xl  text-center mt-2 text-gray-800">Armonía</h2>

          <p className="mt-6 text-base  md:text-lg text-gray-700 leading-relaxed text-center">
            Ofrecemos una cocina donde la pasión, la pureza y la elegancia se encuentran en cada bocado, transportándole a un viaje de sabores inigualables. Bienvenido a descubrir nuestra mesa.
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-20 mt-10">
            <button className="bg-gray-900 text-2xl text-white px-16 py-3 rounded-md hover:bg-black transition w-full sm:w-auto">
              Menú
            </button>
            <button className="bg-orange-500  text-2xl text-white px-16 py-3 rounded-md hover:bg-orange-600 transition w-full sm:w-auto">
              Reservar
            </button>
          </div>
        </div>

  <div className="relative w-full h-[300px] md:h-[500px] lg:h-full overflow-hidden flex justify-end"> <img src={fondo} alt="Platos orientales" className="h-full w-auto object-cover translate-x-1/3 md:translate-x-/2 scale-150 rounded-bl-[300px]"/> </div>
      </section>
    </div>
  );
}
