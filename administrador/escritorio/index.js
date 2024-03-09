let dezplasador = document.querySelector(".mas");
let subPuntos = document.querySelectorAll(".sub_puntos");

dezplasador.addEventListener("click", () => {

    subPuntos.forEach(subPuntos => {
        
        subPuntos.classList.toggle('hidden');
    })
        
   
});



function openModal() {
    document.getElementById('modal').style.display = 'block';
  }
  
  function closeModal() {
    document.getElementById('modal').style.display = 'none';
  }
  
  