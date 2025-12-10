import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.svg?react";

const API = "http://localhost:3000";

/* Tipos */
type Category = {
  id: number;
  name: string;
};

type Dish = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  category_id: number;
  is_available: number | boolean;
};

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const resCat = await fetch(`${API}/categories`);
      const resDish = await fetch(`${API}/dishes`);
      const catJson = await resCat.json();
      const dishJson = await resDish.json();

      setCategories(catJson);
      setDishes(dishJson);
    }
    load();
  }, []);


  const filteredDishes = dishes.filter((dish) => {
    const available = dish.is_available === 1 || dish.is_available === true;
    if (!available) return false;

    const text = search.toLowerCase();
    return (
      dish.name.toLowerCase().includes(text) ||
      dish.description.toLowerCase().includes(text)
    );
  });

  return (
    <main className="w-full">

      <header className="w-full bg-[#e7e7e7] py-4 flex items-center justify-between px-10 shadow">
        
       <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-start">
            <Logo className="w-20 h-20" />
            <span className="text-xl md:text-7xl font-hanalei tracking-wide">HAMANI</span>
        </div>
        <nav className="hidden md:flex text-3xl items-center space-x-20 text-lg font-medium mt-7 md:mt-0">
          <a href="#">Inicio</a>
          </nav>
        {/* Barra de búsqueda */}
        <div className="flex items-center bg-white border border-[#8b1e1e]/40 rounded-full px-4 py-2 w-[350px]">
          <span className="text-[#8b1e1e] text-xl mr-2">🔍</span>
          <input
            type="text"
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-[#8b1e1e]"
          />
        </div>

        <button className="hidden md:flex bg-red-800 text-white text-xl px-7 py-3 rounded-lg shadow hover:bg-red-900 transition mt-4 md:mt-0">
          Reservar
        </button>
      </header>

      {/* MENÚ */}
      <div className="mt-10">
        {categories.map((cat) => {
          const dishesOfCategory = filteredDishes.filter(
            (dish) => dish.category_id === cat.id
          );

          if (dishesOfCategory.length === 0) return null;

          return (
            <section key={cat.id} className="px-8 md:px-16 my-16">
              
              {/* Título */}
              <h2 className="text-center text-6xl font-hanalei text-[#8b1e1e] mb-12 tracking-widest">
                {cat.name.toUpperCase()}
              </h2>

              {/* Grid de tarjetas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {dishesOfCategory.map((dish) => (
                  <div
                    key={dish.id}
                    className="rounded-lg overflow-hidden bg-white shadow-lg"
                  >
                    <img
                      src={dish.image_url}
                      alt={dish.name}
                      className="w-full h-48 object-cover"
                    />

                    <div className="bg-black text-white p-5">
                      <h3 className="text-xl font-semibold mb-1">
                        {dish.name}
                      </h3>
                      <p className="text-sm opacity-90">{dish.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
