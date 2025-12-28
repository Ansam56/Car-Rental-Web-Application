import { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

export default function RentModal({ show, onHide, car, onConfirm, isLoading }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  let totalCost = 0;

  if (fromDate && toDate) {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (diffDays > 0) {
      totalCost = diffDays * car.pricePerDay;
    }
  }

  const handleConfirm = () => {
    const startTs = Math.floor(new Date(fromDate).getTime() / 1000);
    const endTs = Math.floor(new Date(toDate).getTime() / 1000);

    const periodToRent = `${startTs} - ${endTs}`;

    onConfirm({
      carId: car.id,
      period: periodToRent,
      totalPrice: totalCost,
      rentedAt: new Date().toISOString(),
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Rent a Car</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>From</Form.Label>
                <Form.Control
                  type="date"
                  value={fromDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>To</Form.Label>
                <Form.Control
                  type="date"
                  value={toDate}
                  min={fromDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-4 text-center">
            <strong>Total: ${totalCost}</strong>
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant="dark"
          onClick={handleConfirm}
          disabled={!fromDate || !toDate || isLoading}
        >
          Rent
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
