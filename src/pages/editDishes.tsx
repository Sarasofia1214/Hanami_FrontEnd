import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

type RouteParams = {
  id: string;
};

export default function EditDishPage() {
  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    category_id: "",
    is_available: true,
  });

  const [loading, setLoading] = useState(true);

  // Cargar datos del plato
  useEffect(() => {
    async function loadDish() {
      try {
        const res = await fetch(`${API}/dishes/${id}`);
        if (!res.ok) {
          alert("Error al cargar el plato");
          return;
        }
        const dish: Dish = await res.json();

        setForm({
          name: dish.name,
          description: dish.description,
          price: String(dish.price),
          image_url: dish.image_url || "",
          category_id: String(dish.category_id),
          is_available: !!dish.is_available,
        });
      } catch (e) {
        alert("Error al cargar el plato");
      } finally {
        setLoading(false);
      }
    }

    if (id) loadDish();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      navigate("/adminMenu"); // cambia al destino que quieras
    } catch (err) {
      alert("Error al actualizar el plato");
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <main className="w-full min-h-screen bg-white">
      <section className="px-10 py-16 max-w-xl">
        <h1 className="text-4xl font-hanalei mb-10">Editar plato</h1>

        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
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
            <label className="block text-xl font-semibold mb-1">URL imagen:</label>
            <input
              type="text"
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              className="border border-black px-3 py-2 w-full"
            />
          </div>

          {/* Si quieres dejar cambiar categoría también */}
          {/* <select name="category_id" value={form.category_id} onChange={handleChange}> ... </select> */}

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
      </section>
    </main>
  );
}
