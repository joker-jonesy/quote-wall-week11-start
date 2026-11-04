import { useState } from "react";

// A reusable email + password form used by both the Login and Signup pages.
//
// Props:
//   title        - heading text
//   submitLabel  - button text
//   onSubmit     - async (email, password) => void. If it throws, we show
//                  the error's message (which came straight from the API).
//   footer       - extra content under the form (e.g. a link to the other page)
export default function AuthForm({ title, submitLabel, onSubmit, footer }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault(); // stop the browser's full-page form submit
        setError("");
        setSubmitting(true);
        try {
            await onSubmit(email, password);
            // On success AuthProvider sets `user`, and the page redirects.
        } catch (err) {
            // e.g. "Invalid email or password." / "An account with that email
            // already exists." / "Password must be at least 8 characters."
            setError(err.message);
            setSubmitting(false);
        }
    }

    return (
        <div className="card auth-card">
            <h1>{title}</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                    />
                </label>

                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete={submitLabel === "Log in" ? "current-password" : "new-password"}
                        required
                    />
                </label>

                {/* role="alert" makes screen readers announce the error */}
                {error && (
                    <p className="error" role="alert">
                        {error}
                    </p>
                )}

                <button type="submit" disabled={submitting}>
                    {submitting ? "Please wait…" : submitLabel}
                </button>
            </form>

            <p className="muted">{footer}</p>
        </div>
    );
}