export function sendCompraToServer(compraData) {
   return fetch('/api/v1/compras', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(compraData),
   })
   .then(response => response.json())
   .catch((error) => {
      console.error('Error:', error);
      throw error;
   });
  }
