import firebase from "firebase";
import firebaseConfig from "./config/firebase";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const userCollection = db.collection("users");
const chatCollection = db.collection("chats");

export { db, auth, userCollection, chatCollection };
