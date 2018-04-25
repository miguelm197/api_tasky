exports = module.exports = function (app, mongoose) {

    var esquemaTarea = new mongoose.Schema({
        estado: { type: String },
        resumen: { type: String },
        descripcion: { type: String },
        usuarioEncargado: { type: String },
        fechaCreado: { type: String }
    });

    mongoose.model('mdl_Tarea', esquemaTarea, 'tareas');
    //                 /              |            \
    //                /               |             \
    //      Nombre de referencia      |              |
    //                      esquema exportado        |
    //                                       documento de la bd

};