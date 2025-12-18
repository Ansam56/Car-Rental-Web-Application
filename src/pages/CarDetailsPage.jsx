import { motion as Motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getCarById } from "../services/carService";
import { useAuth } from "../context/useAuth";
import ImageSlider from "../components/cars/ImageSlider";
import styles from "./CarDetailsPage.module.css";

export default function CarDetailsPage() {
  const { id } = useParams();
  const { role } = useAuth();

  const {
    data: car,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["car", id],
    queryFn: () => getCarById(id),
  });

  if (isLoading) return <p className={styles.state}>Loading...</p>;
  if (error) return <p className={styles.state}>Car not found</p>;

  return (
    <Motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={styles.header}>
        <h1>{car.name}</h1>

        <div className={styles.actions}>
          {role === "admin" && (
            <>
              <button className={styles.delete}>Delete</button>
              <button className={styles.edit}>Edit</button>
            </>
          )}

          {role === "user" && car.available && (
            <button className={styles.rent}>
              Rent – ${car.pricePerDay} / day
            </button>
          )}
        </div>
      </div>

      <ImageSlider images={car.images} />

      <div className={styles.description}>
        <h3>Car Details</h3>

        {car.description.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </Motion.div>
  );
}
