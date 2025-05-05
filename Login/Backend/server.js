const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3000;

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '092007', // Cambia esto por tu contraseña de MySQL
  database: 'musicai' // Cambia esto por el nombre de tu base de datos
});

db.connect(err => {
  if (err) throw err; // Asegúrate de que se maneja el error correctamente
  console.log('Conectado a la base de datos');
});

// Configuración de sesiones
app.use(session({
  secret: 'mi_secreto', // Secreto para firmar las sesiones
  resave: false,
  saveUninitialized: true
}));

// Middleware para parsear formularios
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta "web"
// Asegúrate de que la ruta sea correcta en tu sistema
app.use(express.static('/home/joel/Documentos/web'));

// Servir archivos estáticos para Login/Frontend, INICIO y MUSICAI
app.use('/login', express.static(path.join(__dirname, '../Frontend')));
app.use('/inicio', express.static(path.join(__dirname, '../../INICIO')));
app.use('/musicai', express.static(path.join(__dirname, '../../MUSICAI')));

// Ruta principal (por ejemplo, para ver la página de inicio)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../INICIO/inicio.html'));
});

// Ruta para registrar usuarios
app.post('/registro', async (req, res) => {
  const { usuario, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO usuarios (usuario, password) VALUES (?, ?)';
  db.query(query, [usuario, hashedPassword], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al registrar el usuario');
    }
    res.send('Usuario registrado con éxito');
  });
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
  const { usuario, password } = req.body;
  const query = 'SELECT * FROM usuarios WHERE usuario = ?';
  db.query(query, [usuario], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al iniciar sesión');
    }
    if (results.length === 0) {
      return res.status(401).send('Usuario no encontrado');
    }
    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Contraseña incorrecta');
    }
    // Guardamos el usuario en la sesión y su id
    req.session.user = user.usuario;
    req.session.userId = user.id;
    res.redirect('/home');
  });
});

// Ruta para obtener el usuario actual
app.get('/current-user', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, usuario: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// Ruta de inicio (home) después de login
app.get('/home', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  res.sendFile(path.join(__dirname, '../../INICIO/inicio.html'));
});

// Ruta para cerrar sesión
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      return res.status(500).send("Error al cerrar sesión");
    }
    res.redirect('/');
  });
});

// Rutas para ajustes y perfil (verifican que el usuario esté autenticado)
app.get('/ajustes', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  res.sendFile(path.join(__dirname, '/Frontend/ajustes.html'));
});
app.get('/perfil', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  res.sendFile(path.join(__dirname, 'Login/Frontend/perfil.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
