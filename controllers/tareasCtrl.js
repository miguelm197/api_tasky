var mongoose = require('mongoose');
require('../models/tarea_mdl.js');

var SCH_Tarea = mongoose.model('mdl_Tarea');

//GET - Retorna todas las Tareas de la Base de Datos
exports.consultaTareas = function (req, res) {
    SCH_Tarea.find(function (err, tareas) {
        if (err) res.send(500, err.message);
        console.log('GET /tareas');
        res.status(200).jsonp(tareas);
    });
};

//GET - Retorna  la tarea con id
exports.consultaTareaPorId = function (req, res) {
    SCH_Tarea.findById(req.params.id, function (err, tarea) {
        if (err) res.send(500, err.message);
        console.log('GET /tareas/' + req.params.id);
        res.status(200).jsonp(tarea);
    });
};

//POST - Agrega una nueva tarea en la Base de Datos
exports.agregarTarea = function (req, res) {
    var tarea = new SCH_Tarea({
        estado: req.body.estado,
        resumen: req.body.resumen,
        descripcion: req.body.descripcion,
        usuarioEncargado: req.body.usuarioEncargado,
        fechaCreado: req.body.fechaCreado
    });
    tarea.save(function (err, tarea) {
        if (err) return res.send(500, err.message);
        console.log('POST');
        console.log(tarea);
        res.status(200).jsonp(tarea);
    });
};

//PUT - Actualizar una tarea en la Base de Datos
exports.actualizarTarea = function (req, res) {
    SCH_Tarea.findById(req.params.id, function (err, tarea) {

        tarea.estado = req.body.estado;
        tarea.resumen = req.body.resumen;
        tarea.descripcion = req.body.descripcion;
        tarea.usuarioEncargado = req.body.usuarioEncargado;
        tarea.fechaCreado = req.body.fechaCreado;

        tarea.save(function (err) {
            if (err) return res.send(500, err.message);
            console.log('PUT Se modificó una tarea');

            res.status(200).jsonp(tarea);
        });
    });
};

//DELETE - Eliminar una tarea de la Base de Datos
exports.eliminarTarea = function (req, res) {
    SCH_Tarea.findById(req.params.id, function (err, tarea) {
        tarea.remove(function (err) {
            if (err) return res.send(500, err.message);

            var mensaje = {
                status: "ok"
            }
            res.status(200).jsonp(mensaje);
            console.log('DELETE Se eliminó una tarea');
        })
    });
};