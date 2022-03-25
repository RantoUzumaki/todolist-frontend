import LogoImg from "../../Assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import headerStyles from "./header.module.css";

export function Header() {
    const location = useLocation();
    const { pathname } = location;
    const splitPathname = pathname.split("/");

    return (
        <div className={headerStyles.mainContainer}>
            <div className={headerStyles.centeredContainer}>
                <div className={headerStyles.logoContainer}>
                    <div className={headerStyles.logoDiv}>
                        <Link
                            className={headerStyles.logohref}
                            style={{ textDecoration: "none" }}
                            to="/"
                        >
                            <img
                                src={LogoImg}
                                alt="LOGO"
                                className={headerStyles.logo}
                            />
                            <p className={headerStyles.logoText}>TO-DO-List</p>
                        </Link>
                    </div>
                </div>
                <div className={headerStyles.subdetailsContainer}>
                    <div className={headerStyles.subdetailsDiv}>
                        <Link
                            className={
                                splitPathname[1] === "Dashboard"
                                    ? `${headerStyles.dahboardBtn} ${headerStyles.active}`
                                    : headerStyles.dahboardBtn
                            }
                            to="/"
                        >
                            Dashboard
                        </Link>
                        <Link
                            className={
                                splitPathname[1] === "Login"
                                    ? `${headerStyles.LoginBtn} ${headerStyles.active}`
                                    : headerStyles.LoginBtn
                            }
                            to={
                                localStorage.getItem("loginCreds")
                                    ? "/Logout"
                                    : "/Login"
                            }
                        >
                            {localStorage.getItem("loginCreds")
                                ? "Logout"
                                : "Login"}
                        </Link>
                        {localStorage.getItem("loginCreds") ? (
                            <div></div>
                        ) : (
                            <Link
                                className={
                                    splitPathname[1] === "Register"
                                        ? `${headerStyles.RegisterBtn} ${headerStyles.active}`
                                        : headerStyles.RegisterBtn
                                }
                                to="/Register"
                            >
                                Register
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
