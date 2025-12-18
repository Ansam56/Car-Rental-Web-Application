import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getCars() {
  const filteredData = await getDocs(collection(db, "cars"));
  return filteredData.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getCarById(id) {
  const docRef = doc(db, "cars", id);
  const data = await getDoc(docRef);
  if (!data.exists()) throw new Error("Car not found");
  return { id: data.id, ...data.data() };
}
