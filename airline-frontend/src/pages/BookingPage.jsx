import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/http";
import PageTransition from "../components/PageTransition";

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [seatId, setSeatId] = useState(null);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  // ---- Mock seats (replace with backend later) ----
  useEffect(() => {
    setTimeout(() => {
      setAvailableSeats([
        { id: 1, seat: "12A", price: 220 },
        { id: 2, seat: "14C", price: 220 },
        { id: 3, seat: "3B", price: 480 },
      ]);
      setLoading(false);
    }, 400);
  }, [id]);

  async function handleBooking() {
    if (!name || !email || !seatId) return alert("Please fill all fields");

    // await api.post("/bookings/create", { flightId: id, seatId, name, email });

    setSuccess(true);
    setTimeout(() => navigate("/my-trips"), 1700);
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark text-gold text-xl font-primary">
        Loading seats…
      </div>
    );

  return (
    <PageTransition>
      <div className="min-h-screen bg-dark text-plum font-primary flex justify-center items-center p-6 relative overflow-hidden">
        {/* Background glow accents */}
        <div className="absolute w-[450px] h-[450px] bg-brand/25 blur-[180px] -top-24 -left-24 rounded-full"></div>
        <div className="absolute w-[380px] h-[380px] bg-deep/30 blur-[160px] bottom-10 right-10 rounded-full"></div>

        {/* Booking Card */}
        <div
          className="
          relative z-10
          w-full max-w-xl 
          bg-brand/20 backdrop-blur-xl
          border border-plum/20
          rounded-2xl p-10
          shadow-[0_10px_40px_rgba(0,0,0,0.4)]
        "
        >
          {/* Title */}
          <h1 className="font-display text-center text-3xl md:text-4xl text-gold tracking-wide mb-8">
            Book Flight <span className="text-plum">#{id}</span>
          </h1>

          {/* FORM */}
          <div className="flex flex-col gap-5 text-lg">
            {/* Name */}
            <div className="flex flex-col text-left">
              <label className="text-plum/70 mb-1 text-sm tracking-wide">
                Full Name
              </label>
              <input
                className="
                bg-dark/40 border border-brand/30 rounded-lg 
                p-3 text-plum placeholder-plum/40 
                focus:outline-none focus:border-gold/50 transition
              "
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col text-left">
              <label className="text-plum/70 mb-1 text-sm tracking-wide">
                Email Address
              </label>
              <input
                className="
                bg-dark/40 border border-brand/30 rounded-lg 
                p-3 text-plum placeholder-plum/40
                focus:outline-none focus:border-gold/50 transition
              "
                placeholder="name@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Seats */}
            <div className="mt-3">
              <p className="text-gold font-[500] mb-3">Choose Seat</p>

              <div className="grid grid-cols-2 gap-3">
                {availableSeats.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSeatId(s.id)}
                    className={`
                    p-3 rounded-xl border text-lg tracking-wide 
                    transition backdrop-blur-sm
                    ${
                      seatId === s.id
                        ? "bg-brand text-plum border-brand shadow-md"
                        : "bg-dark/40 text-plum/80 border-plum/20 hover:border-gold hover:text-gold"
                    }
                  `}
                  >
                    {s.seat} — {s.price}€
                  </button>
                ))}
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleBooking}
              className="
              mt-6 bg-brand text-plum 
              py-3 rounded-xl text-xl font-[450]
              hover:bg-plum hover:text-dark
              transition-all duration-300 w-full
              shadow-[0_0_20px_rgba(28,59,92,0.3)]
              hover:shadow-[0_0_35px_rgba(213,201,158,0.35)]
            "
            >
              Confirm Booking
            </button>
          </div>

          {/* Success Message */}
          {success && (
            <div className="text-gold font-semibold text-center mt-6 animate-pulse">
              Booking Confirmed! ✈ Redirecting…
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
