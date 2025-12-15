import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import api from "../api/http";

export default function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrips() {
      try {
        const email = localStorage.getItem("userEmail");

        const res = await api.get(`/bookings/email`, {
          params: { email },
        });
        setTrips(res.data);
      } catch (e) {
        console.error(e);
        setTrips([]);
      } finally {
        setLoading(false);
      }
    }
    loadTrips();
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-dark text-plum font-primary px-6 py-16 relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute w-[420px] h-[420px] bg-brand/25 blur-[180px] -top-24 -left-24 rounded-full"></div>
        <div className="absolute w-[400px] h-[400px] bg-deep/30 blur-[160px] bottom-10 right-10 rounded-full"></div>

        {/* Title */}
        <h1 className="font-display text-gold text-4xl md:text-5xl text-center tracking-wide mb-12 relative z-10">
          My Trips
        </h1>

        {/* Trips Container */}
        <div className="max-w-3xl mx-auto flex flex-col gap-8 relative z-10">
          {!loading && trips.length === 0 && (
            <p className="text-center text-plum/60 text-lg">
              You have no upcoming trips.
            </p>
          )}

          {loading && (
            <p className="text-center text-plum/60 text-lg">
              Loading your trips…
            </p>
          )}

          {trips.map((t) => (
            <div
              key={t.id}
              className="
              bg-brand/20 backdrop-blur-xl 
              border border-plum/20 
              rounded-2xl p-8 
              shadow-[0_10px_40px_rgba(0,0,0,0.35)]
              hover:shadow-[0_14px_55px_rgba(0,0,0,0.45)]
              transition cursor-pointer
            "
            >
              {/* Flight Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="text-3xl font-[500] text-plum">
                  {t.departureAirport} <span className="text-gold">→</span>{" "}
                  {t.arrivalAirport}
                </div>

                <div className="text-gold font-[450] text-lg tracking-wide">
                  {t.departureTime?.slice(0, 10)}
                </div>
              </div>

              {/* Flight Details */}
              <div className="grid grid-cols-2 gap-4 text-plum/80 text-sm">
                <div>
                  <span className="uppercase text-plum/50 text-[11px] tracking-widest">
                    Departure Time
                  </span>
                  <div className="font-[450] text-lg">
                    {t.departureTime?.slice(11, 16)}
                  </div>
                </div>

                <div>
                  <span className="uppercase text-plum/50 text-[11px] tracking-widest">
                    Seat
                  </span>
                  <div className="font-[450] text-lg">{t.seatNumber}</div>
                </div>

                <div>
                  <span className="uppercase text-plum/50 text-[11px] tracking-widest">
                    Price
                  </span>
                  <div className="font-[500] text-gold text-lg">
                    {t.pricePaid.toFixed(2)}€
                  </div>
                </div>

                <div>
                  <span className="uppercase text-plum/50 text-[11px] tracking-widest">
                    Booking ID
                  </span>
                  <div className="font-[450] text-lg">#{t.id}</div>
                </div>
              </div>

              {/* View Details Button */}
              <Link
                to={`/flight/${t.flightId}`}
                className="
                mt-6 inline-block 
                text-plum underline hover:text-gold 
                transition text-sm tracking-wide
              "
              >
                View Flight Details →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
