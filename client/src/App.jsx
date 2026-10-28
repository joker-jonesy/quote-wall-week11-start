// Starting point for the Week 11 demo. Nothing here knows about logins yet.
//
// Build order we'll follow:
//   1. src/api.js              - one fetch helper that adds the Bearer token
//   2. src/auth/AuthContext.jsx - AuthProvider + useAuth (token in localStorage, restore via /me)
//   3. Login + Signup pages    - show the API's error message
//   4. src/auth/ProtectedRoute.jsx + Navbar with Log out
//   5. Quote Wall + My Favorites pages (QuoteCard is already provided)
export default function App() {
  return (
    <main className="container">
      <h1>Quote Wall</h1>
      <p className="muted">Nothing here yet. Let's add authentication.</p>
    </main>
  );
}
