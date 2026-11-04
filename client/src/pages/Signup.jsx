import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import AuthForm from "../components/AuthForm.jsx";


export default function Signup() {
const {user, loading, signUp} = useAuth();

if(loading) return null;
if(user) return <Navigate to="/" replace />;


  return (
    <AuthForm
        title="Sign Up"
        submitLabel={"Sign up"}
        onSubmit={signUp}
        footer={
        <>
            Already have an account? <Link to="/login">Log In</Link> to login.
        </>
        }

    />
  );
}
