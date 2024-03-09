// Importa la función para enviar datos de categoría al servidor
import { sendCategoryToServer } from './API.js';

// Función para manejar el envío del formulario de categoría
document.getElementById('categoryForm').addEventListener('submit', function(event) {
 event.preventDefault(); // Evita el envío tradicional del formulario
  
 // Crea un objeto FormData a partir del formulario
 const formData = new FormData(event.target);
 // Crea un objeto marcaData con los datos del formulario
 const marcaData = {
      nombre: formData.get('nombreMarca'), // Asegúrate de que 'nombreMarca' coincida con el nombre del campo en tu formulario
      cantidadProductos: 0, // O el valor inicial que desees
      // estado: formData.get('status') // Asegúrate de que 'status' coincida con el nombre del campo en tu formulario si es necesario
 };
  
 // Llama a la función para enviar los datos de la marca al servidor
 sendCategoryToServer(marcaData)
      .then(data => {
        console.log('Marca guardada con éxito:', data);
        // Aquí puedes actualizar la tabla en el frontend con la nueva marca
        createTableRow(data); // Asegúrate de que esta función esté disponible en este contexto
      })
      .catch((error) => {
        console.error('Error:', error);
      });
});

// Función para crear una nueva fila en la tabla
function createTableRow(data) {
 const table = document.getElementById('table');
 const tr = document.createElement('tr');

 // Agrega contenido a la fila
 Object.values(data).forEach((value) => {
    const td = document.createElement('td');
    td.textContent = value;
    tr.appendChild(td);
 });

 // Agrega botón de borrar
 const buttonTd = document.createElement('td');
    
 const button = document.createElement('button');
 button.textContent = "Borrar"; // Establece el texto del botón como "Borrar"
 button.dataset.id = data.id; // Asegúrate de que 'data' incluya el 'id'
 buttonTd.appendChild(button);


 button.addEventListener('click', function() {
    tr.remove();
    updateLocalStorageOnDelete(data);
 });
 buttonTd.appendChild(button);
 tr.appendChild(buttonTd);

 // Agrega la fila a la tabla
 table.appendChild(tr);
}

// Función para actualizar el localStorage cuando se borra un elemento
function updateLocalStorageOnDelete(deletedData) {
 let items = JSON.parse(localStorage.getItem('items3')) || [];
 items = items.filter(item => item.nombreCategoria !== deletedData.nombreCategoria);
 localStorage.setItem('items3', JSON.stringify(items));
}

// Función para agregar un elemento al localStorage
function addToLocalStorage(newItem) {
 let items = JSON.parse(localStorage.getItem('items3')) || [];
 items.push(newItem);
 localStorage.setItem('items3', JSON.stringify(items));
}

// Función para inicializar el modal y manejar su comportamiento
function initializeModal() {
 const modal = document.getElementById('myModal');
 const closeBtn = document.querySelector('.close');
 const saveBtn = document.querySelector('.guardar');

 document.querySelector('.button').addEventListener('click', () => {
    modal.style.display = 'block';
 });

 closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
 });

 window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
 });

 saveBtn.addEventListener('click', () => {
    const data=getFormValues();
    createTableRow(data);
    addToLocalStorage(data);
    modal.style.display = 'none';
 });
}

// Función para recrear los elementos del localStorage en la tabla
function rebuildTableFromLocalStorage() {
 let items = JSON.parse(localStorage.getItem('items3')) || [];
 items.forEach(item => {
    createTableRow(item);
 });
}

// Función principal para iniciar la aplicación
function main() {
 rebuildTableFromLocalStorage();
 initializeModal();
}

// Ejecutar la función principal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', main);

let dezplasador = document.querySelector(".mas");
let subPuntos = document.querySelectorAll(".sub_puntos");

dezplasador.addEventListener("click", () => {
 subPuntos.forEach(subPunto => {
    subPunto.classList.toggle('hidden');
 });
});

// Función para abrir el modal
function openModal() {
 document.getElementById('modal').style.display = 'block';
}

// Función para cerrar el modal
function closeModal() {
 document.getElementById('modal').style.display = 'none';
}
 