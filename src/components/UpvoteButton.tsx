import { useState } from "react";
import { doc, runTransaction } from "firebase/firestore";
import { db } from "../firebase";

export default function UpvoteButton({ reportId, initialUpvotes = 0 }: { reportId: string; initialUpvotes?: number }) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpvote() {
    if (loading) return;
    setLoading(true);
    setError(null);
    const reportRef = doc(db, "hazards", reportId);
    try {
      const newUpvotes = await runTransaction(db, async (transaction) => {
        const reportDoc = await transaction.get(reportRef);
        if (!reportDoc.exists()) {
          throw new Error("Report not found");
        }
        const currentUpvotes = reportDoc.data().upvotes || 0;
        const updatedUpvotes = currentUpvotes + 1;
        transaction.update(reportRef, {
          upvotes: updatedUpvotes,
          status: updatedUpvotes >= 3 ? "verified" : "pending",
        });
        return updatedUpvotes;
      });
      setUpvotes(newUpvotes);
    } catch (err) {
      console.error("Upvote failed:", err);
      setError("Upvote nahi ho paya, dobara try karo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="upvote-container">
      <button onClick={handleUpvote} disabled={loading}>
        {loading ? "..." : `👍 Upvote (${upvotes})`}
      </button>
      {error && <p className="upvote-error">{error}</p>}
    </div>
  );
}