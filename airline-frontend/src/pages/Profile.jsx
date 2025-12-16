import { useEffect, useState } from "react";
import api from "../api/http";
import PageTransition from "../components/PageTransition";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [client, setClient] = useState(null);
  const [reward, setReward] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        // 1️⃣ User
        const userRes = await api.get("/users/me");
        setUser(userRes.data);

        // 2️⃣ Client
        const clientRes = await api.get(`/clients/user/${userRes.data.id}`);
        setClient(clientRes.data);

        // 3️⃣ Miles / Rewards
        const milesRes = await api.get(`/miles/${clientRes.data.id}`);
        setReward(milesRes.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gold text-xl">
        Loading profile…
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-dark text-plum px-6 py-16 font-primary">
        <h1 className="font-display text-5xl text-gold text-center mb-14">
          My Profile
        </h1>

        <div className="max-w-3xl mx-auto space-y-10">
          {/* USER INFO */}
          {user && (
            <div className="bg-brand/20 p-8 rounded-2xl border border-plum/20">
              <h2 className="text-2xl text-gold mb-4">Personal Information</h2>

              <p>
                <b>Name:</b> {user.firstname} {user.lastname}
              </p>
              <p>
                <b>Email:</b> {user.email}
              </p>
            </div>
          )}

          {/* CLIENT INFO */}
          {client && (
            <div className="bg-brand/20 p-8 rounded-2xl border border-plum/20">
              <h2 className="text-2xl text-gold mb-4">Client Details</h2>

              <p>
                <b>Passport Number:</b> {client.passportNumber}
              </p>
              <p>
                <b>Client ID:</b> {client.id}
              </p>
            </div>
          )}

          {/* MILES & REWARDS */}
          {reward && (
            <div className="bg-brand/20 p-8 rounded-2xl border border-plum/20 text-center">
              <h2 className="text-2xl text-gold mb-4">Miles & Rewards ✨</h2>

              <p className="text-lg">
                Flights this year: <b>{reward.totalFlightsThisYear}</b>
              </p>

              {reward.discountCode ? (
                <p className="mt-4 text-gold text-xl font-semibold">
                  🎁 Your discount code: {reward.discountCode}
                </p>
              ) : (
                <p className="mt-4 text-plum/70">
                  {3 - reward.totalFlightsThisYear} more flight(s) to unlock a
                  discount
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
