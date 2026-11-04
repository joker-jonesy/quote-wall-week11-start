import { useEffect, useState } from "react";
import { apiFetch } from "../api";
import QuoteCard from "../components/QuoteCard";

export default function QuoteWall() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null); // quote whose request is in flight

  // Load every quote. apiFetch adds our token automatically; the server uses
  // it to tell us which quotes THIS user has saved (`savedByMe`).
  useEffect(() => {
    apiFetch("/quotes")
      .then((data) => setQuotes(data.quotes))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Save or un-save a quote. Notice we only send the QUOTE id; the server
  // works out the user from the token.
  async function toggleSaved(quote) {
    setBusyId(quote.id);
    setError("");
    try {
      if (quote.savedByMe) {
        await apiFetch(`/favorites/${quote.id}`, { method: "DELETE" });
      } else {
        await apiFetch("/favorites", { method: "POST", body: { quoteId: quote.id } });
      }
      // Update just this quote in local state so the UI reflects the change
      // without re-downloading everything.
      setQuotes((current) =>
        current.map((q) =>
          q.id === quote.id
            ? {
                ...q,
                savedByMe: !q.savedByMe,
                savedCount: q.savedCount + (q.savedByMe ? -1 : 1),
              }
            : q
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  if (loading) return <p className="muted">Loading quotes…</p>;

  return (
    <>
      <h1>Quote Wall</h1>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      <ul className="quote-list">
        {quotes.map((quote) => (
          <QuoteCard
            key={quote.id}
            quote={quote}
            actionLabel={quote.savedByMe ? "★ Saved" : "☆ Save"}
            actionClass={quote.savedByMe ? "saved" : "secondary"}
            onAction={() => toggleSaved(quote)}
            disabled={busyId === quote.id}
          />
        ))}
      </ul>
    </>
  );
}
