import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "./firebase";

export async function getRentals(email) {
  const q = query(collection(db, "rentals"), where("userId", "==", email));

  const data = await getDocs(q);
  return data.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .sort((a, b) => new Date(b.rentedAt) - new Date(a.rentedAt));
}

export async function makeRental(rental) {
  await addDoc(collection(db, "rentals"), rental);
}
