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
      carName: car.name,
      period: periodToRent,
      totalPrice: totalCost,
      rentedAt: new Date().toISOString(),
    });
  };

  const handleInputInteraction = (e) => {
    e.stopPropagation();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      enforceFocus={false}
      animation={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Rent a Car</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>From</Form.Label>
                <input
                  type="date"
                  className="form-control"
                  value={fromDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setFromDate(e.target.value)}
                  onKeyDown={handleInputInteraction}
                  onMouseDown={handleInputInteraction}
                  onClick={handleInputInteraction}
                  autoComplete="off"
                  style={{ position: "relative", zIndex: 1000000 }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>To</Form.Label>
                <input
                  type="date"
                  className="form-control"
                  value={toDate}
                  min={fromDate || new Date().toISOString().split("T")[0]}
                  onChange={(e) => setToDate(e.target.value)}
                  onKeyDown={handleInputInteraction}
                  onMouseDown={handleInputInteraction}
                  onClick={handleInputInteraction}
                  autoComplete="off"
                  style={{ position: "relative", zIndex: 1000000 }}
                />
              </Form.Group>
            </Col>
          </Row>

          <div
            className="mt-4 p-3 bg-light rounded text-center"
            style={{ border: "1px solid #ddd" }}
          >
            <p className="mb-1 text-muted">Total Cost</p>
            <h2 className="text-dark font-weight-bold">${totalCost}</h2>
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
          disabled={totalCost <= 0 || isLoading}
        >
          {isLoading ? "Processing..." : "Rent"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
