import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.svg?react";
import { Link } from "react-router-dom";

const API = "http://localhost:3000";

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
  ingredients?: string;
  price?: number;
};




export default function AdminMenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [search, setSearch] = useState("");
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);

// Cargar categorías y platos al montar el componente
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
// Cuando hay un plato seleccionado carga sus ingredientes
  useEffect(() => {
    if (!selectedDish) return;

    async function loadIngredients() {
      try {
        const res = await fetch(`${API}/ingredients/dish/${selectedDish.id}`);
        const json = await res.json();
        const names = json.map((i: any) => i.name);
        setIngredients(names);
      } catch (err) {
        console.error("Error loading ingredients:", err);
        setIngredients([]);
      }
    }

    loadIngredients();
  }, [selectedDish]);
  // Eliminar plato seleccionado
  const handleDeleteDish = async (id: number) => {
    const confirmDelete = window.confirm(
      "¿Seguro que quieres eliminar este plato?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API}/dishes/${id}`, {
        method: "DELETE",
      });

      const body = await res.json().catch(() => null);

      if (!res.ok) {
        alert(body?.message || "Error al eliminar el plato");
        return;
      }

    // Quita el plato del estado y cerrar modal
      setDishes((prev) => prev.filter((dish) => dish.id !== id));
      setSelectedDish(null);
      setIngredients([]);
      alert("Plato eliminado correctamente");
    } catch (err) {
      alert("Error al eliminar el plato");
    }
  };

  // Filtrado de platos disponibles por texto de búsqueda
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
    <main className="w-full relative">
   {/* Header admin con buscador y botón Añadir */}
      <header className="w-full bg-[#e7e7e7] py-4 flex items-center justify-between px-10 shadow gap-8 ">
        <div className=" hidden md:flex items-center space-x-3 w-full md:w-auto justify-between md:justify-start">
          <Logo className="w-20 h-20" />
          <span className="text-xl md:text-7xl font-hanalei tracking-wide">
            HAMANI
          </span>
        </div>

        <nav className="hidden md:flex text-3xl items-center space-x-20 text-lg font-medium mt-7 md:mt-0">
          <Link to="/">Inicio</Link>
        </nav>

        <div className="flex gap-4 items-center bg-white border border-[#8b1e1e]/40 rounded-full px-4 py-2 w-[350px]">
          <span className="text-[#8b1e1e] text-xl mr-2">🔍</span>
          <input
            type="text"
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-[#8b1e1e]"
          />
        </div>

        <Link
          to="/admin/add-dish"
          className="flex bg-red-800 text-white text-1xl px-7 py-3 rounded-lg shadow hover:bg-red-900 transition mt-4 md:mt-0 sm:px-2 p-2 text-center"
        >
          Añadir
        </Link>
      </header>

      <div className="mt-10">
        {categories.map((cat) => {
          const dishesOfCategory = filteredDishes.filter(
            (dish) => dish.category_id === cat.id
          );

          if (dishesOfCategory.length === 0) return null;

          return (
            <section key={cat.id} className="px-8 md:px-16 my-16">
              <h2 className="text-center text-6xl font-hanalei text-[#8b1e1e] mb-12 tracking-widest ">
                {cat.name.toUpperCase()}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 ">
                {dishesOfCategory.map((dish) => (
                  <div
                    key={dish.id}
                    className="rounded-lg overflow-hidden bg-white shadow-lg cursor-pointer hover:scale-[1.02] transition"
                    onClick={() => setSelectedDish(dish)}
                  >
                    <img
                      src={dish.image_url}
                      alt={dish.name}
                      className="w-full h-48 object-cover "
                    />
                    <div className="bg-black text-white p-5  ">
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

      {selectedDish && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full flex flex-col md:flex-row relative p-6 animate-fadeIn">
            <button
              className="absolute right-4 top-4 text-3xl text-gray-500 hover:text-black"
              onClick={() => {
            // Abre modal para ver/editar/eliminar
                setSelectedDish(null);
                setIngredients([]);
              }}
            >
              ❌
            </button>

            <img
              src={selectedDish.image_url}
              alt={selectedDish.name}
              className="w-full md:w-1/2 h-[420px] object-cover rounded-xl sm:h-[300px]"
            />

            <div className="w-full md:w-1/2 px-6 flex flex-col justify-center ">
              <h2 className="text-4xl font-semibold mb-3 text-center md:text-left   md:text-center">
                {selectedDish.name}
              </h2>

              <p className="text-lg text-center md:text-left mb-6  md:text-center ">
                {selectedDish.description}
              </p>

              <div className="bg-gray-200 rounded-xl p-4 mb-6 text-center">
                <h3 className="text-red-700 font-semibold text-xl mb-2">
                  Ingredientes:
                </h3>

                <p className="text-md">
                  {ingredients.length > 0
                    ? ingredients.join(", ")
                    : "No especificados"}
                </p>
              </div>

              <p className="text-4xl font-bold text-center mb-6">
                ${selectedDish.price || "0.00"}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                <Link
                  to={`/admin/edit-dish/${selectedDish.id}`}
                  className="bg-red-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-red-700 transition text-center"
                >
                  Editar
                </Link>

                <button
                  className="bg-red-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-red-700 transition"
                  onClick={() => handleDeleteDish(selectedDish.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
