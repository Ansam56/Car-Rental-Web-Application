import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/useAuth";
import { db } from "../services/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from "./HistoryPage.module.css";
import Loader from "../components/UI/Loader";
import ErrorBlock from "../components/UI/ErrorBlock";

export default function HistoryPage() {
  const { user } = useAuth();

  const fetchMyRentals = async () => {
    const q = query(
      collection(db, "rentals"),
      where("userId", "==", user.email)
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data.sort((a, b) => new Date(b.rentedAt) - new Date(a.rentedAt));
  };

  const {
    data: rentals,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["myRentals", user?.email],
    queryFn: fetchMyRentals,
    enabled: !!user?.email,
  });

  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  if (isLoading) return <Loader />;
  if (isError) {
    return (
      <ErrorBlock
        title="An error occurred"
        message={error.message || "Failed to fetch rental history."}
      />
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User History</h2>

      {rentals?.length === 0 ? (
        <div className={styles.emptyState}>
          No rentals found. Start exploring cars!
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.historyTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Car ID</th>
                <th>From</th>
                <th>To</th>
                <th>Total $</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map((rental) => {
                const [start, end] = rental.period.split(" - ");
                return (
                  <tr key={rental.id}>
                    <td>{rental.id}</td>
                    <td>{rental.carId}</td>
                    <td>{formatDate(start)}</td>
                    <td>{formatDate(end)}</td>
                    <td>${rental.totalPrice}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
