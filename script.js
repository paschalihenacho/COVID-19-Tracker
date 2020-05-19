// $(document).ready(function() {

// "https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&country_code=AU&province=South%20Australia&county=Australia&timelines=true"
// 
//      if(countryName != '' || countryCode != '' || countryProvince != '') {
// *******     Code goes here
//    }else{
//            $("#error").html('Field cannot be empty');
// //     }
// var baseURL =  + countryName;
//var countryName  = '';

function buildQueryURL() {

    // queryURL is the url we'll use to query the API
    var  queryParams = $("#countryInput").val();

    var queryURL = "https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&timelines=true&country=";
  
    $('#country').text (queryParams)

    console.log(queryParams)
    return queryURL + queryParams;
    
  }


function showCountry(data) {

        var totalConfirmedCountry = data.latest.confirmed; 

        var totalDeathsCountry = data.latest.deaths
    
        var countryPopulation = data.locations[0].country_population;

        var lastUpaded = data.locations[0].last_updated;
//
        var percentageOfCountryDeath = ((parseInt()(deaths)/parseInt(totalConfirmedCountry))
            *100).toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + "%";

        // appending data to UI

        $('#deaths').text (totalDeathsCountry);
        $('#country-cases').text (totalConfirmedCountry);
        $('#country-population').text (countryPopulation); 
        $('#update').text (lastUpaded)
        $('#percent').text (percentageOfCountryDeath)

        console.log(data);

        
       
}

var colors = ['#007bff','#28a745','#444444','#c3e6cb','#dc3545','#6c757d'];

var chBar = document.getElementById("chBar");
var chartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  datasets: [{
    data: [589, 445, 483, 503, 689, 692, 634],
    backgroundColor: colors[0]
  },
  {
    data: [209, 245, 383, 403, 589, 692, 580],
    backgroundColor: colors[1]
  },
  {
    data: [489, 135, 483, 290, 189, 603, 600],
    backgroundColor: colors[2]
  },
  {
    data: [639, 465, 493, 478, 589, 632, 674],
    backgroundColor: colors[4]
  }]
};

if (chBar) {
  new Chart(chBar, {
  type: 'bar',
  data: chartData,
  options: {
    scales: {
      xAxes: [{
        barPercentage: 0.4,
        categoryPercentage: 0.5
      }],
      yAxes: [{
        ticks: {
          beginAtZero: false
        }
      }]
    },
    legend: {
      display: false

    }
}
});
}



var colors = ['#007bff','#28a745','#333333','#c3e6cb','#dc3545','#6c757d'];

/* large line chart */
var chLine = document.getElementById("chLine");
var chartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  datasets: [{
    data: [589, 445, 483, 503, 689, 692, 634],
    backgroundColor: 'transparent',
    borderColor: colors[0],
    borderWidth: 4,
    pointBackgroundColor: colors[0]
  },
  {
    data: [639, 465, 493, 478, 589, 632, 674],
    backgroundColor: colors[3],
    borderColor: colors[1],
    borderWidth: 4,
    pointBackgroundColor: colors[1]
  }]
};

if (chLine) {
  new Chart(chLine, {
  type: 'line',
  data: chartData,
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: false
        }
      }]
    },
    legend: {
      display: false
    }
  }
  });
}


$('#search').click(function(event) {
    event.preventDefault();

    queryURL = buildQueryURL();
   // countryName  = $("#input").val();

   //showCountry(baseURL);

$.ajax({
    url: queryURL,
    method: "GET",

    }).then(showCountry);
//  console.log(baseURL);
   // buildQueryURL(queryURL);
})
 // AJAX CALL FOR GLOBAL DATA
    // var countryCode = '';
    // var countryProvince = '';
    var baseURL = "https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&timelines=true"

     $.ajax({
         url: baseURL,
         method: "GET",

     }).then(function(data) {
        //console.log(deaths)
        console.log(data)
            
         var totalConfirmedGlobal = data.latest.confirmed;
         var totalDeathsGlobal = data.latest.deaths;
       // var totalRecoveredGlobal = data.latest.recovered;
        $('#global-cases').text (totalConfirmedGlobal)
        $('#global-deaths').text (totalDeathsGlobal)
     })

     

// function myLineChart() { new Chart(ctx, {
//     type: 'line',
//     data: [20, 10],
//     options: showLines,
//     backgroundColor: 'rgba(102, 254, , 0.1)',
//     label: 
// });

//})