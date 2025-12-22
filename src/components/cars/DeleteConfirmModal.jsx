import { Modal, Button } from "react-bootstrap";

export default function DeleteConfirmModal({
  show,
  onHide,
  onConfirm,
  carName,
  isLoading,
}) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete <strong>{carName}</strong>? This will
        remove the car from the system permanently.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? "Deleting..." : "Confirm Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
