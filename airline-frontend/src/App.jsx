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

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchFlights />} />
        <Route path="/flight/:id" element={<FlightDetails />} />
        <Route path="/book/:id" element={<BookingPage />} />
        <Route path="/my-trips" element={<MyTrips />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
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
