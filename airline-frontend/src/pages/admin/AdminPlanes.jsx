import { useEffect, useState } from "react";
import api from "../../api/http";
import PageTransition from "../../components/PageTransition";

export default function AdminPlanes() {
  const [planes, setPlanes] = useState([]);

  const [form, setForm] = useState({
    brand: "",
    model: "",
    manufacturingYear: "",
  });
  const [editingId, setEditingId] = useState(null);

  async function loadPlanes() {
    const res = await api.get("/planes");
    setPlanes(res.data);
  }

  useEffect(() => {
    loadPlanes();
  }, []);

  async function handleSubmit() {
    if (!form.brand || !form.model || !form.manufacturingYear) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      await api.put(`/planes/${editingId}`, form);
    } else {
      await api.post("/planes", form);
    }

    setForm({ brand: "", model: "", manufacturingYear: "" });
    setEditingId(null);
    loadPlanes();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this plane?")) return;
    await api.delete(`/planes/${id}`);
    loadPlanes();
  }

  function startEdit(plane) {
    setEditingId(plane.id);
    setForm({
      brand: plane.brand,
      model: plane.model,
      manufacturingYear: plane.manufacturingYear,
    });
  }

  return (
    <PageTransition>
      <div className="h-full bg-dark text-plum p-10">
        <h1 className="font-display text-4xl text-gold mb-8">Manage Planes</h1>

        {/* FORM */}
        <div className="bg-brand/20 p-6 rounded-xl border border-plum/20 mb-10 max-w-xl">
          <h2 className="text-xl text-gold mb-4">
            {editingId ? "Edit Plane" : "Create Plane"}
          </h2>

          <div className="flex flex-col gap-4">
            <input
              placeholder="Brand"
              className="p-3 rounded bg-dark/40 border border-brand/30"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
            />

            <input
              placeholder="Model"
              className="p-3 rounded bg-dark/40 border border-brand/30"
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
            />

            <input
              placeholder="Manufacturing Year"
              type="number"
              className="p-3 rounded bg-dark/40 border border-brand/30"
              value={form.manufacturingYear}
              onChange={(e) =>
                setForm({
                  ...form,
                  manufacturingYear: e.target.value,
                })
              }
            />

            <button
              onClick={handleSubmit}
              className="bg-brand py-3 rounded-xl hover:bg-gold hover:text-dark transition"
            >
              {editingId ? "Update Plane" : "Create Plane"}
            </button>
          </div>
        </div>

        {/* LIST */}
        <div className="space-y-4 max-w-3xl">
          {planes.map((p) => (
            <div
              key={p.id}
              className="
                flex justify-between items-center
                bg-brand/10 p-5 rounded-xl
                border border-plum/20
              "
            >
              <div>
                <div className="font-semibold text-lg">
                  {p.brand} {p.model}
                </div>
                <div className="text-sm text-plum/60">
                  Year: {p.manufacturingYear}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => startEdit(p)}
                  className="text-gold hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
