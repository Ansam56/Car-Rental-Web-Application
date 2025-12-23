import styles from "./Layout.module.css";
import profilePic from "../../assets/profile.jpg";
import { useAuth } from "../../context/useAuth";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const { role } = useAuth();
  return (
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <img src={profilePic} alt="Profile" />
      </div>

      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Home
        </NavLink>
        {role === "user" && (
          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            History
          </NavLink>
        )}
      </nav>
    </aside>
  );
}
