import Logo from "../assets/logo.svg?react";
import { Link } from "react-router-dom";
import fondo from "../assets/comida.svg";
import totoro from "../assets/totoro.svg";
import icono_whatsapp from "../assets/whatsapp.svg";
import icono_instagram from "../assets/instagram.svg";
import icono_facebook from "../assets/facebook.svg";

export default function adminDashboard() {
  return (
    <div className="w-full min-h-screen bg-white font-sans">

      <header className="w-full flex flex-wrap items-center justify-between px-5 md:px-10 py-4 shadow-sm bg-white fixed top-0 left-0 z-50">
        <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-start">
          <Logo className="w-20 h-20" />
          <span className="text-xl md:text-7xl font-hanalei tracking-wide">HAMANI</span>
        </div>

        <nav className="hidden md:flex text-3xl items-center space-x-20 text-lg font-medium mt-7 md:mt-0">
        <Link to="/">Inicio</Link>
        <a href="#nosotros">Nosotros</a>
        <Link to="/menu">Menú</Link>
        <a href="#contacto">Contáctanos</a></nav>
      

        <button className="hidden md:flex bg-red-800 text-white text-xl px-7 py-3 rounded-lg shadow hover:bg-red-900 transition mt-4 md:mt-0">
          <a href="#reservacion">Reservar</a>
        </button>
      </header>

      <section className="pt-40 pb-20 px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">
          <h1 className="text-center text-4xl md:text-8xl font-david font-bold lg:text-left">
            El Arte de la
          </h1>
          <h2 className="text-center font-dancing font-bold text-3xl md:text-8xl  lg:text-left mt-2">
            Armonía
          </h2>

          <p className="mt-6 text-base md:text-lg text-gray-700 leading-relaxed text-center lg:text-left">
            Ofrecemos una cocina donde la pasión, la pureza y la elegancia se encuentran en cada bocado, transportándole a un viaje de sabores inigualables. Bienvenido a descubrir nuestra mesa.
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-20 mt-10">
            <button className="bg-gray-900 text-white px-16 py-3 rounded-md"> <Link to="/menu">Menú</Link></button>
            <button className="bg-orange-500 text-white px-16 py-3 rounded-md"><a href="#reservacion">Reservar</a></button>
          </div>
        </div>

        <div className="relative w-full h-[300px] md:h-[500px] lg:h-full overflow-hidden flex justify-end">
          <img
            src={fondo}
            alt="Platos orientales"
            className="h-full w-auto object-cover translate-x-1/3 md:translate-x-1/2 scale-150 rounded-bl-[300px]"
          />
        </div>
      </section>

 
      <section  id="nosotros" className="w-full bg-[#F5F5F5] py-20 px-10 lg:px-20 flex flex-col lg:flex-row items-center gap-12">
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

          <h3 className="text-6xl text-center font-hanalei md:text-8xl font-extrabold text-red-900 tracking-wide mb-10">
            HAMANI
          </h3>

          <div className="text-center space-y-8 text-gray-800">
            <div>
              <p className="font-extrabold font-alegreya text-lg md:text-2xl">¿POR QUÉ CRUZAR EL UMBRAL DE HAMANI?</p>
              <p className="mt-1 text-base tracking-wide uppercase font-alegreya">
                Para descubrir una experiencia donde la Maestría Culinaria asiática se eleva al arte moderno.
              </p>
            </div>

            <div>
              <p className="font-extrabold text-lg font-alegreya md:text-2xl">¿QUÉ HACE A NUESTRA MESA DIFERENTE?</p>
              <p className="mt-1 text-base tracking-wide uppercase">
                Nuestro compromiso es con la Armonía Estética y la Esencia Pura, garantizando que cada visita sea un viaje memorable.
              </p>
            </div>

            <p className="font-dancing text-red-700 mt-6 text-xl md:text-5xl">
              Maestría Culinaria —  Armonía Estética — Esencia Pura
            </p>
          </div>

          <div className="mt-10 text-center">
            <p className="font-extrabold text-3xl tracking-wide">UBICACIÓN:</p>
            <p className="mt-1 uppercase tracking-wide">Cra. 35A #49-55 — Zona cultural</p>
          </div>

          <div className="mt-10 text-center">
            <p className="font-extrabold text-3xl tracking-wide">HORARIOS:</p>
            <p className="mt-1 uppercase tracking-wide">Martes a Sábado, 19:00 - 23:00</p>
          </div>
        </div>
      </section>


      <section id="reservacion" className="w-full bg-white pt-20 pb-32">
        <h1 className="text-center text-7xl font-david  font-bold text-[#131822]">
          Haz Tu Reservación
        </h1>

        <p className="text-center mt-4 text-3xl font-dancing text-[#b33c2d]">
          Tu comida ideal la hacemos posible
        </p>

        <div className="flex items-center justify-center gap-6 mt-12 px-4 flex-wrap">

          <div className="w-[360px] h-[70px] border border-black flex items-center px-6 justify-between">
            <input
              type="date"
              placeholder="16/22/2021"
              className="outline-none text-lg w-full"
            />
          </div>

          <div className="w-[360px] h-[70px] border border-black flex items-center px-6 justify-between">
            <select className="outline-none text-lg w-full bg-transparent">
              <option>6:00 pm</option>
              <option>7:00 pm</option>
              <option>8:00 pm</option>
            </select>   
          </div>

          <div className="w-[360px] h-[70px] border border-black flex items-center px-6 justify-between">
            <select className="outline-none text-lg w-full bg-transparent">
              <option>2 Person</option>
              <option>4 Person</option>
              <option>6 Person</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button className="bg-[#df8743] text-white text-2xl px-16 py-4 rounded-md hover:bg-[#c57234] transition">
            Reservar Ahora
          </button>
        </div>


        <footer  id="contacto" className="w-full bg-[#701515] text-white mt-24 pt-20 pb-16">
             <div className="flex flex-wrap items-center justify-center gap-60 text-lg">
        <div className="flex gap-14">
            <img src={icono_whatsapp} className="w-10" alt="whatsapp" />
            <img src={icono_instagram} className="w-10" alt="instagram" />
            <img src={icono_facebook} className="w-10" alt="facebook" />
        </div>

  
    <p className="tracking-widest text-xl">
      +57 3106326449
    </p>

    <p className="tracking-widest text-xl">
      HUMARI@RESTAURANTE.COM
    </p>
  </div>

  <div className="mt-16 border-t border-white/40 pt-8 text-center text-sm tracking-wide">
    © 2020 Zero Inc. All rights Reserved
  </div>
        </footer>

      </section>
    </div>
  );
}
