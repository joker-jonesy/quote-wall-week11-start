// Presentational component: shows one quote and one action button.
// It knows nothing about the API; the parent page passes in what to do.
export default function QuoteCard({ quote, actionLabel, actionClass, onAction, disabled }) {
  return (
    <li className="card quote">
      <blockquote>“{quote.text}”</blockquote>
      <p className="author">— {quote.author}</p>

      <div className="quote-footer">
        {/* savedCount only exists on the Wall; it's just a number, never names */}
        {quote.savedCount !== undefined && (
          <span className="muted">
            Saved by {quote.savedCount} {quote.savedCount === 1 ? "member" : "members"}
          </span>
        )}
        <button className={actionClass} onClick={onAction} disabled={disabled}>
          {actionLabel}
        </button>
      </div>
    </li>
  );
}
