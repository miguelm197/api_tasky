exports = module.exports = function (app, mongoose) {

    var esquemaUsuario = new mongoose.Schema({
        nombre: { type: String },
        apellido: { type: String },
        correo: { type: String },
        rol: { type: String },
        clave: { type: String },
        activo: { type: String }
    });

    mongoose.model('mdl_usuario', esquemaUsuario, 'usuarios');
    //                 /              |            \
    //                /               |             \
    //      Nombre de referencia      |              |
    //                      esquema exportado        |
    //                                       documento de la bd
};