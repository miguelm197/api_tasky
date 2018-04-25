var mongoose = require('mongoose');

require('../models/comentario_mdl.js');

var SCH_Comentarios = mongoose.model('mdl_Comentario');

//GET - Retorna los comentarios de una tarea por id
exports.consultaComentarios = function (req, res) {
    console.log("comentarios");
    // SCH_Comentarios.find(function (err, comentarios) {
    SCH_Comentarios.find({ tareaId: req.params.idTarea }, function (err, comentarios) {
        if (err) res.send(500, err.message);
        res.status(200).jsonp(comentarios);
    });
};


//POST - Agrega un nuevo comentario a la tarea
exports.agregarComentario = function (req, res) {
    var comentario = new SCH_Comentarios({
        comentario: req.body.comentario,
        fecha: new Date(),
        hora: new Date(),
        usuario: req.body.usuarioEncargado,
        tareaId: req.params.idTarea
    });
    comentario.save(function (err, tarea) {
        if (err) return res.send(500, err.message);
        console.log('POST');
        console.log(comentario);
        res.status(200).jsonp(comentario);
    });
};




//PUT - Actualizar un comentario en la Base de Datos
exports.actualizarComentario = function (req, res) {
    SCH_Comentarios.findById(req.params.idComentario, function (err, comentario) {

        comentario.comentario = req.body.comentario;
        comentario.fecha = req.body.fecha;
        comentario.hora = req.body.hora;
        comentario.usuario = req.body.usuario;
        comentario.tareaId = req.body.tareaId;

        comentario.save(function (err) {
            if (err) return res.send(500, err.message);
            console.log('PUT Se modificó un comentario');
            console.log(comentario)
            res.status(200).jsonp(comentario);
        });
    });
};



//DELETE - Eliminar un comentario de la Base de Datos
exports.eliminarComentario = function (req, res) {
    SCH_Comentarios.findById(req.params.idComentario, function (err, comentario) {
        comentario.remove(function (err) {
            if (err) return res.send(500, err.message);

            var mensaje = { status: "ok" }
            console.log('DELETE Se eliminó una tarea');
            console.log(comentario);
            res.status(200).jsonp(mensaje);
        })
    });
};
