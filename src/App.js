import { Header } from "./Components/NavBar/Header";
import { Dashboard } from "./Pages/DashboardPage/Dashboard";
import { Home } from "./Pages/Home/Home";
import { Login, Logout } from "./Pages/LoginPage/Login";
import { Register } from "./Pages/RegisterPage/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

	let accessToken = localStorage.getItem("accessToken") ? true : false;

    return (
        <div>
            {accessToken ? (
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" exact element={<Dashboard />}></Route>
                        <Route path="/Logout" element={<Logout />}></Route>
                    </Routes>
                </Router>
            ) : (
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" exact element={<Home />}></Route>
                        <Route path="/Login" element={<Login />}></Route>
                        <Route path="/Register" element={<Register />}></Route>
                    </Routes>
                </Router>
            )}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                draggable
            />
        </div>
    );
}

export default App;
