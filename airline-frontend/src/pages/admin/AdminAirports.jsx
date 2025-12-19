import { useEffect, useState } from "react";
import api from "../../api/http";
import PageTransition from "../../components/PageTransition";

export default function AdminAirports() {
  const [airports, setAirports] = useState([]);

  const [form, setForm] = useState({
    nameAirport: "",
    cityAirport: "",
    countryAirport: "",
  });
  const [editingId, setEditingId] = useState(null);

  async function loadAirports() {
    const res = await api.get("/airports");
    setAirports(res.data);
  }

  useEffect(() => {
    loadAirports();
  }, []);

  async function handleSubmit() {
    if (!form.nameAirport || !form.cityAirport || !form.countryAirport) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      await api.put(`/airports/${editingId}`, form);
    } else {
      await api.post("/airports", form);
    }

    setForm({ nameAirport: "", cityAirport: "", countryAirport: "" });
    setEditingId(null);
    loadAirports();
  }

  function startEdit(a) {
    setEditingId(a.id);
    setForm({
      nameAirport: a.nameAirport,
      cityAirport: a.cityAirport,
      countryAirport: a.countryAirport,
    });
  }

  async function handleDelete(id) {
    if (!confirm("Delete this airport?")) return;
    await api.delete(`/airports/${id}`);
    loadAirports();
  }

  return (
    <PageTransition>
      <div className="h-full bg-dark text-plum p-10 flex flex-col">
        {/* HEADER */}
        <h1 className="font-display text-4xl text-gold mb-6">
          Manage Airports
        </h1>

        {/* SCROLLABLE CONTENT */}
        <div
          className="
            flex-1
            overflow-y-auto
            pr-2
            space-y-10
          "
        >
          {/* FORM */}
          <div className="bg-brand/20 p-6 rounded-xl border border-plum/20 max-w-xl">
            <h2 className="text-xl text-gold mb-4">
              {editingId ? "Edit Airport" : "Create Airport"}
            </h2>

            <div className="flex flex-col gap-4">
              <input
                placeholder="Airport Name"
                className="p-3 rounded bg-dark/40 border border-brand/30"
                value={form.nameAirport}
                onChange={(e) =>
                  setForm({ ...form, nameAirport: e.target.value })
                }
              />

              <input
                placeholder="City"
                className="p-3 rounded bg-dark/40 border border-brand/30"
                value={form.cityAirport}
                onChange={(e) =>
                  setForm({ ...form, cityAirport: e.target.value })
                }
              />

              <input
                placeholder="Country"
                className="p-3 rounded bg-dark/40 border border-brand/30"
                value={form.countryAirport}
                onChange={(e) =>
                  setForm({ ...form, countryAirport: e.target.value })
                }
              />

              <button
                onClick={handleSubmit}
                className="bg-brand py-3 rounded-xl hover:bg-gold hover:text-dark transition"
              >
                {editingId ? "Update Airport" : "Create Airport"}
              </button>
            </div>
          </div>

          {/* LIST */}
          <div className="space-y-4 max-w-3xl">
            {airports.map((a) => (
              <div
                key={a.id}
                className="
                  flex justify-between items-center
                  bg-brand/10 p-5 rounded-xl
                  border border-plum/20
                "
              >
                <div>
                  <div className="font-semibold text-lg">{a.nameAirport}</div>
                  <div className="text-sm text-plum/60">
                    {a.cityAirport}, {a.countryAirport}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => startEdit(a)}
                    className="text-gold hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {airports.length === 0 && (
              <div className="text-plum/50 text-center py-10">
                No airports yet
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
