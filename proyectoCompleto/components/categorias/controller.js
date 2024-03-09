
  const store = require('./store.js');

// CRUD = C = create, R = Read, U = Update, D = Delete
function addCategory(category) {
 return new Promise((resolve, reject) => {
    if (!category.nombre || !category.estado || category.cantidadProductos === undefined) {
      return reject('Nombre, estado o cantidad de productos inválidos');
    }

    // Aquí puedes añadir lógica adicional si es necesario, por ejemplo, validar el estado

    // Llama a createCategory y espera el resultado
    store.create(category)
      .then(result => {
        // Añade el ID de la categoría al objeto de la categoría
        const newCategory = {
          nombre: category.nombre,
         
          cantidadProductos: category.cantidadProductos,
          estado: category.estado
        };
        resolve(newCategory);
      })
      .catch(error => reject(error));
 });
}

function listUsers() {
 return new Promise((resolve, reject) => {
    // Asegúrate de que esta función exista en tu módulo store.js
      resolve(store.list())
 });
}

function deleteCategory(id) {
 return new Promise((resolve, reject) => {
     store.deleteCategory(id)
       .then(() => resolve({ message: 'Categoría borrada con éxito' }))
       .catch(error => reject(error));
 });
}

module.exports = {
 listUsers,
 addCategory,
 deleteCategory
};
