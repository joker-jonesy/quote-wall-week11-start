import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import AuthForm from "../components/AuthForm.jsx";


export default function Login() {
    const {user, loading, login} = useAuth();
    const location = useLocation();

  // ProtectedRoute remembers the page the user wanted in `location.state.from`
  // so we can send them back there after they log in.
  const from = location.state?.from?.pathname || "/";

  if(loading) return null;
  if(user) return <Navigate to={from} replace />;


  return (
    <AuthForm
     title={"Log In"}
    submitLabel={"Log In"}
     onSubmit={login}
     footer={
        <>
            New Here? <Link to="/signup">create an Account</Link>
        </>
     }
    />
  );
}
