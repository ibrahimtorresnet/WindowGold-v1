// store.js
const db = require('./model.js');

async function getAllArticulos() {
 const docRef = await db.collection('articulos').get();
 return docRef.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function getOnlyArticulo(id) {
 const doc = await db.collection('articulos').doc(`${id}`).get();
 return doc.exists ? { id: doc.id, ...doc.data() } : null;
}

async function createArticulo(articulo) {
 const docRef = await db.collection('articulos').add(articulo);
 return { id: docRef.id, ...articulo };
}

async function updateArticulo(id, newData) {
 const docRef = db.collection('articulos').doc(id);
 await docRef.update(newData);
 return getOnlyArticulo(id); // Devuelve el articulo actualizado
}

module.exports = {
 create: createArticulo,
 getOnly: getOnlyArticulo,
 list: getAllArticulos,
 update: updateArticulo,
};
