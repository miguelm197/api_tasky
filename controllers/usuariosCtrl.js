var mongoose = require('mongoose');
require('../models/usuario_mdl.js');

var SCH_Usuario = mongoose.model('mdl_usuario');

//GET - Retorna todas los usuarios del sistema
exports.consultaUsuarios = function (req, res) {
    SCH_Usuario.find(function (err, usuarios) {
        if (err) res.send(500, err.message);
        console.log('GET /usuarios');
        res.status(200).jsonp(usuarios);
    });
};

//GET - Retorna un usuario por id
exports.consultaUsuarioPorId = function (req, res) {
    SCH_Usuario.findById(req.params.id, function (err, usuario) {
        if (err) res.send(500, err.message);
        console.log('GET /usuarios/' + req.params.id);
        res.status(200).jsonp(usuario);
    });
};


//GET - Retorna un usuario por correo
exports.consultaUsuarioPorCorreo = function (req, res) {
    SCH_Usuario.find({ correo: req.params.correo }, function (err, usuario) {
        if (err) res.send(500, err.message);
        console.log('GET /usuarios/' + req.params.correo);
        console.log(usuario)
        res.status(200).jsonp(usuario);
    });
};








//POST - Agrega un nuevo usuario
exports.agregarUsuario = function (req, res) {
    var usuario = new SCH_Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        rol: req.body.rol,
        clave: req.body.clave,
        activo: req.body.activo
    });
    usuario.save(function (err, usuario) {
        if (err) return res.send(500, err.message);
        console.log('POST');
        console.log(usuario);
        res.status(200).jsonp(usuario);
    });
};

//PUT - Actualizar un usuario por id en la Base de Datos
exports.actualizarUsuarioPorId = function (req, res) {
    SCH_Usuario.findById(req.params.id, function (err, usuario) {
        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.correo = req.body.correo;
        usuario.rol = req.body.rol;
        usuario.clave = req.body.clave;
        usuario.activo = req.body.activo;

        usuario.save(function (err) {
            if (err) return res.send(500, err.message);
            console.log('PUT Se modificó un usuario');

            res.status(200).jsonp(usuario);
        });
    });
};

//DELETE - Eliminar una tarea de la Base de Datos
exports.eliminarUsuario = function (req, res) {
    SCH_Usuario.findById(req.params.id, function (err, usuario) {
        usuario.remove(function (err) {
            if (err) return res.send(500, err.message);
            var mensaje = {
                status: "ok"
            }
            res.status(200).jsonp(mensaje);
            console.log('DELETE Se eliminó el usuario ' + req.params.id);
        })
    });
};
