import { useEffect, useState } from "react";
import api from "../../api/http";
import PageTransition from "../../components/PageTransition";

export default function AdminAirports() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  async function loadUsers() {
    const res = await api.get("/users");
    setUsers(res.data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleSubmit() {
    if (!form.firstName || !form.lastName || !form.email) {
      alert("Missing fields");
      return;
    }

    if (editingId) {
      await api.put(`/users/${editingId}`, form);
    } else {
      await api.post("/users", form);
    }

    setForm({ firstName: "", lastName: "", email: "", phone: "" });
    setEditingId(null);
    loadUsers();
  }

  function startEdit(u) {
    setEditingId(u.id);
    setForm({
      firstname: u.firstname,
      lastname: u.lastname,
      email: u.email,
      phone: u.phone || "",
    });
  }

  async function handleDelete(id) {
    if (!confirm("Delete this user?")) return;
    await api.delete(`/users/${id}`);
    loadUsers();
  }

  return (
    <PageTransition>
      <div className="h-full bg-dark text-plum p-10">
        <h1 className="font-display text-4xl text-gold mb-8">Manage Users</h1>

        {/* FORM */}
        <div className="bg-brand/20 p-6 rounded-xl border border-plum/20 mb-10 max-w-xl">
          <h2 className="text-xl text-gold mb-4">
            {editingId ? "Edit User" : "Create User"}
          </h2>

          <div className="flex flex-col gap-4">
            <input
              placeholder="First name"
              className="p-3 rounded bg-dark/40 border border-brand/30"
              value={form.firstname}
              onChange={(e) => setForm({ ...form, firstname: e.target.value })}
            />

            <input
              placeholder="Last name"
              className="p-3 rounded bg-dark/40 border border-brand/30"
              value={form.lastname}
              onChange={(e) => setForm({ ...form, lastname: e.target.value })}
            />

            <input
              placeholder="Email"
              className="p-3 rounded bg-dark/40 border border-brand/30"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              placeholder="Phone"
              className="p-3 rounded bg-dark/40 border border-brand/30"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <button
              onClick={handleSubmit}
              className="bg-brand py-3 rounded-xl hover:bg-gold hover:text-dark transition"
            >
              {editingId ? "Update User" : "Create User"}
            </button>
          </div>
        </div>

        {/* LIST */}
        <div className="space-y-4 max-w-3xl">
          {users.map((u) => (
            <div
              key={u.id}
              className="flex justify-between items-center bg-brand/10 p-5 rounded-xl border border-plum/20"
            >
              <div>
                <div className="font-semibold">
                  {u.firstname} {u.lastname}
                </div>
                <div className="text-sm text-plum/60">{u.email}</div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => startEdit(u)}
                  className="text-gold hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
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
