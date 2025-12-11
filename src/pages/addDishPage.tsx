import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.svg?react";
import DishIllustration from "../assets/fondo2.svg";

const API = "http://localhost:3000";

type Category = {
  id: number;
  name: string;
};

// Lista de categorías para el select
export default function AddDishPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({
    name: "",
    category_id: "",
    description: "",
    price: "",
    image_url: "",  
    
  });

  useEffect(() => {
    async function load() {
      const res = await fetch(`${API}/categories`);
      const json = await res.json();
      setCategories(json);
    }
    load();
  }, []);

  // Manejar cambios en inputs/select y actualizar el estado del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // Envío del formulario
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

// Adaptar los tipos al formato que espera el backend
   const data = {
  name: form.name,
  description: form.description,
  image_url: form.image_url,
  category_id: Number(form.category_id),
  is_available: true, // mejor boolean
  price: Number(form.price),
};

const res = await fetch(`${API}/dishes`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});
const body = await res.json().catch(() => null);

if (!res.ok) {
  alert(body?.message || "Error al crear el plato");
  return;
}

alert("Plato añadido correctamente");

  }

  return (
    <main className="w-full min-h-screen bg-white">

    
      <header className="w-full bg-[#e7e7e7] py-4 flex items-center justify-between px-10 shadow">
        <div className="flex items-center space-x-3">
          <Logo className="w-20 h-20" />
          <span className="text-7xl font-hanalei tracking-wide">HAMANI</span>
        </div>

        <nav className="hidden md:flex text-3xl items-center space-x-20 text-lg font-medium mt-7">
          <a href="/adminMenu">Volver</a>
        </nav>
      </header>

           {/* Layout principal*/}
      <section className="flex flex-col md:flex-row w-full px-10 py-16">

   
        <div className="w-full md:w-1/2">
          <h1 className="text-6xl font-hanalei mb-10">Añadir Plato</h1>

          <form
            className="flex flex-col space-y-6 max-w-md"
            onSubmit={handleSubmit}
          >
       
            <div>
              <label className="block text-xl font-semibold mb-1">Nombre:</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="border border-black px-3 py-2 w-full"
              />
            </div>

            <div>
              <label className="block text-xl font-semibold mb-1">
                Categoría:
              </label>
              <select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                className="border border-black px-3 py-2 w-full"
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xl font-semibold mb-1">
                Descripción:
              </label>
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                className="border border-black px-3 py-2 w-full"
              />
            </div>

            <div>
              <label className="block text-xl font-semibold mb-1">Precio:</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="border border-black px-3 py-2 w-full"
              />
            </div>

            {/* URL */}
            <div>
              <label className="block text-xl font-semibold mb-1">URL:</label>
              <input
                type="text"
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
                className="border border-black px-3 py-2 w-full"
              />
            </div>

            {/* BOTÓN */}
            <button
              type="submit"
              className="bg-orange-500 text-white text-xl py-3 rounded w-full hover:bg-orange-600 transition"
            >
              Añadir
            </button>
          </form>
        </div>


  <div className="hidden md:flex w-1/2 justify-center items-center">
    <div className="w-full max-w-xl aspect-[3/4]">
      <img
        src={DishIllustration}
        alt="Ilustración"
        className="w-full h-full object-contain"
      />
    </div>
  </div>

      </section>
    </main>
  );
}
