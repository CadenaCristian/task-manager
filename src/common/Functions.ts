import { collection, addDoc, updateDoc, doc } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";
import { Task } from "../interfaces";

export const addItemToTable = async (tableName: string, objectToInsert: Task) => {
  const ref = collection(firestore, tableName);
  try {
    let resp: any = await addDoc(ref, objectToInsert);
    console.log("DATA INSERTED: ", resp);
    return { status: 200 }
} catch (error) {
    return { status: 500 }
  }
};

export const deleteEmptyParams = (obj: any) => {
  return  Object.fromEntries(
    Object.entries(obj).filter(([_, value]: any) => value !== "" && value.length !== 0)
  );
}