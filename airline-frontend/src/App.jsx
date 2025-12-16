import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  NavLink,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import SearchFlights from "./pages/SearchFlights.jsx";
import FlightDetails from "./pages/FlightDetails.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import MyTrips from "./pages/MyTrips.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuth } from "./auth/AuthContext.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminPlanes from "./pages/admin/AdminPlanes.jsx";
import Profile from "./pages/Profile.jsx";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/my-trips"
          element={
            <ProtectedRoute>
              <MyTrips />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/planes"
          elenebt={
            <ProtectedRoute>
              <AdminPlanes />
            </ProtectedRoute>
          }
        />

        <Route path="/search" element={<SearchFlights />} />
        <Route path="/flight/:id" element={<FlightDetails />} />
        <Route
          path="/book/:id"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const { isLogged, logout } = useAuth();

  return (
    <BrowserRouter>
      <div className="h-[100dvh] flex flex-col bg-dark">
        {/* ✨ NAVBAR */}
        <nav
          className="
          font-primary 
          bg-deep text-plum 
          px-10 py-6 
          flex justify-between items-center
          border-b border-gold/10
          backdrop-blur-md 
          shadow-[0_2px_20px_rgba(0,0,0,0.3)]
        "
        >
          {/* BRAND */}
          <h1
            className="
          text-3xl 
          font-display tracking-wide 
          text-gold 
          hover:text-plum 
          transition-colors duration-300 cursor-pointer
        "
          >
            Timeout Airline ✈
          </h1>

          {/* NAV LINKS */}
          <div className="flex gap-12 text-lg font-[350]">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition-all duration-200 ${
                  isActive
                    ? "text-gold border-b-2 border-gold pb-1"
                    : "text-plum hover:text-gold"
                }`
              }
            >
              Home
            </NavLink>

            {isLogged && (
              <>
                <NavLink
                  to="/search"
                  className={({ isActive }) =>
                    `transition-all duration-200 ${
                      isActive
                        ? "text-gold border-b-2 border-gold pb-1"
                        : "text-plum hover:text-gold"
                    }`
                  }
                >
                  Search Flights
                </NavLink>

                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `transition-all duration-200 ${
                      isActive
                        ? "text-gold border-b-2 border-gold pb-1"
                        : "text-plum hover:text-gold"
                    }`
                  }
                >
                  Profile
                </NavLink>

                <NavLink
                  to="/my-trips"
                  className={({ isActive }) =>
                    `transition-all duration-200 ${
                      isActive
                        ? "text-gold border-b-2 border-gold pb-1"
                        : "text-plum hover:text-gold"
                    }`
                  }
                >
                  My Trips
                </NavLink>

                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive
                      ? "text-gold border-b-2 border-gold pb-1"
                      : "text-plum hover:text-gold"
                  }
                >
                  Admin
                </NavLink>

                <button onClick={logout} className="hover:text-gold">
                  Logout
                </button>
              </>
            )}

            {!isLogged && (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `transition-all duration-200 ${
                      isActive
                        ? "text-gold border-b-2 border-gold pb-1"
                        : "text-plum hover:text-gold"
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `transition-all duration-200 ${
                      isActive
                        ? "text-gold border-b-2 border-gold pb-1"
                        : "text-plum hover:text-gold"
                    }`
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </nav>

        {/* ✨ MAIN PAGE CONTAINER */}
        <main
          className="
          flex-1
          overflow-hidden
          font-primary 
          bg-dark text-plum 
          px-5 py-5 
          selection:bg-gold/20 selection:text-gold
        "
        >
          <AnimatedRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}
