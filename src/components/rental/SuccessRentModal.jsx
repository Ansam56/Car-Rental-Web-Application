import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SuccessRentModal({ show, onHide }) {
  const navigate = useNavigate();

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body className="text-center p-5">
        <div style={{ fontSize: "50px", color: "#28a745" }} className="mb-3">
          ✅
        </div>
        <h3 className="fw-bold">Booking Confirmed!</h3>
        <p className="text-muted">Your car has been reserved successfully.</p>
        <Button
          variant="dark"
          className="w-100 mt-3"
          onClick={() => {
            onHide();
            navigate("/history");
          }}
        >
          View My Bookings
        </Button>
      </Modal.Body>
    </Modal>
  );
}
