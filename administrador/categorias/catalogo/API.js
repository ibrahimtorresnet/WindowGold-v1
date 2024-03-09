export function sendCategoryToServer(categoryData) {
   // Asegúrate de que la URL sea correcta y que el servidor esté configurado para recibir POST en esta ruta.
   return fetch('/api/v1/categories', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify(categoryData),
   })
   .then(response => response.json())
   .catch((error) => {
       console.error('Error:', error);
       throw error;
   });
}

export function getCategoriesFromServer() {
   return fetch('/api/v1/categories')
   .then(response => response.json())
   .catch((error) => {
       console.error('Error:', error);
       throw error;
   });
}

export function deleteCategoryFromServer(id) {
   return fetch(`/api/v1/categories/${id}`, {
       method: 'DELETE',
   })
   .then(response => {
       if (!response.ok) {
           throw new Error('Error al realizar la solicitud');
       }
       return response.json();
   })
   .then(data => {
       if (!data.success) {
           throw new Error(data.error || 'Error desconocido al borrar la categoría');
       }
       return data;
   })
   .catch((error) => {
       console.error('Error:', error);
       throw error;
   });
}
