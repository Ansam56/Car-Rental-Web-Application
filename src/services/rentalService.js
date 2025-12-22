import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function processRental(rental) {
  const docRef = await addDoc(collection(db, "rentals"), rental);
  return docRef.id;
}
