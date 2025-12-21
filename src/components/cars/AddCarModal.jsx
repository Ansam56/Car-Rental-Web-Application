import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function AddCarModal({
  show,
  onHide,
  onSubmit,
  isLoading,
  initialData,
}) {
  const [name, setName] = useState(initialData?.name || "");
  const [pricePerDay, setPricePerDay] = useState(
    initialData?.pricePerDay || ""
  );
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [images, setImages] = useState(initialData?.images || [""]);
  const [available, setAvailable] = useState(initialData?.available ?? true);

  const handleImageChange = (i, value) => {
    const copy = [...images];
    copy[i] = value;
    setImages(copy);
  };

  const addImageField = () => setImages([...images, ""]);

  const handleSubmit = () => {
    onSubmit({
      name,
      pricePerDay: Number(pricePerDay),
      description,
      images: images.filter((img) => img.trim() !== ""),
      available,
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? "Edit Car" : "Add New Car"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Car Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price Per Day</Form.Label>
            <Form.Control
              type="number"
              value={pricePerDay}
              onChange={(e) => setPricePerDay(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URLs</Form.Label>
            {images.map((img, i) => (
              <Form.Control
                key={i}
                className="mb-2"
                value={img}
                placeholder={`Image ${i + 1}`}
                onChange={(e) => handleImageChange(i, e.target.value)}
              />
            ))}
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={addImageField}
            >
              + Add Image
            </Button>
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="available-switch"
              label={
                available ? "Car is Available" : "Car is Unavailable (Disabled)"
              }
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
