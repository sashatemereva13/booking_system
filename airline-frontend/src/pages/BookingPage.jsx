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
    async function loadSeats() {
      try {
        const res = await api.get(`/flights/${id}/seats/filter`, {
          params: { available: true },
        });
        setAvailableSeats(res.data);
      } catch (e) {
        console.error(e);
        setAvailableSeats([]);
      } finally {
        setLoading(false);
      }
    }
    loadSeats();
  }, [id]);

  async function handleBooking() {
    if (!name || !email || !seatId) return alert("Please fill all fields");

    const [firstName, lastName = ""] = name.split(" ");

    try {
      await api.post("/bookings/create", null, {
        params: {
          flightId: id,
          seatId,
          passengerFirstName: firstName,
          passengerLastName: lastName,
          email,
        },
      });

      setSuccess(true);
      setTimeout(() => navigate("/my-trips"), 1700);
    } catch (e) {
      console.error(e);
      alert("Error creating booking");
    }
  }

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-dark text-gold text-xl font-primary">
        Loading seats…
      </div>
    );

  return (
    <PageTransition>
      <div className="h-screen flex justify-center p-6 bg-dark text-plum font-primary overflow-hidden">
        {/* Background glow accents */}
        <div className="absolute w-[450px] h-[450px] bg-brand/25 blur-[180px] -top-24 -left-24 rounded-full"></div>
        <div className="absolute w-[380px] h-[380px] bg-deep/30 blur-[160px] bottom-10 right-10 rounded-full"></div>

        {/* Booking Card */}
        <div
          className="
          relative z-10
          w-full max-w-xl 
          max-h-[80vh]
          bg-brand/20 backdrop-blur-xl
          border border-plum/20
          rounded-2xl
          shadow-[0_10px_40px_rgba(0,0,0,0.4)]
          flex flex-col
        "
        >
          {/* Title */}
          <h1 className="px-10 pt-10 pb-6 font-display text-center text-3xl md:text-4xl text-gold tracking-wide">
            Book Flight <span className="text-plum">#{id}</span>
          </h1>

          {/* FORM */}
          <div className="flex-1 overflow-y-auto p-5">
            {/* Name */}
            <div className="flex flex-col gap-5 text-lg">
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
                    {s.seatNumber} ({s.seatClass}) — {s.price.toFixed(2)}€
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="px-10 pb-8 pt-4 border-t border-plum/20">
            <button
              onClick={handleBooking}
              className="
      w-full bg-brand text-plum 
      py-3 rounded-xl text-xl font-[450]
      hover:bg-plum hover:text-dark
      transition-all duration-300
      shadow-[0_0_20px_rgba(28,59,92,0.3)]
      hover:shadow-[0_0_35px_rgba(213,201,158,0.35)]
    "
            >
              Confirm Booking
            </button>

            {success && (
              <div className="text-gold font-semibold text-center mt-4 animate-pulse">
                Booking Confirmed! ✈ Redirecting…
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
