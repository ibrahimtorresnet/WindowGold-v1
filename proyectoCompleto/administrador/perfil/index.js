document.getElementById('updateButton').addEventListener('click', function() {
    // Add your update logic here
    alert('Form updated!');
});




function openModal() {
    document.getElementById('modal').style.display = 'block';
  }
  
  function closeModal() {
    document.getElementById('modal').style.display = 'none';
  }

  document.getElementById('logo').addEventListener('change', function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
        document.getElementById('imagenCircular').style.backgroundImage = 'url(' + reader.result + ')';
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        document.getElementById('imagenCircular').style.backgroundImage = '';
    }
});