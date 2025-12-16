import styles from "./Layout.module.css";
import profilePic from "../../assets/profile.jpg";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <img src={profilePic} alt="Profile" />
      </div>

      <nav>
        <button className={styles.active}>Cars</button>
        <button>History</button>
      </nav>
    </aside>
  );
}
