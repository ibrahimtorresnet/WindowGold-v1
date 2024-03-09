import { sendCategoryToServer, getCategoriesFromServer, deleteCategoryFromServer } from './API.js';

function createTableRow(data) {
    const tr = document.createElement('tr');
     console.log(data)
    Object.values(data).forEach((value) => {
        const td = document.createElement('td');
        td.textContent = value;
        tr.appendChild(td);
    });

    const buttonTd = document.createElement('td');
    
    const button = document.createElement('button');
    button.textContent = "Borrar"; // Establece el texto del botón como "Borrar"
    button.dataset.id = data.id; // Asegúrate de que 'data' incluya el 'id'
    buttonTd.appendChild(button);

    button.addEventListener('click', function () {
        const id = this.dataset.id;
        deleteCategoryFromServer(id)
            .then(response => {
                if (response.success) {
                    tr.remove();
                    loadCategoriesAndBuildTable();
                } else {
                    console.error('Error al borrar la categoría:', response.error);
                }
            })
            .catch(error => console.error('Error al borrar la categoría:', error));
    });

    return tr;
}

document.getElementById('categoryForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const categoryData = {
        nombre: formData.get('fname'),
        cantidadProductos: 0,
        estado: formData.get('status')
    };

    sendCategoryToServer(categoryData)
    .then(data => {
        console.log('Categoría guardada con éxito:', data);
        // Asegúrate de que 'data' incluya el 'id'
        const newRow = createTableRow({ ...data, id: data.id });
        const table = document.getElementById('table');
        const tbody = table.querySelector('tbody');
        tbody.appendChild(newRow);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

function loadCategoriesAndBuildTable() {
    getCategoriesFromServer()
        .then(response => {
            const categoryList = response.map(cate => cate.data);
            const table = document.getElementById('table');
            const tbody = table.querySelector('tbody');
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }
            categoryList.forEach(category => {
                const newRow = createTableRow(category);
                tbody.appendChild(newRow);
            });
        })
        .catch(error => console.log(error));
}

document.addEventListener('DOMContentLoaded', loadCategoriesAndBuildTable);
// Inicialización de modal y manejo de su comportamiento
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('myModal');
    const closeBtn = document.querySelector('.close');
    const saveBtn = document.querySelector('.button-confirm');
    function getFormValues() {
        const form = document.getElementById('categoryForm'); // Asegúrate de que este ID coincide con el ID de tu formulario en el HTML
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        return data;
    }

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
        const data = getFormValues(); // Asegúrate de que esta función existe
        createTableRow(data);
        // Añadir a localStorage
        // Por ejemplo: addToLocalStorage(data);
        modal.style.display = 'none';
    });
});
