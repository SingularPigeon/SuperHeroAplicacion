$(document).ready(function() {
  // Validación
  // Escuchamos click del formulario
  $("form").on("submit", formulario)
})

const formulario = function(e) {
  e.preventDefault();
  
  let idNumber = $("#numHeroe").val();
  
  validarFormulario(idNumber);
}

function validarFormulario(numero) {
  const token = 'f52c189c1bcbbf87b67ec786967e3351'
  const regex = /^[0-9]+$/;
  if (regex.test(numero) && numero > 0 && numero <= 731 ) {
    // aplicar plugin
    $(".heroe").heroe(token, numero)
  } else {
    alert("Kaboon! Intenta con un número")
  }
}





