import { db } from "../lib/firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function doesUserNameExist(username) {
  const q = query(
    collection(db, "users"),
    where("displayName", "==", username)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}

/////////////////////////////////////////
