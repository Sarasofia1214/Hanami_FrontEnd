import Logo from "../assets/logo.svg?react";
import fondo from "../assets/comida.svg";
import totoro from "../assets/totoro.svg";

export default function HamaniDashboard() {
  return (
    <div className="w-full min-h-screen bg-white font-sans">

      {/* HEADER */}
      <header className="w-full flex flex-wrap items-center justify-between px-5 md:px-10 py-4 shadow-sm bg-white fixed top-0 left-0 z-50">
        <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-start">
          <Logo className="w-20 h-20" />
          <span className="text-xl md:text-7xl font-hanalei tracking-wide">HAMANI</span>
        </div>

        <nav className="hidden md:flex text-3xl items-center space-x-20 text-lg font-medium mt-7 md:mt-0">
          <a href="#">Inicio</a>
          <a href="#">Nosotros</a>
          <a href="#">Menú</a>
          <a href="#">Contáctanos</a>
        </nav>

        <button className="hidden md:flex bg-red-800 text-white text-xl px-7 py-3 rounded-lg shadow hover:bg-red-900 transition mt-4 md:mt-0">
          Reservar
        </button>
      </header>

      {/* HERO */}
      <section className="pt-40 pb-20 px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        
        <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">
          <h1 className="text-4xl md:text-8xl font-david font-bold text-center lg:text-left">
            El Arte de la
          </h1>
          <h2 className="font-dancing font-bold text-3xl md:text-8xl text-center lg:text-left mt-2">
            Armonía
          </h2>

          <p className="mt-6 text-base md:text-lg text-gray-700 leading-relaxed text-center lg:text-left">
            Ofrecemos una cocina donde la pasión, la pureza y la elegancia se encuentran en cada bocado, transportándole a un viaje de sabores inigualables. Bienvenido a descubrir nuestra mesa.
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-20 mt-10">
            <button className="bg-gray-900 text-white px-16 py-3 rounded-md">Menú</button>
            <button className="bg-orange-500 text-white px-16 py-3 rounded-md">Reservar</button>
          </div>
        </div>

        {/* IMAGEN HERO */}
        <div className="relative w-full h-[300px] md:h-[500px] lg:h-full overflow-hidden flex justify-end">
          <img
            src={fondo}
            alt="Platos orientales"
            className="h-full w-auto object-cover translate-x-1/3 md:translate-x-1/2 scale-150 rounded-bl-[300px]"
          />
        </div>
      </section>


      {/* ⭐⭐⭐ SOBRE HAMANI — AHORA DENTRO DEL COMPONENTE ⭐⭐⭐ */}
      <section className="w-full bg-[#F5F5F5] py-20 px-10 lg:px-20 flex flex-col lg:flex-row items-center gap-12">
        
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={totoro}
            alt="Totoro"
            className="max-w-sm md:max-w-md lg:max-w-lg select-none"
          />
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-5xl font-dancing text-center md:text-8xl font-bold text-red-800 italic mb-2">
            Sobre
          </h2>

          <h3 className="text-6xl  text-center font-hanalei md:text-8xl font-extrabold text-red-900 tracking-wide mb-10">
            HAMANI
          </h3>

          <div className="text-center space-y-8 text-gray-800">
            <div>
              <p className="font-extrabold  font-alegreya text-lg.  md:text-2xl">¿POR QUÉ CRUZAR EL UMBRAL DE HAMANI?</p>
              <p className="mt-1 text-base tracking-wide uppercase font-alegreya ">
                Para descubrir una experiencia donde la Maestría Culinaria asiática se eleva al arte moderno.
            </p>
            </div>

            <div>
              <p className="font-extrabold text-lg font-alegreya md:text-2xl"  >¿QUÉ HACE A NUESTRA MESA DIFERENTE?</p>
              <p className="mt-1 text-base tracking-wide uppercase">
                Nuestro compromiso es con la Armonía Estética y la Esencia Pura, garantizando que cada visita sea un viaje memorable.
              </p>
            </div>

            <p className=" font-dancing text-red-700 mt-6 text-xl md:text-5xl ">
              Maestría Culinaria —  Armonía Estética — Esencia Pura
            </p>
          </div>

          <div className="mt-10 text-center">
            <p className="font-extrabold text-3xl tracking-wide " >UBICACIÓN:</p>
            <p className="mt-1 uppercase tracking-wide ">
              Cra. 35A #49-55 — Zona cultural
            </p>
          </div>

          <div className="mt-10 text-center">
            <p className="font-extrabold text-3xl tracking-wide">HORARIOS:</p>
            <p className="mt-1 uppercase tracking-wide">Martes a Sábado, 19:00 - 23:00</p>
          </div>
        </div>

      </section>

    </div>
  );
}
