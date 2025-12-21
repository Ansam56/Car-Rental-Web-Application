import { FaPlus, FaSignOutAlt, FaCar } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Layout.module.css";
import { useAuth } from "../../context/useAuth";

export default function Navbar({ onAddCar }) {
  const { user, logout, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className={styles.navbar}>
      <Link className={styles.logo} to="/">
        <FaCar size={40} />
      </Link>

      <div className={styles.actions}>
        {role === "admin" && (
          <button className={styles.addButton} onClick={onAddCar}>
            <FaPlus />
            Add New Car
          </button>
        )}

        {user && (
          <button className={styles.logoutButton} onClick={handleLogout}>
            <FaSignOutAlt />
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
