import { Quote } from "@/types";

import { openDB } from "idb";

const openDatabase = async () => {
  console.log("Opening the database...");

  return await openDB("relax-db", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("quotes")) {
        db.createObjectStore("quotes", { keyPath: "id", autoIncrement: true });
      }
    },
  });
};

const addToDatabase = async (quote: Quote) => {
  const db = await openDatabase();

  const tx = db.transaction("quotes", "readwrite");
  const store = tx.objectStore("quotes");

  await store.add(quote);

  console.log("Added quote to the database...");
};

const getAllQuotesFromDatabase = async () => {
  const db = await openDatabase();

  const tx = db.transaction("quotes", "readonly");
  const store = tx.objectStore("quotes");

  console.log("Getting all quotes from the database...");

  return await store.getAll();
};

export { addToDatabase, getAllQuotesFromDatabase };
