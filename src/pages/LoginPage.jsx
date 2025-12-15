import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { FaCar, FaSignInAlt, FaExclamationCircle } from "react-icons/fa";
import { useAuth } from "../context/useAuth";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  // const { user, loading: authLoading, login } = useAuth();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // لو المستخدم مسجّل، ما يرجع يشوف صفحة اللوجين
  // if (!authLoading && user) {
  //   return <Navigate to="/" replace />;
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.wrapper}
      >
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <FaCar size={32} />
            </div>
            <h1 className={styles.title}>Welcome To CarsRental</h1>
            <p className={styles.subtitle}>Sign in to rent your dream car</p>
          </div>

          {error && (
            <Motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.error}
            >
              <FaExclamationCircle size={16} />
              {error}
            </Motion.div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label>Email</label>
              <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@admin.com"
                required
                disabled={loading}
              />
            </div>

            <div className={styles.field}>
              <label>Password</label>
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                required
                disabled={loading}
              />
            </div>

            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  <FaSignInAlt size={16} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className={styles.demo}>
            <strong>Demo Accounts</strong>
            <br />
            Admin: admin@admin.com
            <br />
            Password: admin123
            <br />
            Normal: normal@normal.com
            <br />
            Password: normal123
          </div>
        </div>
      </Motion.div>
    </div>
  );
}
