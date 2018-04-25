var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require('mongoose');


var connectionString = "mongodb://root:toor@ds249325.mlab.com:49325/taskybd?authSource=taskybd";

mongoose.connect(connectionString, function (err, res) {
    if (err) throw err;
    console.log('Conectado a la Base de Datos');
});

//ESTO PERMITE RECIBIR PETICIONES FUERA DE ESTE DOMINIO
function perimitirCrossDomain(req, res, next) {
    //en vez de * se puede definir SÓLO los orígenes que permitimos
    res.header('Access-Control-Allow-Origin', '*');
    //metodos http permitidos para CORS
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}


// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(perimitirCrossDomain);


// Imports de Modelo y Controlador
var mdlTarea = require('./models/tarea_mdl')(app, mongoose);
var ctrlTarea = require('./controllers/tareasCtrl');

var mdlCOmentario = require('./models/comentario_mdl')(app, mongoose);
var ctrlComentario = require('./controllers/comentariosCtrl');

var mdlUsuario = require('./models/usuario_mdl')(app, mongoose);
var ctrlUsuario = require('./controllers/usuariosCtrl');




// Ruteo
var router = express.Router();

router.get('/', function (req, res) {
    res.send("Que tal sabandijas!");
});

router.route('/tareas')
    .get(ctrlTarea.consultaTareas)
    .post(ctrlTarea.agregarTarea);

router.route('/tareas/:id')
    .get(ctrlTarea.consultaTareaPorId)
    .put(ctrlTarea.actualizarTarea)
    .delete(ctrlTarea.eliminarTarea);

router.route('/comentarios/:idTarea')
    .get(ctrlComentario.consultaComentarios)
    .post(ctrlComentario.agregarComentario)

router.route('/comentarios/:idComentario')
    .put(ctrlComentario.actualizarComentario)
    .delete(ctrlComentario.eliminarComentario)

router.route('/usuarios')
    .get(ctrlUsuario.consultaUsuarios)
    .post(ctrlUsuario.agregarUsuario);

router.route('/usuarios/:id')
    .get(ctrlUsuario.consultaUsuarioPorId)
    .put(ctrlUsuario.actualizarUsuarioPorId)
    .delete(ctrlUsuario.eliminarUsuario);

router.route('/uscor/:correo')
    .get(ctrlUsuario.consultaUsuarioPorCorreo)

app.use(router);

// Start server
app.listen(5000, function () {
    console.log("Node server running on http://localhost:5000");
});
