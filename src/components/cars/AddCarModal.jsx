import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";

export default function AddCarModal({
  show,
  onHide,
  onSubmit,
  isLoading,
  initialData,
}) {
  const [form, setForm] = useState({
    name: "",
    pricePerDay: "",
    description: "",
    images: [""],
    available: true,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        pricePerDay: initialData.pricePerDay || "",
        description: initialData.description || "",
        images: initialData.images?.length ? initialData.images : [""],
        available: initialData.available ?? true,
      });
    }
  }, [initialData]);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (index, value) => {
    const copy = [...form.images];
    copy[index] = value;
    updateField("images", copy);
  };

  const addImageField = () => {
    updateField("images", [...form.images, ""]);
  };

  const removeImageField = (index) => {
    updateField(
      "images",
      form.images.filter((_, i) => i !== index)
    );
  };

  const isValid =
    form.name.trim() &&
    Number(form.pricePerDay) > 0 &&
    form.images.some((img) => img.trim() !== "");

  const handleSubmit = () => {
    onSubmit({
      ...form,
      pricePerDay: Number(form.pricePerDay),
      images: form.images.filter((img) => img.trim() !== ""),
    });
  };

  return (
    <Modal show={show} onHide={!isLoading ? onHide : undefined} centered>
      <Modal.Header closeButton={!isLoading}>
        <Modal.Title>{initialData ? "Edit Car" : "Add New Car"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="carName">
            <Form.Label>Car Name</Form.Label>
            <Form.Control
              placeholder="Enter car name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="pricePerDay">
            <Form.Label>Price Per Day</Form.Label>
            <Form.Control
              type="number"
              placeholder="e.g. 50"
              value={form.pricePerDay}
              onChange={(e) => updateField("pricePerDay", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URLs</Form.Label>
            {form.images.map((img, i) => (
              <div key={i} className="d-flex gap-2 mb-2">
                <Form.Control
                  placeholder={`Image ${i + 1}`}
                  value={img}
                  onChange={(e) => handleImageChange(i, e.target.value)}
                />
                {form.images.length > 1 && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeImageField(i)}
                  >
                    <IoMdClose />
                  </Button>
                )}
              </div>
            ))}
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={addImageField}
            >
              + Add Image
            </Button>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Car description..."
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Check
              type="switch"
              id="available-switch"
              label={form.available ? "Car is Available" : "Car is Unavailable"}
              checked={form.available}
              onChange={(e) => updateField("available", e.target.checked)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={isLoading || !isValid}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
