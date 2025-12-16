import { Link } from "react-router-dom";
import PageTransition from "../../components/PageTransition";

export default function AdminDashboard() {
  return (
    <PageTransition>
      <div className="h-full bg-dark text-plum p-10">
        <h1 className="font-display text-4xl text-gold mb-10">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          {[
            { to: "/admin/planes", label: "Manage Planes ✈️" },
            { to: "/admin/airports", label: "Manage Airports 🌍" },
            { to: "/admin/flights", label: "Manage Flights 🛫" },
            { to: "/admin/users", label: "Manage Users 👤" },
            { to: "/admin/clients", label: "Manage Clients 🧾" },
            { to: "/admin/employees", label: "Manage Employees 🧑‍✈️" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="
                bg-brand/20 backdrop-blur-xl
                border border-plum/20
                rounded-xl p-6 text-center
                hover:bg-brand/30 hover:text-gold
                transition shadow-md
              "
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
