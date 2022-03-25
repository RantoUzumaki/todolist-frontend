import axios from "axios";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import registerStyle from "./register.module.css"

export function Register() {
    let Router = new useNavigate();

    function RegisterShowPassword() {
        // let passwordInput = document.getElementById("RegisterPasswordInput");
		let confirmpass = document.getElementById("RegisterCnfmPasswordInput");
        let eyeButton = document.getElementById("RegisterEyeBtn");
        if (confirmpass.type === "password") {
            confirmpass.type = "text";
            // passwordInput.type = "text";
            eyeButton.className = `${registerStyle.showPassword} bi bi-eye-slash-fill`;
        } else {
            confirmpass.type = "password";
            // passwordInput.type = "password";
            eyeButton.className = `${registerStyle.showPassword} bi bi-eye-fill`;
        }
    }

    function toastinfo() {
        toast.info("Wait for Registeration!");
    }

    function toastsuccess() {
        toast.success("User Resgistered Successfully");
        Router("/login");
    }

    function toasterror(e) {
        toast.error(e);
    }

    function register() {
        toastinfo();
        let role;
        if (document.getElementById("RegisterAdmin").checked) {
            role = "admin";
        } else {
            role = "user";
        }

        let data = {
            firstname: document.getElementById("RegisterFirstNameInput").value,
            lastname: document.getElementById("RegisterLastNameInput").value,
            username: document.getElementById("RegisterUsernameInput").value,
            email: document.getElementById("RegisterUseremailInput").value,
            password: document.getElementById("RegisterCnfmPasswordInput")
                .value,
            roles: [role],
        };
        axios
            .post(`${api.url}/auth/signup`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                if (res.data.message === "Registered successfully!") {
                    toastsuccess();
                }
            })
            .catch((err) => {
                if (err.response) {
                    toasterror(err.response.data.message);
                    console.log("res", err.response);
                } else if (err.request) {
                    console.log(err.request);
                } else {
                    console.log(err);
                }
            });
    }

    return (
        <div className={registerStyle.MainContainer}>
            <div className={registerStyle.centeraizedContainer}>
                <div className={registerStyle.centeredDiv}>
                    <p className={registerStyle.headText}>Register</p>
                    <input
                        type="text"
                        placeholder="First Name..."
                        id="RegisterFirstNameInput"
                        className={registerStyle.firstnameInput}
                    />
                    <input
                        type="text"
                        placeholder="Last Name..."
                        id="RegisterLastNameInput"
                        className={registerStyle.lastnameInput}
                    />
                    <input
                        type="text"
                        placeholder="User Name..."
                        id="RegisterUsernameInput"
                        className={registerStyle.usernameInput}
                    />
                    <input
                        type="email"
                        placeholder="E-Mail..."
                        id="RegisterUseremailInput"
                        className={registerStyle.useremailInput}
                    />
                    <input
                        type="password"
                        placeholder="Password..."
                        id="RegisterPasswordInput"
                        className={registerStyle.passwordInput}
                    />
                    <div className={registerStyle.CnfmpasswordDiv}>
                        <input
                            type="password"
                            placeholder="Confirm Password..."
                            id="RegisterCnfmPasswordInput"
                            className={registerStyle.CnfmpasswordInput}
                        />
                        <i
                            onClick={RegisterShowPassword}
                            className={`${registerStyle.showPassword} bi bi-eye-fill`}
                            id="RegisterEyeBtn"
                        ></i>
                    </div>
                    <label className={registerStyle.IsadminLabel}>
                        Is Admin?
                        <input
                            type="checkbox"
                            name="Is Admin"
                            id="RegisterAdmin"
                        />
                    </label>
                    <button
                        onClick={register}
                        className={registerStyle.submitButton}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}
