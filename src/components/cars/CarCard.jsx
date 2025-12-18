import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import styles from "./Cars.module.css";

export default function CarCard({ car }) {
  return (
    <Motion.div
      className={`${styles.card} ${!car.available ? styles.disabled : ""}`}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={car.available ? { scale: 1.03 } : {}}
    >
      <Link
        to={`/cars/${car.id}`}
        className={styles.link}
        onClick={(e) => !car.available && e.preventDefault()}
      >
        <img src={car.thumbnail} alt={car.name} />

        <div className={styles.info}>
          <h3>{car.name}</h3>
          <p>${car.pricePerDay} / day</p>

          <button disabled={!car.available}>
            {car.available ? "Rent Now" : "Unavailable"}
          </button>
        </div>
      </Link>
    </Motion.div>
  );
}
