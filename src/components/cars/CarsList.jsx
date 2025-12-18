import { motion as Motion } from "framer-motion";
import CarCard from "./CarCard";
import styles from "./Cars.module.css";

export default function CarsList({ cars }) {
  return (
    <Motion.div
      className={styles.grid}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.12 },
        },
      }}
    >
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </Motion.div>
  );
}
