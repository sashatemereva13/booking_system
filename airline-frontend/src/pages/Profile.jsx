import { useEffect, useState } from "react";
import api from "../api/http";
import PageTransition from "../components/PageTransition";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const userRes = await api.get("/users/me");
        setUser(userRes.data);

        const clientRes = await api.get(`/clients/email/${userRes.data.email}`);
        setClient(clientRes.data);
      } catch (e) {
        console.error("Failed to load profile", e);
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
                <b>Name:</b> {user.firstName} {user.lastName}
              </p>
              <p>
                <b>Email:</b> {user.email}
              </p>
            </div>
          )}

          {/* CLIENT / MILES */}
          {client && (
            <div className="bg-brand/20 p-8 rounded-2xl border border-plum/20 text-center">
              <h2 className="text-2xl text-gold mb-4">Miles ✨</h2>

              <p className="text-lg">
                Total miles earned: <b>{client.miles}</b>
              </p>

              <p className="mt-4 text-plum/70">
                Keep flying to earn more miles.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
