const db = require('./model.js');

/**
 * Obtiene todas las categorías de la colección.
 * @returns {Promise<Array>} Lista de categorías.
 */
async function getAllCategories() {
 const docRef = await db.collection('categorias').get();
 return docRef.docs.map(doc => {
    return { id: doc.id, data: doc.data() }
 });
}

/**
 * Obtiene una categoría específica por su ID.
 * @param {string} id - ID de la categoría.
 * @returns {Promise<Object>} Datos de la categoría.
 */
async function getCategoryById(id) {
 const doc = await db.collection('categorias').doc(id).get();
 return doc.data();
}

/**
 * Crea una nueva categoría en la colección.
 * @param {Object} category - Datos de la categoría a crear.
 * @returns {Promise<Object>} Objeto con el ID de la categoría creada.
 */
async function createCategory(category) {
 const docRef = await db.collection('categorias').add(category);
 return { id: docRef.id, ...category };
}

/**
 * Actualiza una categoría existente.
 * @param {string} id - ID de la categoría a actualizar.
 * @param {Object} newData - Nuevos datos para la categoría.
 * @returns {Promise<Object>} Datos de la categoría actualizada.
 */
async function updateCategory(id, newData) {
 const docRef = db.collection('categorias').doc(id);
 await docRef.update(newData);
 return getCategoryById(id); // Devuelve la categoría actualizada
}

/**
 * Elimina una categoría específica.
 * @param {string} id - ID de la categoría a eliminar.
 * @returns {Promise<Object>} Objeto indicando si la eliminación fue exitosa.
 */
async function deleteCategory(id) {
 const docRef = db.collection('categorias').doc(id);
 try {
    await docRef.delete();
    return { success: true };
 } catch (error) {
    throw new Error(`Error al borrar la categoría: ${error.message}`);
 }
}

module.exports = {
 create: createCategory,
 get: getCategoryById, // Cambiado a 'get' para claridad
 list: getAllCategories,
 update: updateCategory,
 delete: deleteCategory // Cambiado a 'delete' para claridad
};
