// import { collection, addDoc } from "firebase/firestore";
// import { auth } from "./firebase"; // Ensure Firebase Auth is initialized
// import { db } from "./firebase"; // Firestore instance

// const addIdea = async (ideaData) => {
//   try {
//     const user = auth.currentUser; // Get the logged-in user
//     if (!user) throw new Error("User not logged in");

//     const idea = {
//       ...ideaData,
//       userId: user.uid, // Associate the idea with the user's UID
//       _createdAt: new Date().toISOString(),
//       views: 0,
//     };

//     const docRef = await addDoc(collection(db, "ideas"), idea);
//     console.log("Idea added with ID: ", docRef.id);
//   } catch (error) {
//     console.error("Error adding idea: ", error);
//   }
// };
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { auth, db } from "./firebase";

// const addIdea = async (ideaData) => {
//   try {
//     const user = auth.currentUser; // Ensure the user is authenticated
//     if (!user) {
//       throw new Error("User not authenticated");
//     }

//     const idea = {
//       ...ideaData,
//       userId: user.uid,
//       views: 0,
//       _createdAt: serverTimestamp(),
//     };

//     const docRef = await addDoc(collection(db, "ideas"), idea);
//     console.log("Idea added with ID:", docRef.id);
//   } catch (error) {
//     console.error("Error adding idea:", error);
//   }
// };
