import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../api";
import QuoteCard from "../components/QuoteCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // GET /favorites returns ONLY the logged-in user's saved quotes. The server
  // picks them using the id inside our token; we don't send a user id.
  useEffect(() => {
    apiFetch("/favorites")
      .then((data) => setFavorites(data.favorites))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function remove(quote) {
    setError("");
    try {
      await apiFetch(`/favorites/${quote.id}`, { method: "DELETE" });
      setFavorites((current) => current.filter((q) => q.id !== quote.id));
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p className="muted">Loading your favorites…</p>;

  return (
    <>
      <h1>My Favorites</h1>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      {favorites.length === 0 ? (
        <p className="muted">
          You haven't saved any quotes yet. Head to the <Link to="/">Quote Wall</Link> and tap
          Save on one you like.
        </p>
      ) : (
        <ul className="quote-list">
          {favorites.map((quote) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              actionLabel="Remove"
              actionClass="danger"
              onAction={() => remove(quote)}
            />
          ))}
        </ul>
      )}
    </>
  );
}
