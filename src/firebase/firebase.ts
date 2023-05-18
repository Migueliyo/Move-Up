import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { deleteDoc, doc, getDoc, getFirestore } from "firebase/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { FirebaseResponse } from "../model/response";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCZ8I-PMSduWc0bF6TSz4U2QOFwsgf8i_k",
    authDomain: "moveup-2ba70.firebaseapp.com",
    projectId: "moveup-2ba70",
    storageBucket: "moveup-2ba70.appspot.com",
    messagingSenderId: "118564026428",
    appId: "1:118564026428:web:9ad69b11bf3075af3c2b39",
    measurementId: "G-24V496X6YY"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const USERS_COLLECTION = "usuarios";


const login = async (email: string, password: string): Promise<FirebaseResponse> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return {
            data: user,
            error: false
        }
    } catch (e) {
        console.log(e);
        return {
            data: null,
            error: true
        }
    }
}

const register = async (email: string, password: string): Promise<FirebaseResponse> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        return {
            data: user,
            error: false
        }
    } catch (e) {
        console.log(e);
        return {
            data: null,
            error: true
        }
    }
}

const logOut = async () => {
    await signOut(auth);
}


const getUsers = async (): Promise<FirebaseResponse> => {
    try {
        const usersCol = collection(db, USERS_COLLECTION);
        const snapshot = await getDocs(usersCol);
        const usersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return {
            data: usersList,
            error: false
        }
    } catch (e) {
        console.log(e);
        return {
            data: null,
            error: true
        }

    }
}

// const getCurse = async (id) => {
//     try {
//         const collectionRef = collection(db, USERS_COLLECTION);
//         const ref = doc(collectionRef, id);
//         const snapshot = await getDoc(ref);
//         const curse: Curses = {
//             titulo: snapshot.get('titulo'),
//             descripcion: snapshot.get('descripcion'),
//             imagen: snapshot.get('imagen'),
//             valoracion: snapshot.get('valoracion')
//         }
//         return {
//             data: curse,
//             error: false
//         };
//     } catch (e) {
//         console.log(e);
//         return {
//             data: null,
//             error: true
//         }
//     }
// }

// const addCurses = async (curses) => {
//     try {
//         const cursesCol = collection(db, USERS_COLLECTION);
//         const docRef = await addDoc(cursesCol, curses);
//         return {
//             data: docRef,
//             error: false
//         }
//     } catch (e) {
//         return {
//             data: null,
//             error: true
//         }
//     }
// }

// const deleteCurses = async (key) => {
//     if (key) {
//         const curses = doc(db, USERS_COLLECTION, key);
//         const response = await deleteDoc(curses);
//     }
//     //todo: tratar errores
// }

const firebase = {
    getUsers,
    // addCurses,
    // deleteCurses,
    // login,
    // register,
    // logOut
    // getCurse,
    // auth,
}

export default firebase;
