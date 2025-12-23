import { motion as Motion } from "framer-motion";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCarById, deleteCar } from "../services/carService";
import { processRental } from "../services/rentalService";
import { useAuth } from "../context/useAuth";
import ImageSlider from "../components/cars/ImageSlider";
import RentModal from "../components/rental/RentModal";
import styles from "./CarDetailsPage.module.css";
import DeleteConfirmModal from "../components/cars/DeleteConfirmModal";
import SuccessRentModal from "../components/rental/SuccessRentModal";
import Loader from "../components/UI/Loader";
import ErrorBlock from "../components/UI/ErrorBlock";

export default function CarDetailsPage() {
  const { id } = useParams();
  const { role, user } = useAuth();
  const { setEditingCar, setShow } = useOutletContext();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRentModal, setShowRentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: car,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["car", id],
    queryFn: () => getCarById(id),
  });

  const rentMutation = useMutation({
    mutationFn: (rentalData) =>
      processRental({
        ...rentalData,
        userId: user.email,
      }),
    onSuccess: () => {
      setShowRentModal(false);
      setShowSuccessModal(true);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
      navigate("/");
    },
  });

  if (isLoading) return <Loader />;
  if (error) {
    return (
      <div className={styles.container}>
        <ErrorBlock
          title="An error occurred"
          message={error.message || "Failed to fetch car data."}
        />
        <button onClick={() => navigate("/")} className={styles.button}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <>
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
                <button
                  className={styles.delete}
                  onClick={() => setShowDeleteModal(true)}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </button>
                <button
                  onClick={() => {
                    setEditingCar(car);
                    setShow(true);
                  }}
                >
                  Edit Car
                </button>
              </>
            )}

            {role === "user" &&
              (car.available ? (
                <button
                  className={styles.rent}
                  onClick={() => setShowRentModal(true)}
                >
                  Rent Now
                </button>
              ) : (
                <button className={styles.disabledBtn} disabled>
                  Currently Rented
                </button>
              ))}
          </div>
        </div>

        <ImageSlider images={car.images} />

        <div className={styles.description}>
          <h3>Details</h3>
          {car.description.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
          <div className={styles.priceTag}>
            Daily Rate: <strong>${car.pricePerDay}</strong>
          </div>
        </div>
      </Motion.div>

      <RentModal
        show={showRentModal}
        onHide={() => setShowRentModal(false)}
        car={car}
        isLoading={rentMutation.isPending}
        onConfirm={(data) => rentMutation.mutate(data)}
      />

      <DeleteConfirmModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={() => deleteMutation.mutate(car.id)}
        carName={car.name}
        isLoading={deleteMutation.isPending}
      />

      <SuccessRentModal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
      />
    </>
  );
}
