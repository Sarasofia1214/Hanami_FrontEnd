import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg?react";
import DishIllustration from "../assets/fondo2.svg";

const API = "http://localhost:3000";

type Dish = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: number;
  is_available: boolean;
};

type Category = {
  id: number;
  name: string;
};

type RouteParams = {
  id: string;
};

export default function EditDishPage() {
// lee el :id de la ruta /admin/edit-dish/:id
  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    category_id: "",
    description: "",
    price: "",
    image_url: "",
    is_available: true,
  });

  // Cargar categorías y plato
  useEffect(() => {
    async function load() {
      try {
        const [catRes, dishRes] = await Promise.all([
          fetch(`${API}/categories`),
          fetch(`${API}/dishes/${id}`),
        ]);

        if (!catRes.ok || !dishRes.ok) {
          alert("Error al cargar datos");
          return;
        }

        const cats: Category[] = await catRes.json();
        const dish: Dish = await dishRes.json();

        setCategories(cats);
        setForm({
          name: dish.name,
          category_id: String(dish.category_id),
          description: dish.description,
          price: String(dish.price),
          image_url: dish.image_url || "",
          is_available: !!dish.is_available,
        });
      } catch {
        alert("Error al cargar datos");
      } finally {
        setLoading(false);
      }
    }

    if (id) load();
  }, [id]);

// Manejar cambios de inputs/select/checkbox
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

   // Envío del formulario
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      name: form.name,
      description: form.description,
      image_url: form.image_url,
      category_id: Number(form.category_id),
      is_available: form.is_available,
      price: Number(form.price),
    };

    try {
      const res = await fetch(`${API}/dishes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const body = await res.json().catch(() => null);

      if (!res.ok) {
        alert(body?.message || "Error al actualizar el plato");
        return;
      }

      alert("Plato actualizado correctamente");
      navigate("/adminMenu");
    } catch {
      alert("Error al actualizar el plato");
    }
  }

  // Pantalla de carga mientras se obtienen datos
  if (loading) {
    return (
      <main className="w-full min-h-screen bg-white flex items-center justify-center">
        <p>Cargando...</p>
      </main>
    );
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

      <section className="flex flex-col md:flex-row w-full px-10 py-16">
        {/* FORMULARIO IZQUIERDA */}
        <div className="w-full md:w-1/2">
          <h1 className="text-6xl font-hanalei mb-10">Editar Plato</h1>

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

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="is_available"
                checked={form.is_available}
                onChange={handleChange}
              />
              <span>Disponible</span>
            </div>

            <button
              type="submit"
              className="bg-orange-500 text-white text-xl py-3 rounded w-full hover:bg-orange-600 transition"
            >
              Guardar cambios
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
