import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./ImageSlider.module.css";

const slideVariants = {
  active: { scale: 1, opacity: 1, x: 0, zIndex: 3 },
  next: { scale: 0.9, opacity: 0.6, x: 140, zIndex: 2 },
  prev: { scale: 0.9, opacity: 0.6, x: -140, zIndex: 2 },
  hidden: { scale: 0.8, opacity: 0, x: 0, zIndex: 1 },
};

export default function ImageSlider({ images }) {
  const [index, setIndex] = useState(0);

  if (!images?.length) return null;

  const paginate = (direction) => {
    setIndex((prev) => (prev + direction + images.length) % images.length);
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={() => paginate(-1)} className={styles.arrowLeft}>
        <FaChevronLeft size={24} />
      </button>

      <button onClick={() => paginate(1)} className={styles.arrowRight}>
        <FaChevronRight size={24} />
      </button>

      <div className={styles.stack}>
        <AnimatePresence initial={false}>
          {images.map((img, i) => {
            let status = "hidden";
            if (i === index) status = "active";
            else if (i === (index + 1) % images.length) status = "next";
            else if (i === (index - 1 + images.length) % images.length)
              status = "prev";

            return (
              <Motion.img
                key={`${img}-${i}`}
                src={img}
                className={styles.image}
                variants={slideVariants}
                animate={status}
                initial="hidden"
                exit="hidden"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
