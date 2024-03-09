const store = require('./store.js');

function addArticulo(articulo) {
 return new Promise((resolve, reject) => {
    if (!articulo.nombre || !articulo.id || !articulo.categoria || !articulo.codigo || !articulo.marca || !articulo.precioCompra || !articulo.precioVenta || !articulo.moneda || !articulo.cantidadPorUnidad || !articulo.fecha || !articulo.estado) {
      return reject('Faltan datos necesarios para el artículo');
    }

    const newArticulo = {
      nombre: articulo.nombre,
      id: articulo.id,
    
      codigo: articulo.codigo,
    
      precioCompra: articulo.precioCompra,
      precioVenta: articulo.precioVenta,
      moneda: articulo.moneda,
      cantidadPorUnidad: articulo.cantidadPorUnidad,
      fecha: articulo.fecha,
      estado: articulo.estado,
      accion: articulo.accion || 'no eliminado' // Asume 'no eliminado' por defecto si no se especifica
    };

    store.create(newArticulo);
    resolve(newArticulo);
 });
}

function getAllArticulos() {
 return new Promise((resolve, reject) => {
    store.listArticulos() // Asegúrate de que esta función esté definida en store.js
      .then(articulos => resolve(articulos))
      .catch(err => reject(err));
 });
}

function create(newArticulo) {
 return new Promise((resolve, reject) => {
    // Aquí puedes implementar la lógica para guardar el nuevo artículo, por ejemplo, agregándolo al arreglo de artículos
    articulos.push(newArticulo);
    resolve(newArticulo);
 });
}

// Función para obtener todos los artículos
function listArticulos() {
 return new Promise((resolve, reject) => {
    resolve(articulos); // Retorna todos los artículos
 });
}

module.exports = {
 addArticulo,
 getAllArticulos,
 create,
 listArticulos
};
