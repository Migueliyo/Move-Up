import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc, setDoc, arrayUnion, arrayRemove, DocumentReference } from "firebase/firestore";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  FieldValue
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";

import { FirebaseResponse } from "../model/response";
import { User } from "../model/user";
import { UserPhoto } from "../model/userPhoto";
import { Post } from "../model/post";
import { Comment } from "../model/comment";

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
  measurementId: "G-24V496X6YY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();
const USERS_COLLECTION = "usuarios";
const POSTS_COLLECTION = "posts";
const COMMENTS_COLLECTION = "comments";

// El login realiza una consulta y devuelve el usuario de la colección usuarios al loguearse
const login = async (
  email: string,
  password: string,
  setUser: (user: User | null) => void
): Promise<FirebaseResponse> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Consulta el usuario en la colección "usuarios"
    const usersCollectionRef = collection(db, USERS_COLLECTION);
    const q = query(usersCollectionRef, where("uid", "==", user.uid));
    let userData: any | null = null;

    getDocs(q)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // Recupera el primer documento encontrado (debería haber solo uno)
          userData = {id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data()}

          // Actualiza el usuario en el contexto
          setUser(userData);
        }
      })
      .catch((error) => {
        console.log('Error en la consulta de la colección "usuarios":', error);
      });

    return {
      data: userData,
      error: false,
    };
  } catch (e) {
    console.log(e);
    return {
      data: null,
      error: true,
    };
  }
};

const register = async (
  email: string,
  password: string,
  firstname: string,
  surname: string,
  username: string,
  setUser: (user: User | null) => void
): Promise<FirebaseResponse> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userToAdd: User = {
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/moveup-2ba70.appspot.com/o/avatar.png?alt=media&token=fe305d8f-d795-4a05-a21b-a08962685384",
      bio: "¡Hola! Acabo de empezar a usar Move Up",
      firstname: firstname,
      followers: [],
      following: [],
      link: "https://ionicframework.com/",
      posts: [],
      surname: surname,
      title: "Nuevo",
      username: username,
      uid: user.uid,
    };

    const usersCol = collection(db, USERS_COLLECTION);
    const docRef = await addDoc(usersCol, userToAdd);

    // Actualiza el usuario en el contexto
    setUser(userToAdd);

    return {
      data: docRef,
      error: false,
    };
  } catch (e) {
    console.log(e);
    return {
      data: null,
      error: true,
    };
  }
};

const logOut = async () => {
  await signOut(auth);
};

const getUsers = async (): Promise<FirebaseResponse> => {
  try {
    const usersCol = collection(db, USERS_COLLECTION);
    const snapshot = await getDocs(usersCol);
    const usersList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return {
      data: usersList,
      error: false,
    };
  } catch (e) {
    console.log(e);
    return {
      data: null,
      error: true,
    };
  }
};

const getUser = async (id: string) => {
  try {
    const collectionRef = collection(db, USERS_COLLECTION);
    const ref = doc(collectionRef, id);
    const snapshot = await getDoc(ref);
    const user: User = {
      id: snapshot.id,
      avatar: snapshot.get("avatar"),
      bio: snapshot.get("bio"),
      firstname: snapshot.get("firstname"),
      followers: snapshot.get("followers"),
      following: snapshot.get("following"),
      link: snapshot.get("link"),
      posts: snapshot.get("posts"),
      surname: snapshot.get("surname"),
      title: snapshot.get("title"),
      username: snapshot.get("username"),
      uid: snapshot.get("uid"),
    };
    return {
      data: user,
      error: false,
    };
  } catch (e) {
    console.log(e);
    return {
      data: undefined,
      error: true,
    };
  }
};

const getPosts = async (): Promise<FirebaseResponse> => {
  try {
    const postsCol = collection(db, POSTS_COLLECTION);
    const snapshot = await getDocs(postsCol);
    const postsList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return {
      data: postsList,
      error: false,
    };
  } catch (e) {
    console.log(e);
    return {
      data: null,
      error: true,
    };
  }
};

const getPostsFromIdUser = async (userId: string): Promise<FirebaseResponse> => {
  try {
    const userDocRef = doc(db, USERS_COLLECTION, userId);
    const userDocSnap = await getDoc(userDocRef);
    
    if (userDocSnap.exists()) {
      const postsArray = userDocSnap.data().posts;
      const postsData = [];

      for (const postRef of postsArray) {
        const postDocSnapshot = await getDoc(postRef);
        if (postDocSnapshot.exists()) {
          postsData.push({id: postDocSnapshot.id, ...(postDocSnapshot.data() || {})});
        }
      }
      return {
        data: postsData,
        error: false,
      };
    } else {
      throw new Error("El post no existe");
    }
  } catch (e) {
    console.log(e);
    return {
      data: null,
      error: true,
    };
  }
};

