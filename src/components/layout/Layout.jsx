import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.appLayout}>
      <Navbar />

      <div className={styles.body}>
        <Sidebar />
        <main className={styles.main}>{children}</main>
      </div>

      <Footer />
    </div>
  );
}
