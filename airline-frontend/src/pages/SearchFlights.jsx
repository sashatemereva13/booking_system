import { useState } from "react";
import api from "../api/http";
import PageTransition from "../components/PageTransition";

export default function SearchFlights() {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!departure || !arrival || !date) {
      alert("Please fill all fields");
      return;
    }

    console.log("CLICKED");
    setLoading(true);
    console.log("LOADING TRUE");

    try {
      const res = await api.get("/flights/search", {
        params: {
          departureCity: departure,
          arrivalCity: arrival,
          date,
        },
      });
      console.log("API RESPONSE:", res.data);
      setResults(res.data);
    } catch (e) {
      console.error(e);
      alert("Error searching flights");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageTransition>
      {/* PAGE — fixed height, no scroll */}
      <div className="h-full overflow-hidden bg-dark text-plum font-primary px-6 py-10 flex flex-col items-center">
        {/* TITLE */}
        <h1 className="font-display text-4xl md:text-5xl text-gold tracking-wide mb-8">
          Find Your Next Flight
        </h1>

        {/* CONTENT FRAME (controls layout height) */}
        <div
          className="    w-full max-w-6xl h-[70vh]
    grid grid-cols-1 md:grid-cols-[420px_1fr]
     gap-6"
        >
          {/* SEARCH FORM — fixed */}
          <div
            className="
              bg-brand/20 backdrop-blur-xl
              border border-plum/20
              rounded-2xl p-8
              shadow-[0_8px_40px_rgba(0,0,0,0.35)]
              flex flex-col gap-5
            "
          >
            {/* Departure */}
            <div className="flex flex-col text-left">
              <label className="text-plum/70 mb-1 text-sm tracking-wide">
                Departure City
              </label>
              <input
                className="
                  bg-dark/40 border border-brand/30 rounded-lg
                  p-3 text-plum placeholder-plum/40
                  focus:outline-none focus:border-gold/50 transition
                "
                type="text"
                placeholder="e.g. Paris"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
              />
            </div>

            {/* Arrival */}
            <div className="flex flex-col text-left">
              <label className="text-plum/70 mb-1 text-sm tracking-wide">
                Arrival City
              </label>
              <input
                className="
                  bg-dark/40 border border-brand/30 rounded-lg
                  p-3 text-plum placeholder-plum/40
                  focus:outline-none focus:border-gold/50 transition
                "
                type="text"
                placeholder="e.g. London"
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
              />
            </div>

            {/* Date */}
            <div className="flex flex-col text-left">
              <label className="text-plum/70 mb-1 text-sm tracking-wide">
                Date
              </label>
              <input
                className="
                  bg-dark/40 border border-brand/30 rounded-lg
                  p-3 text-plum focus:outline-none
                  focus:border-gold/50 transition
                "
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={handleSearch}
              className="
                mt-4 py-3 rounded-xl text-lg
                bg-brand text-plum font-[450]
                hover:bg-plum hover:text-dark
                transition-all duration-300
                shadow-[0_0_20px_rgba(28,59,92,0.3)]
                hover:shadow-[0_0_35px_rgba(213,201,158,0.35)]
              "
            >
              {loading ? "Searching..." : "Search Flights ✈"}
            </button>
          </div>

          {/* RESULTS — scrollable ONLY here */}
          <div
            className="    md:h-full
    md:overflow-y-auto
    pr-2"
          >
            {results.length === 0 && !loading && (
              <div className="text-plum/50 text-center mt-10">
                No flights yet — try searching ✈️
              </div>
            )}

            <div className="flex flex-col gap-5">
              {results.map((f) => (
                <div
                  key={f.id}
                  className="
                    bg-brand/10 border border-brand/20
                    rounded-xl p-6 shadow-md
                    hover:bg-brand/20 hover:shadow-lg
                    transition backdrop-blur-md
                  "
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-lg font-[500]">
                      {f.departureAirport} → {f.arrivalAirport}
                    </div>
                    <div className="text-gold">
                      {f.departureTime?.slice(11, 16)} –{" "}
                      {f.arrivalTime?.slice(11, 16)}
                    </div>
                  </div>

                  <div className="text-sm text-plum/60 mb-1">
                    Flight {f.flightNumber}
                  </div>

                  <div className="text-sm text-plum/70 mb-2">
                    Eco {f.economyAvailable} · Business {f.businessAvailable} ·
                    First {f.firstAvailable}
                  </div>

                  <div className="text-gold font-semibold">
                    Economy from €{f.priceEconomy}
                  </div>

                  <a
                    href={`/flight/${f.id}`}
                    className="text-plum underline hover:text-gold text-sm mt-2 inline-block transition"
                  >
                    View Details →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
