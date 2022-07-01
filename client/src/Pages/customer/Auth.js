import styles from "../../Css/login.module.css"
import LoginCard from "../../Components/login/loginCard"
import RegistCard from "../../Components/register/registCard"
import dumbmerch from "../../Images/dmlogo.png";
import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

function Auth() {
    let navigate = useNavigate();
    const [state] = useContext(UserContext);

    const checkAuth = () => {
      if (state.isLogin === true) {
        if(state.user.status == "admin"){
          navigate('/home-admin')
        }else{
          navigate('/')
        }
      }
    };
    checkAuth();

    const [isRegister, setIsRegister] = useState(true);

    const switchLogin = () => {
        setIsRegister(true);
    };

    const switchRegister = () => {
        setIsRegister(false);
    };

    return(
        <div className={styles.loginBg}>
            <div className={styles.loginContainer}>
                <div className={styles.loginContent}>
                    <div className={styles.contentLogo}>
                        <img src={dumbmerch} alt="Dumbmerch icon" />
                    </div>
                    <div className={styles.contentHeading}>
                        <h1>Easy, Fast and Reliable</h1>
                    </div>
                    <div className={styles.contentDesc}>
                        <p>
                            Go shopping for merchandise, just go to dumb merch shopping. The
                            biggest merchadise in <b style={{ color: "white" }}>Indonesia</b>
                        </p>
                            <button onClick={switchLogin} className={styles.contentLogin}>Login</button>
                            <button onClick={switchRegister} className={styles.contentRegister}>Register</button>
                    </div>
                </div>
                {isRegister ? <LoginCard/> : <RegistCard/>}
            </div>
        </div>
    )
}

export default Auth