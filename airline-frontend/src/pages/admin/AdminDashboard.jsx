import { Link } from "react-router-dom";
import PageTransition from "../../components/PageTransition";

const items = [
  {
    to: "/admin/planes",
    title: "Planes",
    subtitle: "Fleet configuration",
    icon: "✈️",
  },
  {
    to: "/admin/airports",
    title: "Airports",
    subtitle: "Locations & hubs",
    icon: "🌍",
  },
  {
    to: "/admin/flights",
    title: "Flights",
    subtitle: "Schedules & pricing",
    icon: "🛫",
  },
  {
    to: "/admin/users",
    title: "Users",
    subtitle: "Accounts & profiles",
    icon: "👤",
  },
  {
    to: "/admin/clients",
    title: "Clients",
    subtitle: "Passengers & loyalty",
    icon: "🧾",
  },
  {
    to: "/admin/employees",
    title: "Employees",
    subtitle: "Crew & staff",
    icon: "🧑‍✈️",
  },
];

export default function AdminDashboard() {
  return (
    <PageTransition>
      <div className="h-full bg-dark text-plum p-10 relative overflow-hidden">
        {/* subtle background glows */}
        <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-brand/20 blur-[200px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[380px] h-[380px] bg-gold/10 blur-[180px] rounded-full" />

        {/* header */}
        <div className="relative z-10 mb-12">
          <h1 className="font-display text-5xl text-gold mb-2">
            Admin Dashboard
          </h1>
          <p className="text-plum/70">
            Manage your airline system from one place
          </p>
        </div>

        {/* cards */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="
                group relative
                bg-brand/15 backdrop-blur-xl
                border border-plum/20
                rounded-2xl p-6
                transition-all duration-300
                hover:bg-brand/25 hover:border-gold/40
                hover:-translate-y-1
                hover:shadow-[0_0_30px_rgba(255,215,150,0.15)]
              "
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <div className="text-xl font-semibold text-gold group-hover:text-gold">
                    {item.title}
                  </div>
                  <div className="text-sm text-plum/60">{item.subtitle}</div>
                </div>
              </div>

              {/* hover accent */}
              <div
                className="
                  absolute inset-0 rounded-2xl
                  pointer-events-none
                  opacity-0 group-hover:opacity-100
                  transition
                  border border-gold/30
                "
              />
            </Link>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
