import loginStyles from "./login.module.css";
import { api } from "../../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

export function Login() {
    let Router = new useNavigate();

    function LoginShowPassword() {
        let passwordInput = document.getElementById("LoginPasswordInput");
        let eyeButton = document.getElementById("LoginEyeBtn");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            eyeButton.className = `${loginStyles.ShowPassword} bi bi-eye-slash-fill`
        } else {
            passwordInput.type = "password";
            eyeButton.className = `${loginStyles.ShowPassword} bi bi-eye-fill`;
        }
    }

    function toastinfo() {
        toast.info("Wait for Login!");
    }

    function toastSuccess() {
        toast.success("Login Successfull");
    }

    function toasterror(e) {
        toast.error(e);
    }

    function login() {
        toastinfo();
        let data = {
            username: document.getElementById("LoginUsernameInput").value,
            password: document.getElementById("LoginPasswordInput").value,
        };

        axios
            .post(`${api.url}/auth/signin`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                toastSuccess();
				console.log(res.data)
                localStorage.setItem("loginCreds", JSON.stringify(res.data));
				localStorage.setItem("accessToken", res.data.accessToken);
				window.location.href = "/"
            })
            .catch((err) => {
                if (err.response) {
                    toasterror(err.response.data.message);
                } else if (err.request) {
                    console.log(err.request);
                } else {
                    console.log(err);
                }
            });
    }

    let accessToken = localStorage.getItem("accessToken") ? true : false;

    return !accessToken ? (
        <div className={loginStyles.MainContainer}>
            <div className={loginStyles.CenteraizedContainer}>
                <div className={loginStyles.CenteredDiv}>
                    <p className={loginStyles.HeadText}>Login</p>
                    <input
                        type="text"
                        placeholder="Username..."
                        id="LoginUsernameInput"
                        className={loginStyles.UsernameInput}
                    />
                    <div className={loginStyles.PassworDiv}>
                        <input
                            type="password"
                            placeholder="Password..."
                            id="LoginPasswordInput"
                            className={loginStyles.PasswordInput}
                        />
                        <i
                            onClick={LoginShowPassword}
                            className={`${loginStyles.ShowPassword} bi bi-eye-fill`}
                            id="LoginEyeBtn"
                        ></i>
                    </div>
                    <div className={loginStyles.RememberMeDiv}>
                        <input
                            type="checkbox"
                            name="remember me"
                            id="LoginRememberMe"
                            className={loginStyles.RememberMeInput}
                        />
                        <p className={loginStyles.RememberMeText}>
                            Remember Me
                        </p>
                    </div>
                    <button
                        onClick={login}
                        className={loginStyles.SubmitButton}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    ) : (
        Router('/')
    );
}

export function Logout() {
    let Router = new useNavigate();

    useEffect(() => {
        function LogOut() {
            toast.success("Logged out successfully!!!");
            localStorage.removeItem("loginCreds");
            localStorage.removeItem("accessToken");
            window.location.href = "/"
        }

        LogOut();
    });

    return <div>Logout</div>;
}
