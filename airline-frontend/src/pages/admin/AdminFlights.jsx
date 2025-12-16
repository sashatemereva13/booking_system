import { useEffect, useState } from "react";
import api from "../../api/http";
import PageTransition from "../../components/PageTransition";

export default function AdminFlights() {
  const [flights, setFlights] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [airports, setAirports] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    flightsNumber: "",
    departureAirportId: "",
    arrivalAirportId: "",
    departureTime: "",
    arrivalTime: "",
    planeId: "",
    priceEconomy: "",
    priceEconomy: "",
    priceBusiness: "",
    priceFirst: "",
  });

  async function loadData() {
    const [f, p, a] = await Promise.all([
      api.get("/flights"),
      api.get("/planes"),
      api.get("/airports"),
    ]);

    setFlights(f.data);
    setPlanes(p.data);
    setAirports(a.data);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit() {
    if (
      !form.flightsNumber ||
      !form.departureAirportId ||
      !form.arrivalAirportId ||
      !form.departureTime ||
      !form.arrivalTime ||
      !form.planeId
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      await api.put(`/flights/${editingId}`, form);
    } else {
      await api.post("/flights", form);
    }

    setForm({
      flightsNumber: "",
      departureAirportId: "",
      arrivalAirportId: "",
      departureTime: "",
      arrivalTime: "",
      planeId: "",
      priceEconomy: "",
      priceBusiness: "",
      priceFirst: "",
    });

    setEditingId(null);
    loadData();
  }

  function startEdit(f) {
    setEditingId(f.id);
    setForm({
      flightsNumber: f.flightsNumber,
      departureAirportId: f.departureAirportId,
      arrivalAirportId: f.arrivalAirport.id,
      arrivalAirportId: f.arrivalAirport.id,
      departureTime: f.departureTime,
      arrivalTime: f.arrivalTime,
      planeId: f.plane.id,
      priceEconomy: f.priceEconomy,
      priceBusiness: f.priceBusiness,
      priceFirst: f.priceFirst,
    });
  }

  async function handleDelete(id) {
    if (!confirm("Delete this flight?")) return;
    await api.delete(`/flights/${id}`);
    loadData();
  }
  return (
    <PageTransition>
      <div className="h-full bg-dark text-plum p-10">
        <h1 className="font-display text-4xl text-gold mb-8">Manage Flights</h1>

        {/* FORM */}
        <div className="bg-brand/20 p-6 rounded-xl border border-plum/20 mb-10 max-w-3xl">
          <h2 className="text-xl text-gold mb-4">
            {editingId ? "Edit Flight" : "Create Flight"}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Flight Number"
              className="p-3 rounded bg-dark/40 border border-brand/30"
              value={form.flightNumber}
              onChange={(e) =>
                setForm({ ...form, flightNumber: e.target.value })
              }
            />

            <select
              className="p-3 rounded bg-dark/40 border border-brand/30"
              value={form.planeId}
              onChange={(e) => setForm({ ...form, planeId: e.target.value })}
            >
              <option value="">Select Plane</option>
              {planes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.brand} {p.model}
                </option>
              ))}
            </select>

            <select
              className="p-3 rounded bg-dark/40 border border-brand/30"
              value={form.departureAirportId}
              onChange={(e) =>
                setForm({ ...form, departureAirportId: e.target.value })
              }
            >
              <option value="">Departure Airport</option>
              {airports.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.cityAirport} ({a.nameAirport})
                </option>
              ))}
            </select>

            <select
              className="p-3 rounded bg-dark/40 border border-brand/30"
              value={form.arrivalAirportId}
              onChange={(e) =>
                setForm({ ...form, arrivalAirportId: e.target.value })
              }
            >
              <option value="">Arrival Airport</option>
              {airports.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.cityAirport} ({a.nameAirport})
                </option>
              ))}
            </select>

            <input
              type="datetime-local"
              className="p-3 rounded bg-dark/40 border border-brand/30"
              value={form.departureTime}
              onChange={(e) =>
                setForm({ ...form, departureTime: e.target.value })
              }
            />

            <input
              type="datetime-local"
              className="p-3 rounded bg-dark/40 border border-brand/30"
              value={form.arrivalTime}
              onChange={(e) =>
                setForm({ ...form, arrivalTime: e.target.value })
              }
            />

            <input
              placeholder="Economy Price"
              type="number"
              className="p-3 rounded bg-dark/40 border border-brand/30"
              value={form.priceEconomy}
              onChange={(e) =>
                setForm({ ...form, priceEconomy: e.target.value })
              }
            />

            <input
              placeholder="Business Price"
              type="number"
              className="p-3 rounded bg-dark/40 border border-brand/30"
              value={form.priceBusiness}
              onChange={(e) =>
                setForm({ ...form, priceBusiness: e.target.value })
              }
            />

            <input
              placeholder="First Price"
              type="number"
              className="p-3 rounded bg-dark/40 border border-brand/30"
              value={form.priceFirst}
              onChange={(e) => setForm({ ...form, priceFirst: e.target.value })}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-brand py-3 rounded-xl hover:bg-gold hover:text-dark transition"
          >
            {editingId ? "Update Flight" : "Create Flight"}
          </button>
        </div>

        {/* LIST */}
        <div className="space-y-4 max-w-4xl">
          {flights.map((f) => (
            <div
              key={f.id}
              className="bg-brand/10 p-5 rounded-xl border border-plum/20 flex justify-between"
            >
              <div>
                <div className="font-semibold text-lg">{f.flightNumber}</div>
                <div className="text-sm text-plum/60">
                  {f.departureAirport.cityAirport} →{" "}
                  {f.arrivalAirport.cityAirport}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => startEdit(f)}
                  className="text-gold hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(f.id)}
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
