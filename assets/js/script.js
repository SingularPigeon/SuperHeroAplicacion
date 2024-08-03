$(document).ready(function() {
  // Validación
  // Escuchamos click del formulario
  $("form").on("submit", formulario)
})

const formulario = function(e) {
  //prevenir acciones por defecto
  e.preventDefault();
  // Obtenemos ID del elemento
  let idNumber = $("#numHeroe").val();

  validarFormulario(idNumber);
}

function validarFormulario(numero) {

  const token = 'f52c189c1bcbbf87b67ec786967e3351'
  const regex = /^[0-9]+$/; // validación de que el valor ingresado sean números
  
  if (regex.test(numero) && numero > 0 && numero <= 731 ) {
    // se aplica el plugin buscaHero
    $(".heroe").buscaHero(token, numero)
    // animación del scroll automático hacia el resultado de la busqueda
    $('html,body').animate({
      scrollTop: $(".heroe").offset().top
    },1000); 
    
  } else {// alerta de fuera de rango
    alert("Kaboon! Intenta con un número entre 1 y 731")
  }
}





