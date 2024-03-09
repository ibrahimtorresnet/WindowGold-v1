export function sendCategoryToServer(marcaData) {
   return fetch('http://localhost:3000/api/v1/marcas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(marcaData),
   })
   .then(response => response.json())
   .catch((error) => {
      console.error('Error:', error);
      throw error; // Asegúrate de manejar el error adecuadamente
   });
  }
 