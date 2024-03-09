// Función para obtener los valores del formulario
function getFormValues() {
  const id = getNextId();   
  return {
      producto: document.querySelector('#nombreProducto').value,
      id, // Agregar un ID único
      cliente: document.querySelector('#cliente').value, // Asegúrate de que el selector coincida con el id del input
      nroIdentidad: '', // Asegúrate de que este campo exista en el formulario
      cantidadPorUnidad: document.querySelector('#cantidad').value,
      precio: document.querySelector('#PrecioCompra').value,
      totalPagado: document.querySelector('#precioConIva').value, // Agrega el precio con IVA
      moneda: document.querySelector('#moneda').value, // Asegúrate de que el selector coincida con el id del select
      fecha: document.querySelector('#fecha').value
  };
 }
 
 // Función para obtener el siguiente ID
 function getNextId() {
  let nextId = JSON.parse(localStorage.getItem('nextId')) || 1;
  localStorage.setItem('nextId', JSON.stringify(nextId + 1));
  return nextId;
 }
 
 // Función para crear una nueva fila y agregarla a la tabla
 function createTableRow(data) {
  const table = document.getElementById('table');
  const tr = document.createElement('tr');
 
  // Crear y añadir celdas a la nueva fila en el orden correcto
  const celdas = ['producto', 'id', 'cliente', 'nroIdentidad', 'cantidadPorUnidad', 'precio', 'totalPagado', 'moneda', 'fecha'];
  celdas.forEach(celda => {
       const td = document.createElement('td');
       td.textContent = data[celda];
       tr.appendChild(td);
  });
 
  // Crear el botón de borrar
  const tdBorrar = document.createElement('td');
  const btnBorrar = document.createElement('button');
  btnBorrar.textContent = 'Borrar';
  btnBorrar.addEventListener('click', function() {
     // Eliminar la fila de la tabla
     table.removeChild(tr);
     // Aquí puedes agregar código para eliminar el elemento del localStorage si es necesario
  });
  tdBorrar.appendChild(btnBorrar);
  tr.appendChild(tdBorrar);
 
  // Agregar la nueva fila a la tabla
  table.appendChild(tr);
 }
 // Función para actualizar el localStorage cuando se borra un elemento
 function updateLocalStorageOnDelete(deletedData) {
  let items = JSON.parse(localStorage.getItem('items5')) || [];
  items = items.filter(item => item.id !== deletedData.id);
  localStorage.setItem('items5', JSON.stringify(items));
 }
 
 // Función para manejar el envío del formulario
 function handleFormSubmit(event) {
  const form = document.getElementById('productForm');
  if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
  } else {
      event.preventDefault();
      const formValues = getFormValues();
      createTableRow(formValues);
      addToLocalStorage(formValues);
      document.getElementById('productForm').reset();
 
      document.getElementById('myModal').style.display = 'none';
  }
  form.classList.add('was-validated');
 }
 
 // Función para agregar un elemento al localStorage
 function addToLocalStorage(newItem) {
  let items = JSON.parse(localStorage.getItem('items5')) || [];
  items.push(newItem);
  localStorage.setItem('items5', JSON.stringify(items));
 }
 
 // Función para inicializar el modal y manejar su comportamiento
 function initializeModal() {
  const modal = document.getElementById('myModal');
  const closeBtn = document.querySelector('.close');
  const saveBtn = document.querySelector('.guardar');
 
  // Controlador de eventos para el botón "Crear compra"
  document.getElementById('crearProductoButton').addEventListener('click', function() {
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
 
  saveBtn.addEventListener('click', handleFormSubmit);
 }
 
 // Función para recrear los elementos del localStorage en la tabla
 function rebuildTableFromLocalStorage() {
  let items = JSON.parse(localStorage.getItem('items5')) || [];
  items.forEach(item => {
      createTableRow(item);
  });
 }
 
 // Función para calcular el IVA y el precio final
 function calcularPrecioConIva() {
  const precioCompra = parseFloat(document.querySelector('#PrecioCompra').value) || 0;
  const iva = parseFloat(document.querySelector('#iva').value) || 0;
  const precioConIva = precioCompra + (precioCompra * (iva / 100));
  document.querySelector('#precioConIva').value = precioConIva.toFixed(2);
 }
 
 // Agrega un controlador de eventos para el botón de calcular IVA
 document.querySelector('.calcular').addEventListener('click', calcularPrecioConIva);
 
 // Agrega un controlador de eventos para el botón de guardar
 document.querySelector('.guardar').addEventListener('click', handleFormSubmit);
 
 // Inicializa el modal
 initializeModal();
 
 // Reconstruye la tabla desde el localStorage
 rebuildTableFromLocalStorage();
 
 document.addEventListener('DOMContentLoaded', function() {
  // Aquí puedes colocar cualquier código que necesite que el DOM esté completamente cargado
 });
 