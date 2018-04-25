exports = module.exports = function (app, mongoose) {

    var esquemaComentario = new mongoose.Schema({
        comentario: { type: String },
        fecha: { type: String },
        hora: { type: String },
        usuario: { type: String },
        tareaId: { type: String },
    });

    mongoose.model('mdl_Comentario', esquemaComentario, 'comentarios');

};