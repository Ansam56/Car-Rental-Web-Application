import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import AddCarModal from "../cars/AddCarModal";
import { addCar, updateCar } from "../../services/carService";
import styles from "./Layout.module.css";

export default function Layout() {
  const [show, setShow] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: addCar,
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
      setShow(false);
    },
  });

  const editMutation = useMutation({
    mutationFn: ({ id, car }) => updateCar(id, car),
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
      setShow(false);
      setEditingCar(null);
    },
  });

  return (
    <div className={styles.appLayout}>
      <Navbar onAddCar={() => setShow(true)} />

      <div className={styles.body}>
        <Sidebar />
        <main className={styles.main}>
          <Outlet context={{ setEditingCar, setShow }} />
        </main>
      </div>

      <Footer />

      <AddCarModal
        key={editingCar ? editingCar.id : "new-car-modal"}
        show={show}
        onHide={() => {
          setShow(false);
          setEditingCar(null);
        }}
        initialData={editingCar}
        isLoading={addMutation.isPending || editMutation.isPending}
        onSubmit={(car) => {
          editingCar
            ? editMutation.mutate({ id: editingCar.id, car })
            : addMutation.mutate(car);
        }}
      />
    </div>
  );
}
