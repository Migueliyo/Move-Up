# Introducción
## Datos del proyecto

| Nombre           | Apellidos          | Título                 | Ciclo              | Año              | Centro educativo    |
| ---------------- | ------------------ | ---------------------- | ------------------ | ---------------- | ------------------- |
|Miguel Angel      |Colmenero Palacios  |MoveUp                  |DAM                 |2023              |IES Virgen del Carmen|

## Primeras ideas del proyecto
En un principio, estás fueron las primeras ideas que tuve:

* La idea principal de mi proyecto es desarrollar una aplicación híbrida con Ionic.
* La aplicación tratará de ser una red social, con una interfaz parecida a la de TikTok, Instagram BeReal… , en la que puedas agregar amigos, tener tus publicaciones, interactuar con amigos (la idea es la realización de un chat pero como todavía no sé la dificultad que puede llegar a tener esta idea se puede eliminar en un futuro), etc. La diferencia de mi aplicación en cuanto a las demás es que ésta estará enfocada a la realización de ejercicio físico. 
* Se presentarán desafíos dentro de la aplicación que se deben realizar compartiendo un video de que se han realizado (por ejemplo se presenta un desafío de hacer 50 flexiones en los próximos 10 minutos). Tus amigos o personas externas pueden decidir si el desafío ha sido superado o no.
* Se obtendrán puntos dentro de la aplicación que serán acumulables y se podrán canjear por recompensas. Por ejemplo, si se tratara de una aplicación real y contara con el patrocinio de marcas como Myprotein, se podrían obtener recompensas como una camiseta o un suplemento al alcanzar un número de puntos dentro de la aplicación. 
* Habrá un ranking semanal/mensual del que más puntos ha obtenido entre amigos y globalmente y los primeros obtendrán puntos dentro de la aplicación.
* Se podrán compartir, además de publicaciones, rutinas y los demás usuarios podrán interactuar con ellas, escribir comentarios, compartirlas, etc. Además también se podrían publicar quedadas en un lugar concreto dentro de la aplicación.
* Se puede tener un seguimiento del progreso dentro de la aplicación (objetivos, peso, marcas). Esto podría realizarse o no, pero en caso de hacerlo sería de forma muy general ya que la aplicación no está orientado a esto.
* Se podrán realizar desafíos entre los usuarios de la aplicación en el que se notifique al otro usuario de que le han retado (puede haber recompensas de puntos por la victoria o derrota del desafío, aceptar o rechazar el desafío, un tiempo límite para realizarlo, etc). 
* Al tratarse una red social, dispondrá de un login y de un menú inferior en el que se podrán acceder a todas las partes de la aplicación con un estilo parecido a aplicaciones como Youtube, Instagram, TikTok, etc. ya que he observado que actualmente todas las aplicaciones actuales cuentan con uno.

## Descripción del proyecto
Cómo más adelante se puede apreciar claramente en los diagramas de casos de uso, las ideas que al final han sido definitivas para el desarrollo de mi aplicación han sido muchas menos que las que tenía al principio. 

Mi aplicación consta de una interfaz bastante parecida a Instagram en la que se pueden realizar las siguientes funcionalidades:
* La aplicación consta de un login y un registro contra Firebase Authentication y un usuario que se setea en el contexto una vez hecho login.
* Cuenta con un menú de tabs en el que se pueden acceder a todas las partes de la aplicación entre las que se encuentran:
  * Home: Se visualizará todo el contenido que se suba en la aplicación
  * Explore: Se podrán buscar por el nombre de usuario todos los usuarios registrados en la aplicación
  * New: Se subirá contenido a través de la cámara o alguna imagen del dispositivo
  * Friends: Se mostrarán solo los posts de las personas que sigues y se podrá filtrar por cada una de ellas
  * Myprofile: Se podrá acceder al perfil del usuario logueado

* Se puede visitar el perfil de cualquier usuario que esté utilizando la aplicación
* Se puede comentar en el post de cualquier usuario
* Se puede añadir un like o "dar me gusta" a cualquier post
* Se pueden guardar los posts a los que posteriormente se tendrá acceso en el perfil de dicho usuario. También serán visibles para las demás personas que utilicen la aplicación.
* Se puede acceder a tus seguidores y seguidos y a los de los demás usuarios en el correspondiente perfil de cada uno
* Las publicaciones cuentan con un menú donde se puede acceder a una nueva ventana y obtener información sobre la cuenta, además de que si son del propio usuario, se pueden eliminar.

## Planificación

Esta sería aproximadamente la planificación del proyecto:

* Semana del 27 al 31 de marzo 
  * Organización y fases del trabajo  (planificación, recursos que podría necesitar, viabilidad…). Tecnologías que queremos usar...
  * Ideas iniciales sobre el mismo (los “deseos” o “características” de SCRUM)
  * Elementos del proyecto (qué pretendemos generar: un manual o tutorial, un producto software…, la memoria y la presentación)
  * Preparamos la plantilla del documento a entregar, o, en su defecto el repositorio vacío para empezar a documentar en Markdown
* Semana del 10 al 14 de abril 
  * Título
  * Objetivos iniciales (convertimos los deseos o características en requisitos)
  * Breve resumen del mismo (esta semana debe estar subido al repositorio en nuestro GitLab)
  * Investigación de estudios y proyectos similares (lo que llamamos “estado del arte”)
* Semana del 17  al 21 de abril
  * Investigación de estudios y proyectos similares  (plasmarlo en la documentación)
  * Introducción (generar este apartado en la documentación)
  * Objetivos definitivos (generar este apartado en la documentación), exactamente qué estamos haciendo
  * Material y recursos a utilizar (recoger detalladamente todos los recursos que se disponen y/o necesitarán en la documentación)
* Semana del 24 al 28 de abril 
  * Métodos seguidos en el proceso, metodologías, tecnologías (ej. porqué usar un lenguaje o framework concreto y no otro)
* Semana del 3 al 5 de mayo 
  * Resultados iniciales (primeros “bocetos” del programa)
  * Analizar si hace falta cambiar algo de los requisitos o tecnologías inicialmente planificadas y explicar si hay algún cambio porqué se ha hecho. Esto se plasma en la documentación
* Semana del 8 al 19 de mayo (dos semanas) 
  * Resultados intermedios (demo funcional)
  * Primera revisión de la documentación para ver que estén todos los puntos necesarios 
* Semana del 22 al 26 de mayo
  * Resultados finales (proyecto terminado: tutorial, aplicación…) 
  * Segunda revisión del documento donde ya estén todos los apartados necesarios 
  * Preparación de la presentación 
* Semana del 29 de mayo al 9 de junio 
  * Pulimos los posibles “bugs”
  * Entrega del documento final 
* Semana del 12 al 16 de junio  
  * Organización de la presentación
  * Entrega de la presentación para la exposición 
* Semana del 19 al 22 de junio  
  * Presentación de proyectos


