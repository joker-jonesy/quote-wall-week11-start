import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

// Shared frame for the logged-in pages: navbar on top, page below.
export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
