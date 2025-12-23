import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.errorMessage}>Oops! Page Not Found</h2>
      <p className={styles.text}>
        The page you are looking for doesn't exist or has been moved.
      </p>
    </div>
  );
}
