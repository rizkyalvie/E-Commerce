import React, {useContext} from "react";
import styles from "../../Css/nav.module.css";
import logo from "../../Images/dmlogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from '../../context/userContext'

function Nav() {
  const [state, dispatch] = useContext(UserContext)

  let navigate = useNavigate()

  const logout = () => {
      console.log(state)
      dispatch({
          type: "LOGOUT"
      })
      navigate("/login")
  }
  return (
    <div className={styles.Navbar}>
      <div className={styles.leftNav}>
        <NavLink to="/home-admin">
          <img src={logo} alt="Dumbmerch logo" />
        </NavLink>
      </div>
      <div className={styles.rightNav}>
        <div className={styles.links}>
          <NavLink to="/complain-admin">Complain</NavLink>
            <div className={styles.links}>
              <NavLink to="/category">Category</NavLink>
              <NavLink to="/product">Product</NavLink>
            </div>
          <NavLink onClick={logout} to="/auth">Log out</NavLink>
        </div>

        <label htmlFor="#Bars" className={styles.Bars}>
          <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
          <button id="Bars"></button>
        </label>
      </div>
    </div>
  );
}

export default Nav;
