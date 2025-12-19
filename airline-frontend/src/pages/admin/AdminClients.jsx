import { useEffect, useState } from "react";
import api from "../../api/http";
import PageTransition from "../../components/PageTransition";

export default function AdminClients() {
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    userId: "",
    passportNumber: "",
  });

  async function loadData() {
    const [c, u] = await Promise.all([api.get("/clients"), api.get("/users")]);
    setClients(c.data);
    setUsers(u.data);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit() {
    if (!form.userId || !form.passportNumber) {
      alert("Missing fields");
      return;
    }

    await api.post("/clients", form);
    setForm({ userId: "", passportNumber: "" });
    loadData();
  }

  async function handleDelete(passportNumber) {
    if (!confirm("Delete this client?")) return;
    await api.delete(`/clients/${passportNumber}`);
    loadData();
  }

  return (
    <PageTransition>
      <div className="h-full bg-dark text-plum p-10 flex flex-col">
        {/* HEADER */}
        <h1 className="font-display text-4xl text-gold mb-6">Manage Clients</h1>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-10">
          {/* FORM */}
          <div className="bg-brand/20 p-6 rounded-xl border border-plum/20 max-w-xl">
            <h2 className="text-xl text-gold mb-4">Create Client</h2>

            <div className="flex flex-col gap-4">
              <select
                className="p-3 rounded bg-dark/40 border border-brand/30"
                value={form.userId}
                onChange={(e) => setForm({ ...form, userId: e.target.value })}
              >
                <option value="">Select User</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.firstname} {u.lastname}
                  </option>
                ))}
              </select>

              <input
                placeholder="Passport Number"
                className="p-3 rounded bg-dark/40 border border-brand/30"
                value={form.passportNumber}
                onChange={(e) =>
                  setForm({ ...form, passportNumber: e.target.value })
                }
              />

              <button
                onClick={handleSubmit}
                className="bg-brand py-3 rounded-xl hover:bg-gold hover:text-dark transition"
              >
                Create Client
              </button>
            </div>
          </div>

          {/* LIST */}
          <div className="space-y-4 max-w-3xl">
            {clients.map((c) => (
              <div
                key={c.passportNumber}
                className="flex justify-between items-center bg-brand/10 p-5 rounded-xl border border-plum/20"
              >
                <div>
                  <div className="font-semibold">
                    {c.user
                      ? `${c.user.firstname} ${c.user.lastname}`
                      : "Unknown User"}
                  </div>
                  <div className="text-sm text-plum/60">
                    Passport: {c.passportNumber}
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(c.passportNumber)}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}

            {clients.length === 0 && (
              <div className="text-plum/50 text-center py-10">
                No clients found
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