const addPost = async (file: UserPhoto, userId: string, titulo: string, username: string, avatar: string): Promise<FirebaseResponse> => {
  let post: Post;
  try {
    const storageRef = ref(storage, file.filepath);
    // 'file' comes from data URL string
    uploadString(storageRef, file.webviewPath!, "data_url").then(
      async (snapshot) => {
        console.log("Foto subida con éxito a cloud storage");

        // Obtén la URL de descarga del elemento subido
        const downloadUrl = await getDownloadURL(snapshot.ref);

        post = {
          image: downloadUrl,
          caption: titulo,
          likes:  [],
          user_id: userId,
          user_username: username,
          user_avatar: avatar,
          time: new Date,
          comments: []
        }

        const usersCol = collection(db, POSTS_COLLECTION);
        const docRef = await addDoc(usersCol, post);

        // Actualiza el campo "posts" del usuario correspondiente
        const userDocRef = doc(db, USERS_COLLECTION, userId);
        await updateDoc(userDocRef, {
          posts: arrayUnion(docRef)
        });
      }
    )
    return {
      data: post!,
      error: false,
    };
  } catch (e) {
    console.log(e);
    return {
      data: null,
      error: true,
    };
  }
};

const addLike = async (userId: string, postId: string): Promise<FirebaseResponse> => {
  try {
    const userDocRef = doc(db, USERS_COLLECTION, userId);
    const postDocRef = doc(db, POSTS_COLLECTION, postId);
    await updateDoc(postDocRef, {
      likes: arrayUnion(userDocRef)
    });
    return {
      data: userDocRef,
      error: false,
    };
  } catch (e) {
    console.log(e);
    return {
      data: null,
      error: true,
    };
  }
};

const deleteLike = async (userId: string, postId: string): Promise<FirebaseResponse> => {
  try {
    const userDocRef = doc(db, USERS_COLLECTION, userId);
    const postDocRef = doc(db, POSTS_COLLECTION, postId);
    await updateDoc(postDocRef, {
      likes: arrayRemove(userDocRef)
    });
    return {
      data: userDocRef,
      error: false,
    };
  } catch (e) {
    console.log(e);
    return {
      data: null,
      error: true,
    };
  }
};

