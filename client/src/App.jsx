import {Routes, Route, Navigate} from 'react-router-dom';
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ProtectedRoutes from "./auth/ProtectedRoutes.jsx";
import Layout from "./components/Layout.jsx";
import QuoteWall from "./pages/QuoteWall.jsx";
import Favorites from "./pages/Favorites.jsx";

export default function App() {
    return (
        <Routes>
            <Route path="/login" element={
                <main className={"container"}>
                    <Login/>
                </main>}/>
            <Route path="/signup" element={
                <main className={"container"}>
                    <Signup/>
                </main>
            }/>
            <Route element={<ProtectedRoutes/>}>
                <Route element={<Layout/>}>
                    <Route path={"/"} element={<QuoteWall/>}/>
                    <Route path={"/favorites"} element={<Favorites/>}/>
                </Route>
            </Route>
        </Routes>
    );
}
