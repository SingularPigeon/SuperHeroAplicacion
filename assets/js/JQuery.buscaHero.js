// Plugin
jQuery.fn.buscaHero = function(token, idNumber) {
  let element = $(this);

  let accessToken = token; //variable para introducir el token personal que entrega la API
  let idHero = idNumber; // Id de número asignada a cada super hero

  const settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://superheroapi.com/api.php/${accessToken}/${idHero}`,
    "method": "GET",
    "dataType": "json",
    "headers": {
      "Accept": "*/*"
    }
  };
 
  $.ajax(settings)
  .done(function(response) {
    heroCard(element, response);
    chartCard(response);
  })
  .fail(function() { // alerta sin hay fallas de comunicación con la API
    alert('Ooops! Parece que tenemos problemas. Intentalo más tarde.');
  });

  return this;

  // Define función para mostrar la card de super hero.
  // Si el dato es "null" en la propiedad raza, no se muestra.
  function heroCard(element, response) {
    let heroCard = `
      <div class="card my-3 border-danger-subtle bg-dark h-100">
        <div class="row g-0">
          <div class="col-md-6">
            <img src="${response.image.url}" class="img rounded-start h-100 w-100 object-fit-cover" alt="...">
          </div>
          <div class="col-md-6 text-bg-dark rounded">
          <div class="card-header p-4 border-bottom-1 border-danger-subtle">
            <h2 class="card-title">${response.name}</h2>
            <p class="card-text fs-5">Nombre completo: ${response.biography["full-name"]}</p>
            <p class="card-text fs-5">Origen: ${response.biography["place-of-birth"]}</p>
            <p class="card-text fs-5"> Aliases: ${response.biography["aliases"].join(', ')}</p>
            <p class="card-text fs-5"> Conexiones: ${response.connections.relatives}</p>
          </div>
            <div class="card-body p-4">
              <p class="card-text fs-5"> Ocupación: ${response.work.occupation}</p>
              <p class="card-text fs-5"> Primera Aparición: ${response.biography["first-appearance"]}</p>
              <p class="card-text fs-5"> Género: ${response.appearance.gender}</p>
              ${response.appearance.race !== "null" ? `<p class="card-text fs-5"> Raza: ${response.appearance.race}</p>` : ''}
              <span class="me-3 card-text fs-5">Altura: ${response.appearance["height"].join(' | ')}</span>
              <span class="card-text fs-5">Peso: ${response.appearance["weight"].join(' | ')}</span>
              <p class="card-text fs-5">Alianzas: ${response.connections["group-affiliation"]}</p>
              </div>
              <div class="card-footer border-top-1 border-danger-subtle d-flex align-items-center justify-content-between pt-5 px-4">
              <p class="card-tex pt-4"><small> Publicado por: ${response.biography.publisher}</small></p>
              <img src="/assets/img/sh2.jpg" class="img icono rounded-circle object-fit-cover" alt="...">
              </div>
          </div>
        </div>
      </div>
    `;
    element.html(heroCard);
  }
// Define función para mostrar el gráfico de powerstats del super hero.
  function chartCard(response) {
    const chartData = [];
    for (const power in response.powerstats) {
      if (response.powerstats[power] !== "null") {
        chartData.push({ y: Number(response.powerstats[power]), label: power });
      }
    }

    if (chartData.length === 0) { // Verifica si el array está vacío y muestra mensaje sin estadísticas
      $("#chartContainer").html(`
        <div class="row d-flex flex-column align-items-center">
        <h3 class='text-danger fs-3 text-center'>Epic fail! Sin estadísticas</h3>
        <i class="fa-solid fa-face-dizzy face-dead text-warning"></i>
        </div>
      `);
    } else {
      // Si el array tiene datos, muestra el gráfico de CanvasJS
      let chart = new CanvasJS.Chart("chartContainer", {
        theme: "dark1",
        backgroundColor: "#212529",
        title: {
          animationEnabled: true,
          text: `Estadísticas de Poder para ${response.name}`,
          fontSize: 28
        },
        data: [
          {
            type: "doughnut",
            startAngle: 60,
            innerRadius: 40,
            indexLabelFontSize: 17,
            indexLabel: "{label} - #percent%",
            toolTipContent: "<b>{label}:</b> {y} (#percent%)",
            connectNullData: true,
            dataPoints: chartData
          }
        ]
      });
      chart.render();
    }
  }
}
