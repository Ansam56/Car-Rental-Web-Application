import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={styles["app-layout"]}>
      <Navbar />

      <div className={styles.body}>
        <Sidebar />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
