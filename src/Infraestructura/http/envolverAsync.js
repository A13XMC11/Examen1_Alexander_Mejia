// Express 4 no captura errores de funciones async: esto los reenvía al manejador global
module.exports = function envolverAsync(manejador) {
  return (req, res, next) => Promise.resolve(manejador(req, res, next)).catch(next);
};