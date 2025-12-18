import { useQuery } from "@tanstack/react-query";
import { getCars } from "../services/carService";
import styles from "./HomePage.module.css";
import CarsList from "../components/cars/CarsList";

export default function HomePage() {
  const {
    data: cars,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  if (isLoading) return <p style={{ padding: "2rem" }}>Loading...</p>;
  if (error) return <p>Error loading cars</p>;
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Cars List</h1>
      <CarsList cars={cars} />
    </div>
  );
}
