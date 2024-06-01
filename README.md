# Move Up

## Autor 👨‍💻
**Miguel Angel Colmenero Palacios**  
Junio 2023

## Introducción ✍️
Move Up es un proyecto de desarrollo de una aplicación híbrida con Ionic, cuyo objetivo principal es crear una red social de publicaciones interactiva.

## Descripción 📝
El desarrollo final de la aplicación incluye las siguientes funcionalidades:
- **Login y Registro:** Autenticación con Firebase.
- **Menú de Tabs:** Navegación entre Home, Explore, New, Friends, y MyProfile.
  - **Home:** Visualización de contenido.
  - **Explore:** Búsqueda de usuarios registrados.
  - **New:** Subida de contenido desde la cámara o dispositivo.
  - **Friends:** Visualización de publicaciones de amigos.
  - **MyProfile:** Acceso al perfil del usuario logueado.
- **Interacciones:** Visitar perfiles, comentar posts, dar likes, guardar posts, acceder a seguidores y seguidos.
- **Publicaciones:** Menú para obtener información sobre la cuenta y eliminar publicaciones propias.
La planificación del proyecto se distribuyó en las siguientes semanas:

## Puesta en marcha del proyecto 🚀
Para desplegar el proyecto de manera local en tu navegador
```bash
npm install
npm run dev
```

Para desplegar la aplicación Android utilizando un IDE asociado
```bash
npx cap open android
```

Para desplegar la aplicación iOS utilizando un IDE asociado
```bash
npx cap open ios
```

Para aplicar cualquier cambio realizado en el código Ionic y que sea aplicado en las aplicaciones móviles
```bash
npm run build
npx cap sync
```