import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import styles from "./Cars.module.css";
import { useAuth } from "../../context/useAuth";

export default function CarCard({ car }) {
  const { role } = useAuth();

  const isClickable = car.available || role === "admin";

  return (
    <Motion.div
      className={`${styles.card} ${!car.available ? styles.disabled : ""}`}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={isClickable ? { scale: 1.03 } : {}}
    >
      <Link
        to={`/cars/${car.id}`}
        className={styles.link}
        onClick={(e) => !isClickable && e.preventDefault()}
        style={{ cursor: isClickable ? "pointer" : "not-allowed" }}
      >
        <div className={styles.imageContainer}>
          <img src={car?.images[0]} alt={car.name} />
          {!car.available && (
            <span className={styles.statusBadge}>
              {role === "admin"
                ? "In Maintenance / Rented"
                : "Currently Rented"}
            </span>
          )}
        </div>

        <div className={styles.info}>
          <h3>{car.name}</h3>
          <p>{car.description.slice(0, 70)}...</p>
          <p className={styles.price}>${car.pricePerDay} / day</p>

          {role !== "admin" && (
            <button disabled={!car.available}>
              {car.available ? "Rent Now" : "Unavailable"}
            </button>
          )}
        </div>
      </Link>
    </Motion.div>
  );
}
