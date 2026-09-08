import { useEffect, useState } from "react";
import UpvoteButton from "./components/UpvoteButton";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth, db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [hazards, setHazards] = useState<any[]>([]);
  const [verifiedNearby, setVerifiedNearby] = useState<any[]>([]);

  useEffect(() => {
    signInAnonymously(auth)
      .then(() => console.log("Sign-in request sent"))
      .catch((error) => console.error("Error:", error));

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function fetchNearbyHazards() {
      const hazardsRef = collection(db, "hazards");
      const q = query(
        hazardsRef,
        where("lat", ">=", 26.85),
        where("lat", "<=", 26.95)
      );
      const snapshot = await getDocs(q);
      const results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHazards(results);
    }
    fetchNearbyHazards();
  }, []);

  useEffect(() => {
  async function fetchNearbyVerifiedHazards() {
    const hazardsRef = collection(db, "hazards");
    const q = query(
      hazardsRef,
      where("lat", ">=", 26.85),
      where("lat", "<=", 26.95),
      where("status", "==", "verified")
    );
    const snapshot = await getDocs(q);
    const results = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setVerifiedNearby(results);
  }
  fetchNearbyVerifiedHazards();
}, []);

  return (
    <div>
      <h1>Firebase Auth Test</h1>
      {user ? (
        <p>✅ Logged in! User ID: {user.uid}</p>
      ) : (
        <p>⏳ Signing in...</p>
      )}

      <h2>Nearby Hazards</h2>
{hazards.map((hazard) => (
  <div key={hazard.id}>
    <p>{hazard.type} at ({hazard.lat}, {hazard.lng}) — {hazard.status}</p>
    <UpvoteButton reportId={hazard.id} initialUpvotes={hazard.upvotes || 0} />
  </div>
))}
<h2>Nearby Verified Reports (Kanza's Screen Data)</h2>
{verifiedNearby.map((hazard) => (
  <p key={hazard.id}>
    {hazard.type} at ({hazard.lat}, {hazard.lng}) — {hazard.status}
  </p>
))}
    </div>
  );
}

export default App;
