<<<<<<< HEAD
# webv2
=======
# THIS Jowi Web App

Esta es una aplicación web de música y videos denominada **THIS Jowi**. El proyecto integra un backend en Node.js con Express y MySQL, y un frontend dividido en varias secciones para reproducir música, navegar videos y gestionar el perfil del usuario.

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Uso y Ejecución](#uso-y-ejecución)
- [Base de Datos](#base-de-datos)
- [Notas sobre Git y .gitignore](#notas-sobre-git-y-gitignore)
- [Licencia](#licencia)

## Descripción General

El proyecto consiste en:
- **Frontend:**  
  - Secciones de inicio, música y videos.
  - Páginas de login, registro, perfil y ajustes de perfil.
  - Interfaz moderna y responsiva, con funcionalidades como drag-drop para subir imágenes y filtros para canciones.
- **Backend:**  
  - Servidor en Node.js usando Express para gestionar rutas de login, registro, actualización de perfil, y manejo de sesiones.
  - Conexión a una base de datos MySQL (nombre de la base de datos: `musicai`).
  - Uso de bcrypt para encriptación de contraseñas y express-session para el manejo de sesiones.

## Estructura del Proyecto

```
/home/joel/Documentos/web/
├── INICIO/
│   ├── inicio.html
│   └── TEST.HTML
├── MUSICAI/
│   ├── musicai.html
│   ├── style.css
│   └── Registro/    // (Páginas relacionadas al registro o módulos específicos de música)
├── RECURSOS/
│   ├── img/         // Imágenes (perfil, portadas, etc.)
│   ├── Login/
│   │   ├── Backend/
│   │   │   ├── server.js   // Servidor Express (uso de MySQL, rutas, sesiones)
│   │   │   ├── db.js       // Conexión a la base de datos
│   │   │   └── package.json
│   │   └── Frontend/      // Páginas de login, ajustes, y perfil
│   ├── music/       // Archivos de audio (.mp3)
│   └── videos/      // Archivos de video (esta carpeta se ignora en Git)
├── profile.html     // Página de perfil del usuario
├── script.js        // Funciones generales del frontend (reproductor, login, etc.)
└── .gitignore       // Configurado para ignorar RECURSOS/videos y BACKUPS
```

## Requisitos

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [MySQL](https://www.mysql.com/) (o [Microsoft SQL Server Express en Linux](https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-ubuntu))
- Git

## Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/THISJowi/web.git
   cd web
   ```

2. **Instalar dependencias del backend**

   Navega a la carpeta del backend y ejecuta:

   ```bash
   cd RECURSOS/Login/Backend
   npm install
   ```

3. **Configurar la base de datos**

   - Ejecuta el script SQL provisto en [musicai.sql](RECURSOS/Login/Backend/musicai.sql) en tu gestor MySQL para crear la base de datos y las tablas necesarias.
   - Si es necesario, actualiza las credenciales en `server.js` y `db.js`.

## Uso y Ejecución

1. **Iniciar el servidor**

   Desde la carpeta `RECURSOS/Login/Backend`:

   ```bash
   node server.js
   ```

   El servidor se iniciará en `http://localhost:3000`.

2. **Acceder a la aplicación**

   - Visita `http://localhost:3000/` para ver la página de inicio.
   - Usa las rutas definidas para login, registro, perfil y ajustes:
     - `/RECURSOS/Login/Frontend/login.html`
     - `/RECURSOS/Login/Frontend/ajustes.html`
     - `/perfil` (redirige a la página de perfil)
     - `/logout` para cerrar sesión.

## Base de Datos

El script SQL ubicado en `RECURSOS/Login/Backend/musicai.sql` crea las tablas principales, tales como:

- `usuarios` – Para almacenar usuarios (nombre, contraseña hasheada).
- `songs` – Para almacenar canciones (nombre, artista, imagen).
  
Puedes ampliar este esquema para incluir listas de reproducción, artistas, etc., según los requerimientos de la aplicación.

## Notas sobre Git y .gitignore

El archivo [.gitignore](.gitignore) está configurado para ignorar las carpetas que contienen archivos pesados o no necesarios para el control de versiones, como:

```
RECURSOS/videos/
BACKUPS/
```

Si necesitas reiniciar el repositorio o eliminar archivos pixelados del índice, puedes usar:

```bash
git rm -r --cached RECURSOS/videos
git rm -r --cached BACKUPS
```

Luego realiza commit y push.

## Licencia

Este proyecto se distribuye bajo la [Licencia GPL v3](LICENSE).

---

¡Disfruta desarrollando con THIS Jowi Web App!
>>>>>>> 4d0dd90 (Reinicio del repositorio desde cero)
