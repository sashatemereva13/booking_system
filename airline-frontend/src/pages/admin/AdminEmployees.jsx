import { useEffect, useState } from "react";
import api from "../../api/http";
import PageTransition from "../../components/PageTransition";

export default function AdminEmployees() {
  const [employees, setEmployees] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    userId: "",
    profession: "",
    title: "",
  });

  async function loadData() {
    const [e, u] = await Promise.all([
      api.get("/employees"),
      api.get("/users"),
    ]);
    setEmployees(e.data);
    setUsers(u.data);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit() {
    if (!form.userId || !form.profession || !form.title) {
      alert("Missing fields");
      return;
    }

    if (editingId) {
      await api.put(`/employees/${editingId}`, form);
    } else {
      await api.post("/employees", form);
    }

    setForm({ userId: "", profession: "", title: "" });
    setEditingId(null);
    loadData();
  }

  function startEdit(e) {
    setEditingId(e.id);
    setForm({
      userId: e.user.id,
      profession: e.profession,
      title: e.title,
    });
  }

  async function handleDelete(id) {
    if (!confirm("Delete this employee?")) return;
    await api.delete(`/employees/${id}`);
    loadData();
  }

  return (
    <PageTransition>
      <div className="h-full bg-dark text-plum p-10">
        <h1 className="font-display text-4xl text-gold mb-8">
          Manage Employees
        </h1>

        {/* FORM */}
        <div className="bg-brand/20 p-6 rounded-xl border border-plum/20 mb-10 max-w-xl">
          <h2 className="text-xl text-gold mb-4">
            {editingId ? "Edit Employee" : "Create Employee"}
          </h2>

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
              placeholder="Profession"
              className="p-3 rounded bg-dark/40 border border-brand/30"
              value={form.profession}
              onChange={(e) => setForm({ ...form, profession: e.target.value })}
            />

            <input
              placeholder="Title"
              className="p-3 rounded bg-dark/40 border border-brand/30"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <button
              onClick={handleSubmit}
              className="bg-brand py-3 rounded-xl hover:bg-gold hover:text-dark transition"
            >
              {editingId ? "Update Employee" : "Create Employee"}
            </button>
          </div>
        </div>

        {/* LIST */}
        <div className="space-y-4 max-w-3xl">
          {employees.map((e) => (
            <div
              key={e.id}
              className="flex justify-between items-center bg-brand/10 p-5 rounded-xl border border-plum/20"
            >
              <div>
                <div className="font-semibold">
                  {e.user.firstname} {e.user.lastname}
                </div>
                <div className="text-sm text-plum/60">
                  {e.profession} — {e.title}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => startEdit(e)}
                  className="text-gold hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(e.id)}
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
