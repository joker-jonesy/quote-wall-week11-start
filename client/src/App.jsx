import {Routes, Route, Navigate} from 'react-router-dom';
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

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
        </Routes>
    );
}
