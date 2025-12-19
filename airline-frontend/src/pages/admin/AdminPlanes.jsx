import { useEffect, useState } from "react";
import api from "../../api/http";
import PageTransition from "../../components/PageTransition";

export default function AdminPlanes() {
  const [planes, setPlanes] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    model: "",
    seatsEconomy: "",
    seatsBusiness: "",
    seatsFirst: "",
  });

  // ─────────────────────────────────────────────
  // Load planes
  // ─────────────────────────────────────────────
  async function loadPlanes() {
    try {
      const res = await api.get("/planes");
      const data = Array.isArray(res.data) ? res.data : res.data.content ?? [];

      data.sort((a, b) => a.id - b.id); // stable order
      setPlanes(data);
    } catch (e) {
      console.error("Failed to load planes", e);
      setPlanes([]);
    }
  }

  useEffect(() => {
    loadPlanes();
  }, []);

  // ─────────────────────────────────────────────
  // Create / Update
  // ─────────────────────────────────────────────
  async function handleSubmit() {
    if (
      !form.model ||
      !form.seatsEconomy ||
      !form.seatsBusiness ||
      !form.seatsFirst
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editingId) {
        await api.put(`/planes/${editingId}`, form);
      } else {
        await api.post("/planes", form);
      }

      setForm({
        model: "",
        seatsEconomy: "",
        seatsBusiness: "",
        seatsFirst: "",
      });
      setEditingId(null);
      loadPlanes();
    } catch (e) {
      console.error("Failed to save plane", e);
    }
  }

  function startEdit(plane) {
    setEditingId(plane.id);
    setForm({
      model: plane.model,
      seatsEconomy: plane.seatsEconomy,
      seatsBusiness: plane.seatsBusiness,
      seatsFirst: plane.seatsFirst,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({
      model: "",
      seatsEconomy: "",
      seatsBusiness: "",
      seatsFirst: "",
    });
  }

  async function handleDelete(id) {
    if (!confirm("Delete this plane?")) return;

    try {
      await api.delete(`/planes/${id}`);
      loadPlanes();
    } catch (e) {
      console.error("Failed to delete plane", e);
    }
  }

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────
  return (
    <PageTransition>
      <div className="h-full bg-dark text-plum p-10 flex flex-col">
        <h1 className="font-display text-4xl text-gold mb-6">Manage Planes</h1>

        {/* SCROLLABLE PANEL */}
        <div
          className="
            flex-1
            overflow-y-auto
            max-w-3xl
            border border-plum/10
            rounded-xl
            p-6
            space-y-8
            bg-dark/40
          "
        >
          {/* CREATE / EDIT FORM */}
          <div className="bg-brand/20 p-6 rounded-xl border border-plum/20">
            <h2 className="text-xl text-gold mb-4">
              {editingId ? "Edit Plane" : "Create Plane"}
            </h2>

            <div className="flex flex-col gap-4">
              <input
                placeholder="Model"
                className="p-3 rounded bg-dark/40 border border-brand/30"
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
              />

              <input
                type="number"
                placeholder="Economy seats"
                className="p-3 rounded bg-dark/40 border border-brand/30"
                value={form.seatsEconomy}
                onChange={(e) =>
                  setForm({
                    ...form,
                    seatsEconomy: Number(e.target.value),
                  })
                }
              />

              <input
                type="number"
                placeholder="Business seats"
                className="p-3 rounded bg-dark/40 border border-brand/30"
                value={form.seatsBusiness}
                onChange={(e) =>
                  setForm({
                    ...form,
                    seatsBusiness: Number(e.target.value),
                  })
                }
              />

              <input
                type="number"
                placeholder="First class seats"
                className="p-3 rounded bg-dark/40 border border-brand/30"
                value={form.seatsFirst}
                onChange={(e) =>
                  setForm({
                    ...form,
                    seatsFirst: Number(e.target.value),
                  })
                }
              />

              <div className="flex gap-4">
                <button
                  onClick={handleSubmit}
                  className="bg-brand py-3 px-6 rounded-xl hover:bg-gold hover:text-dark transition"
                >
                  {editingId ? "Update Plane" : "Create Plane"}
                </button>

                {editingId && (
                  <button
                    onClick={cancelEdit}
                    className="text-plum/70 hover:text-gold transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* PLANE LIST */}
          {planes.length === 0 && (
            <p className="text-plum/60">No planes created yet.</p>
          )}

          {planes.map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center bg-brand/10 p-5 rounded-xl border border-plum/20"
            >
              <div>
                <div className="font-semibold text-lg">{p.model}</div>
                <div className="text-sm text-plum/60">
                  Economy: {p.seatsEconomy} · Business: {p.seatsBusiness} ·
                  First: {p.seatsFirst}
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
