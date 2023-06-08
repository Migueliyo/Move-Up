# Implementación

## Script de introducción de los datos en Firestore

Cualquier persona que haya trabajado con Cloud Firestore de manera gratuita, es decir, sin tener ningún plan de pago y sin obtener funciones especiales, sabrá a la perfección para la introducción de datos se debe hacer de uno en uno ya que no te permite importar un archivo json ni nada por el estilo. Para solucionar este problema, he realizado un script que me solucionara este problema. Dicho script se encuentra en la parte de helpers del proyecto.

### Explicación de los arrays de datos
Lo primero que he tenido que hacer han sido los arrays con los datos de los campos que iban a tener cada usuario, entre ellos, nombre, apellido, descripción, etc. Este es el ejemplo de uno de ellos de apellidos españoles:

```javascript
export const surname = ["García", "González", "Rodríguez", "Fernández", "López", "Martínez", "Sánchez", "Pérez", "Gómez", "Martín", "Jiménez", "Ruiz", "Hernández", "Díaz", "Moreno", "Álvarez", "Muñoz", "Romero", "Alonso", "Gutiérrez", "Navarro", "Torres", "Domínguez", "Vázquez", "Cruz", "Ramos", "Ortega", "Castro", "Serrano", "Santos", "Rubio", "Marín", "Núñez", "Iglesias", "Medina", "Silva", "Garrido", "Cortés", "Moya", "Sola", "Campos", "Vega", "Mora", "Diez", "Soto", "Sáez", "Blanco", "Castillo", "Prieto", "Santiago", "Arias", "Soria", "Flores", "Rojas", "Esteban", "Parra", "Bravo", "Montes", "Gallardo", "Roca", "Sánchez-Campoamor", "Aguilera", "Pascual", "Delgado", "Ferrer", "Guerrero", "Caballero", "Herrera", "León", "Ramírez", "Suárez", "Galán", "Molina", "Rubia", "Palacios", "Morales", "Fuentes", "Sáez-Díez", "Vicente", "Calvo", "Carrasco", "Miranda", "Lorenzo", "Montero", "Ferreruela", "Pardo", "Rivas", "Aparicio", "Lozano", "Otero", "Merino", "Rico", "Cobo", "Clemente", "Carrillo", "Perea", "Palomo", "Antón"];
```

Todos estos arrays se exportaran del archivo **arrays.js** para ser importados en, ahora sí, el script de introducción de datos.

### Explicación del script de introducción de datos

Lo primero que se ha hecho en el script es la configuración de firebase. Dicha configuración no es algo complicado ya que está todo incluido en la documentación y además en la parte de configuración de tu proyecto te lo proporciona.

```javascript
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
```

Ahora lo que he ido haciendo es, a partir de los arrays importados anteriormente y de la clase Math, generar todos los campos necesarios para cada usuario que va a ser alojado en la base de datos.
* Generación de números aleatorios de seguidos:

```javascript
const following = [];

for (let i = 0; i < 100; i++) {
  const randomNum = Math.floor(Math.random() * 900) + 100; // Genera un número aleatorio entre 100 y 999
  following.push(randomNum);
}
```

* Para la generación de un número aleatorio de seguidores he utilizado una _template string_ que debía de usarse cuando el número de seguidores fuera mayor de 4 cifras.

```javascript
const followers = [];

for (let i = 0; i < 50; i++) {
  const randNum = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  const randStr = `${Math.floor(Math.random() * 100)},${Math.floor(Math.random() * 9) + 1}K`;
  followers.push(Math.random() < 0.5 ? randNum : randStr);
}
```

* Generación de IDs aleatorios válidos para Firestore:

```javascript
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
```

Había que crear el método para que realizar el post a la base de datos:

```javascript
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
```

Una vez hecho esto, ya solo quedaba recorrer los arrays a través de un bucle y asignar a cada usuario creado un campo de dicho array. Para la creación del nombre de usuario he vuelto a utilizar una _template string_ en la que el nombre de usuario estuviera compuesto por las tres primeras letras del nombre, las tres primeras letras del apellido y un número de dos cifras aleatorio.

```javascript
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
```

Para finalizar, tan solo había que ejecutar dicho script con nodejs y esperar a que todos los datos se introdujeran correctamente en la base de datos:

![Captura de la ejecución del script](/docs/media/script.png)

## Modificación del archivo vite.congif.ts

Una modificación importante que he tenido que realizar en el archivo *vite.config.ts* ha sido la implementación del siguiente código:

```typescript
optimizeDeps: {
    exclude: [`@ionic/pwa-elements/loader`],
  }
```

Hecho esto y, siguiendo el tutorial de como implmentar la cámara y la subida de archivos desde el dispositivo adjuntado en la bibliografía, he podido conseguir que funcionara. Este punto me parecía crítico ya que, en el propio tutorial, no se mencionaba y he tenido que buscar bastante información para solucionarlo. El archivo *vite.config.ts* ha quedado así:

```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';

export default defineConfig({
  optimizeDeps: {
    exclude: [`@ionic/pwa-elements/loader`],
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
});
```

## Reglas Cloud Firestore y Storage

Para lanzar tu proyecto en modo producción en Firebase, deben de haber unas reglas que se deben configurar sobre qué y quienes pueden leer y escribir datos. En el caso de aplicación, para su uso, se necesitaba un logueo previo por lo que estas reglas en sí en *modo de pruebas* (modo en el que todos pueden leer y escribir datos) no tenían mucha repercusión. Pero lo ideal, tal y como debe de hacerse, es definiendo una serie de reglas que, en mi caso, es que para escribir y leer los datos de mi aplicación solo lo podrán hacer los que se hayan logueado contra la autenticación de firebase, también usada en mi aplicación. 

![Captura de las reglas de Cloud Firestore](/docs/media/firestore.png)

Al igual que en Cloud Firestore, para utilizar el Storage de Firebase pasa exactámente lo mismo. Para su uso se deben definir una serie de reglas. En el caso de mi aplicación, utilizo el Storage de Firebase para almacenar todo el contenido que se sube y alojarlo en una url que después consumo. Tal y como definí anteriormente que solo los usuarios logueados pudieran leer y escribir los datos, en este caso hice lo mismo.

![Captura de las reglas de Cloud Firestore](/docs/media/storage.png)