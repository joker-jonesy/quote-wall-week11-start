import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";


export default function Login() {

  const location = useLocation();

  // ProtectedRoute remembers the page the user wanted in `location.state.from`
  // so we can send them back there after they log in.
  const from = location.state?.from?.pathname || "/";


  return (
    <></>
  );
}
