import { motion as Motion } from "framer-motion";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal, Button } from "react-bootstrap";
import { getCarById } from "../services/carService";
import { useAuth } from "../context/useAuth";
import ImageSlider from "../components/cars/ImageSlider";
import styles from "./CarDetailsPage.module.css";
import { deleteCar } from "../services/carService";

export default function CarDetailsPage() {
  const { id } = useParams();
  const { role } = useAuth();
  const { setEditingCar, setShow } = useOutletContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    data: car,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["car", id],
    queryFn: () => getCarById(id),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
      navigate("/");
    },
  });

  if (isLoading) return <p className={styles.state}>Loading...</p>;
  if (error) return <p className={styles.state}>Car not found</p>;

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
                  Delete
                </button>
                <button
                  onClick={() => {
                    setEditingCar(car);
                    setShow(true);
                  }}
                >
                  Edit
                </button>
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

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{car.name}</strong>? This
          action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteMutation.mutate(car.id)}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete Car"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