const checkLike = async (userId: string, postId: string): Promise<boolean> => {
  try {
    const postDocRef = doc(db, POSTS_COLLECTION, postId);
    const postSnapshot = await getDoc(postDocRef);
    const userDocRef = doc(db, USERS_COLLECTION, userId);

    if (postSnapshot.exists()) {
      const postData = postSnapshot.data();
      const likesArray = postData.likes;
      const likesIds = likesArray.map((docRef: DocumentReference) => docRef.id);
      return likesIds.includes(userDocRef.id);
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

const getLikes = async (postId: string): Promise<FirebaseResponse> => {
  try {
    const postDocRef = doc(db, POSTS_COLLECTION, postId);
    const postDocSnapshot = await getDoc(postDocRef);
    
    if (postDocSnapshot.exists()) {
      const likesArray = postDocSnapshot.data().likes;
      const likesData = [];

      for (const likeRef of likesArray) {
        const likeDocSnapshot = await getDoc(likeRef);
        if (likeDocSnapshot.exists()) {
          likesData.push({id: likeDocSnapshot.id, ...(likeDocSnapshot.data() || {})});
        }
      }
      return {
        data: likesData,
        error: false,
      };
    } else {
      throw new Error("El post no existe");
    }
  } catch (e) {
    console.log(e);
    return {
      data: null,
      error: true,
    };
  }
};

const follow = async (userIdLogged: string, userIdFollowing: string): Promise<FirebaseResponse> => {
  try {
    const userLoggedDocRef = doc(db, USERS_COLLECTION, userIdLogged);
    const userFollowingDocRef = doc(db, USERS_COLLECTION, userIdFollowing);
    // Añadiendo la referencia del seguido a los seguidos del usuario logueado
    await updateDoc(userLoggedDocRef, {
      following: arrayUnion(userFollowingDocRef)
    });
    // Añadiendo la referencia de seguidor a los seguidores del usuario seguido
    await updateDoc(userFollowingDocRef, {
      followers: arrayUnion(userLoggedDocRef)
    });
    return {
      data: "El usuario " + userLoggedDocRef.id + " ahora sigue a " + userFollowingDocRef.id,
      error: false,
    };
  } catch (e) {
    console.log(e);
    return {
      data: null,
      error: true,
    };
  }
};

const unfollow = async (userIdLogged: string, userIdFollowing: string): Promise<FirebaseResponse> => {
  try {
    const userLoggedDocRef = doc(db, USERS_COLLECTION, userIdLogged);
    const userFollowingDocRef = doc(db, USERS_COLLECTION, userIdFollowing);
    // Añadiendo la referencia del seguido a los seguidos del usuario logueado
    await updateDoc(userLoggedDocRef, {
      following: arrayRemove(userFollowingDocRef)
    });
    // Añadiendo la referencia de seguidor a los seguidores del usuario seguido
    await updateDoc(userFollowingDocRef, {
      followers: arrayRemove(userLoggedDocRef)
    });
    return {
      data: "El usuario " + userLoggedDocRef.id + " deja de seguir a " + userFollowingDocRef.id,
      error: false,
    };
  } catch (e) {
    console.log(e);
    return {
      data: null,
      error: true,
    };
  }
};

const getFollowers = async (userId: string): Promise<FirebaseResponse> => {
  try {
    const userDocRef = doc(db, USERS_COLLECTION, userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const followers = [];
      if (userData.followers) {
        // Recorre las referencias de seguidores y obtén los datos de cada usuario seguidor
        for (const followerRef of userData.followers) {
          const followerDoc = await getDoc(followerRef);
          if (followerDoc.exists()) {
            followers.push({id: followerDoc.id, ...(followerDoc.data() || {})});
          }
        }
      }
      return {
        data: followers,
        error: false,
      };
    } else {
      throw new Error("El usuario no existe");
    }
  } catch (e) {
    console.log("¡No tiene seguidores! -> "+ e);
    return {
      data: null,
      error: true,
    };
  }
};

const getFollowing = async (userId: string): Promise<FirebaseResponse> => {
  try {
    const userDocRef = doc(db, USERS_COLLECTION, userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const following = [];
      if (userData.following) {
        // Recorre las referencias de seguidos y obtén los datos de cada usuario seguido
        for (const followingRef of userData.following) {
          const followingDoc = await getDoc(followingRef);
          if (followingDoc.exists()) {
            following.push({id: followingDoc.id, ...(followingDoc.data() || {})});
          }
        }
      }
      return {
        data: following,
        error: false,
      };
    } else {
      throw new Error("El usuario no existe");
    }
  } catch (e) {
    console.log("¡No tiene seguidos! -> "+ e);
    return {
      data: null,
      error: true,
    };
  }
};

const checkFollow = async (userIdLogged: string, userIdFollowing: string): Promise<boolean> => {
  try {
    const userLoggedDocRef = doc(db, USERS_COLLECTION, userIdLogged);
    const userSnapshot = await getDoc(userLoggedDocRef);
    const userFollowingDocRef = doc(db, USERS_COLLECTION, userIdFollowing);

    if (userSnapshot.exists()) {
      const followingData = userSnapshot.data();
      const followingArray = followingData.following;
      const followingIds = followingArray.map((docRef: DocumentReference) => docRef.id);
      return followingIds.includes(userFollowingDocRef.id);
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

const addComment = async (postId: string, userId: string, username: string, avatar: string, commentText: string): Promise<FirebaseResponse> => {
  try {
    const comment: Comment = {
      user_id: userId,
      user_username: username,
      user_avatar: avatar,
      time: new Date,
      comment: commentText
    }
    const commentsCol = collection(db, COMMENTS_COLLECTION);
    const docRef = await addDoc(commentsCol, comment)

    const postDocRef = doc(db, POSTS_COLLECTION, postId);
    await updateDoc(postDocRef, {
      comments: arrayUnion(docRef)
    });
    return {
      data: docRef,
      error: false,
    };
  } catch (e) {
    console.log(e);
    return {
      data: null,
      error: true,
    };
  }
};

const getCommentsFromIdPost = async (postId: string): Promise<FirebaseResponse> => {
  try {
    const postDocRef = doc(db, POSTS_COLLECTION, postId);
    const postDoc = await getDoc(postDocRef);
    if (postDoc.exists()) {
      const postData = postDoc.data();
      const comments = [];
      if (postData.comments){
        for (const commentRef of postData.comments){
          const commentDoc = await getDoc(commentRef);
          if (commentDoc.exists()){
            comments.push({id: commentDoc.id, ...(commentDoc.data() || {})})
          }
        }
      }
      return {
        data: comments,
        error: false,
      };
    } else {
      throw new Error("El post no existe");
    }
  } catch (e) {
    console.log(e);
    return {
      data: null,
      error: true,
    };
  }
};

// const deleteCurses = async (key) => {
//     if (key) {
//         const curses = doc(db, USERS_COLLECTION, key);
//         const response = await deleteDoc(curses);
//     }
//     //todo: tratar errores
// }

const firebase = {
  getUsers,
  login,
  register,
  logOut,
  auth,
  getUser,
  getPosts,
  addPost,
  addLike,
  deleteLike,
  checkLike,
  getPostsFromIdUser,
  follow,
  unfollow,
  getFollowers,
  getFollowing,
  checkFollow,
  addComment,
  getCommentsFromIdPost
};

export default firebase;