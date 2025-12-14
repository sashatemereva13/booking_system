import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/http";
import PageTransition from "../components/PageTransition";

function computeDuration(start, end) {
  if (!start || !end) return "N/A";

  const diff = new Date(end) - new Date(start);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return `${h}h ${m}m`;
}

export default function FlightDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---------------- MOCK data until backend integration ----------------
  useEffect(() => {
    async function loadFlight() {
      try {
        const res = await api.get(`/flights/${id}`);
        setFlight(res.data);
      } catch (e) {
        console.error(e);
        setFlight(null);
      } finally {
        setLoading(false);
      }
    }

    loadFlight();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gold text-xl">
        Loading flight details...
      </div>
    );

  if (!flight)
    return (
      <div className="p-10 text-center text-brand text-xl">
        Flight not found
      </div>
    );

  return (
    <PageTransition>
      <div className="min-h-screen bg-dark text-white flex justify-center py-16 px-4">
        <div className="w-full max-w-3xl bg-deep rounded-2xl p-10 shadow-2xl border border-gold/25">
          {/* Header */}
          <h1 className="text-5xl font-bold text-center mb-2 tracking-wide text-gold">
            {flight.departureAirport}
            <span className="text-sunset"> → </span>
            {flight.arrivalAirport}
          </h1>

          <p className="text-gray-300 text-center text-lg mb-10">
            {flight.departureTime?.slice(0, 10)}
          </p>

          {/* Info Box */}
          <div className="bg-dark/60 border border-gold/30 p-8 rounded-2xl space-y-4 text-lg shadow-inner">
            <div className="flex justify-between">
              <span className="text-gray-300">Time</span>
              <b className="text-white">
                {flight.departureTime?.slice(11, 16)} →{" "}
                {flight.arrivalTime?.slice(11, 16)}
              </b>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">Duration</span>
              <b className="text-white">
                {computeDuration(flight.departureTime, flight.arrivalTime)}
              </b>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">Aircraft</span>
              <b className="text-white">{flight.plane}</b>
            </div>

            <div className="space-y-3 pt-4 text-sm">
              <div className="flex justify-between">
                <span>Economy</span>
                <span className="text-gold">
                  {flight.economySeatsLeft} seats · €{flight.priceEconomy}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Business</span>
                <span className="text-gold">
                  {flight.businessSeatsLeft} seats · €{flight.priceBusiness}
                </span>
              </div>

              <div className="flex justify-between">
                <span>First</span>
                <span className="text-gold">
                  {flight.firstSeatsLeft} seats · €{flight.priceFirst}
                </span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => navigate(`/book/${flight.id}`)}
            className="
            mt-10 w-full py-4 rounded-xl text-xl font-bold tracking-wide
            bg-brand hover:bg-gold hover:text-dark
            transition-all shadow-lg
          "
          >
            Book This Flight
          </button>
        </div>
      </div>
    </PageTransition>
  );
}
