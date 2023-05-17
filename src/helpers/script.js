/**
 * Script realizado para la insercción de datos en la base de datos
 */

import { firstname_men, firstname_women, surname, title_female, title_men, link, bio, avatar_men, avatar_women } from "./arrays.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { deleteDoc, doc, DocumentReference, getDoc, getFirestore } from "firebase/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore";

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
const USERS_COLLECTION = "usuarios";


// Generador de nuúmeros aleatorios de seguidos
const following = [];

for (let i = 0; i < 100; i++) {
  const randomNum = Math.floor(Math.random() * 900) + 100; // Genera un número aleatorio entre 100 y 999
  following.push(randomNum);
}

// Generación de números aleatorios de seguidores
const followers = [];

for (let i = 0; i < 50; i++) {
  const randNum = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  const randStr = `${Math.floor(Math.random() * 100)},${Math.floor(Math.random() * 9) + 1}K`;
  followers.push(Math.random() < 0.5 ? randNum : randStr);
}

// Generación de ids aleatorios para los documentos
const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ids = [];

for (let i = 0; i < 50; i++) {
  let combination = '';

  for (let j = 0; j < 20; j++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    const randomLetter = letters[randomIndex];
    combination += randomLetter;
  }
  ids.push(combination);
}

// Método para añadir usuarios
const addUsers = async (users) => {
  try {
      //Definiendo la colección
      const cursesCol = collection(db, USERS_COLLECTION);
      const docRef = await addDoc(cursesCol, users);
      console.log("Insertado con exito. ID: " + docRef.id)
  } catch (e) {
      console.error("Error en la insercción")
  }
}


// Creación de datos de mujeres
for (let i = 0; i < avatar_women.length; i++) {
    const user = new Object();
    user.avatar = avatar_women[i];
    user.bio = bio [i];
    user.firstname = firstname_women[i];
    user.followers = followers[i];
    user.following = following[i];
    user.link = link[i];
    user.posts = [];
    user.surname = surname[i];
    user.title = title_female[Math.floor(Math.random() * title_female.length) + 1];
    user.username = `${firstname_women[i].substring(0,3)}${surname[i].substring(0,3)}${Math.floor(Math.random() * 99) + 1}`.toLowerCase();
    
    // Añadiendo cada usuario
    addUsers(user);
}


// Creación de datos de hombres
for (let i = 0; i < avatar_men.length; i++) {
    const user = new Object();
    user.avatar = avatar_men[i];
    user.bio = bio [i];
    user.firstname = firstname_men[i];
    user.followers = followers[i];
    user.following = following[i];
    user.link = link[i];
    user.posts = [];
    user.surname = surname[i];
    user.title = title_men[Math.floor(Math.random() * title_men.length) + 1];
    user.username = `${firstname_men[i].substring(0,3)}${surname[i].substring(0,3)}${Math.floor(Math.random() * 99) + 1}`.toLowerCase();
    
    // Añadiendo cada usuario
    addUsers(user);

}

