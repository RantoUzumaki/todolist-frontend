import homeStyle from "./home.module.css";

export function Home() {
    return (
        <div className={homeStyle.mainContainer}>
            <div className={homeStyle.scrollText}>
                <p className={homeStyle.text}>
                    This is a simple TODO application
                    <br /> made with MERN Stack. <br />
                    In this application <br />I have used JWT.
                </p>
            </div>
        </div>
    );
}
