import { useQuery } from "@tanstack/react-query";
import { getCars } from "../services/carService";
import styles from "./HomePage.module.css";
import CarsList from "../components/cars/CarsList";
import Loader from "../components/UI/Loader";
import ErrorBlock from "../components/UI/ErrorBlock";

export default function HomePage() {
  const {
    data: cars,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  if (isLoading) return <Loader />;
  if (isError) {
    return (
      <div className={styles.home}>
        <ErrorBlock
          title="Could not load cars"
          message={
            error.message ||
            "Please check your internet connection and try again."
          }
        />
      </div>
    );
  }
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Cars List</h1>
      <CarsList cars={cars} />
    </div>
  );
}
