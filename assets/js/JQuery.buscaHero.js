jQuery.fn.buscaHero = function(token, idNumber) {
  let element = $(this);

  let accessToken = token;
  let idHero = idNumber;

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
  .fail(function() {
    alert('Ooops! Parece que tenemos problemas. Intentalo más tarde.');
  });

  return this;

  // Define función para mostrar la card de super hero.
  function heroCard(element, response) {
    let heroCard = `
      <div class="card my-3 border-danger-subtle">
        <div class="row g-0">
          <div class="col-md-6">
            <img src="${response.image.url}" class="img rounded-start h-100 w-100 object-fit-cover" alt="...">
          </div>
          <div class="col-md-6 text-bg-dark">
          <div class="card-header p-4 border-bottom-1 border-danger-subtle">
            <h2 class="card-title">${response.name}</h2>
            <h3 class="card-title">${response.biography["full-name"]}</h3>
            <p class="card-text fs-4">${response.biography["place-of-birth"]}</p>
            <p class="card-text fs-5"> Aliases: ${response.biography["aliases"].join(', ')}</p>
            <p class="card-text fs-5"> Conexiones: ${response.connections.relatives}</p>
          </div>
            <div class="card-body p-4">
              <p class="card-text fs-5"> Ocupación: ${response.work.occupation}</p>
              <p class="card-text fs-5"> Primera Aparición: ${response.biography["first-appearance"]}</p>
              <p class="card-text fs-5"> Género: ${response.appearance.gender}</p>
              <p class="card-text fs-5"> Raza: ${response.appearance.race}</p>
              <span class="me-3 card-text fs-5">Altura: ${response.appearance["height"].join(' | ')}</span>
              <span class="card-text fs-5">Peso: ${response.appearance["weight"].join(' | ')}</span>
              <p class="card-text fs-5">Alianzas: ${response.connections["group-affiliation"]}</p>
              </div>
              <div class="card-footer border-top-1 border-danger-subtle">
              <em class="card-tex pt-4"><small> Publicado por: ${response.biography.publisher}</small></em>
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

    if (chartData.length === 0) { // Verifica si el array está vacío
      $("#chartContainer").html(`
        <p class='text-light fs-3 text-center'>Epic fail! Sin estadísticas</p>
        <img class='img-fluid w-50 text-center' src='assets/img/xxface.png' alt='cara x_x'>
      `);
    } else {
      let chart = new CanvasJS.Chart("chartContainer", {
        theme: "dark1",
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
