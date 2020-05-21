 $(document).ready(function() {

function buildQueryURL() {
   // if(queryParams != '') {
    // queryURL is the url we'll use to query the API
    var  queryParams = $("#countryInput").val();

    var queryURL = "https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&timelines=true&country=";
  
    $('#country').text (queryParams)

    console.log(queryParams)
    return queryURL + queryParams;
    
// }else{
//               $("#error").html('Field cannot be empty');
//         }
  }

// This function appends searched country to the countryCard
function showCountry(data) {
    var countryName = $("#countryInput").val();

    var totalConfirmedCountry = data.latest.confirmed; 

    var totalDeathsCountry = data.latest.deaths
    
    var countryPopulation = data.locations[0].country_population;

    // Convert date
    let lastUpaded = new Date(data.locations[0].last_updated);
    let dd = lastUpaded.getDate();

    let mm = lastUpaded.getMonth()+1; 
    const yyyy = lastUpaded.getFullYear();
    if(dd<10) 
        {
        dd=`0${dd}`;
        } 

        if(mm<10) 
        {
        mm=`0${mm}`;
        } 

        lastUpaded = `${mm}/${dd}/${yyyy}`;

        // Message on country population and death percentage
        var deathPercentageByCountryPopulation = ((parseInt(data.latest.deaths)) / (parseInt(countryPopulation))
       
        *100).toLocaleString("en", {minimumFractionDigits: 3, maximumFractionDigits: 4});

        var message = `${deathPercentageByCountryPopulation} percent of ${countryName} population dead from COVID-19`

        var percentageOfCountryDeath = ((parseInt(data.latest.deaths)) / (parseInt(totalConfirmedCountry))
       
            *100).toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + "%";

        // appending data to UI 

        $('#message').text (message); //
        $('#deaths').text (totalDeathsCountry); //
        $('#country-cases').text (totalConfirmedCountry); //
        $('#country-population').text (countryPopulation); 
        $('#update').text (lastUpaded)
        $('#percent').text (percentageOfCountryDeath)
        $('#country').text (countryName)

}

$('#search').click(function(event) {
    event.preventDefault();

    queryURL = buildQueryURL();

$.ajax({
    url: queryURL,
    method: "GET",

    }).then(showCountry);
})
 // AJAX CALL FOR GLOBAL DATA
    var globalURL = "https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&timelines=true"

     $.ajax({
         url: globalURL,
         method: "GET",

     }).then(function(data) {
        console.log(data)
            
         var totalConfirmedGlobal = data.latest.confirmed;
         var totalDeathsGlobal = data.latest.deaths;
         
        $('#global-cases').text (totalConfirmedGlobal)
        $('#global-deaths').text (totalDeathsGlobal)
     })

    //var infoURL = "https://covidtracking.com/api/states/info";
    var countryURL = "http://covidtracking.com/api/us";
    var stateURL = "https://covidtracking.com/api/states";

//============Begin Country Stats (United States)===================//
$.ajax({
    url: countryURL,
    method: "GET",
   
   }).then(function(countryURL) {
       
   var total_TestedResults, total_hospitalized, total_confirmed, onVentilator, total_recovered, total_deaths, last_updated;
 
   total_TestedResults = countryURL[0].totalTestResults;
   total_hospitalized = countryURL[0].hospitalized;
   total_confirmed = countryURL[0].positive;
   onVentilator = countryURL[0].onVentilatorCurrently;
   total_recovered = countryURL[0].recovered;
   total_deaths = countryURL[0].death;
   last_updated = countryURL[0].lastModified;
 
    $("#total_TestedResults").append(total_TestedResults);
    $("#total_hospitalized").append(total_hospitalized);
    $("#total_confirmed").append(total_confirmed);
    $("#onVentilator").append(onVentilator);
    $("#total_recovered").append(total_recovered);
    $("#total_deaths").append(total_deaths);
    $("#last_updated").append(last_updated);
})
//============End Country Stats (United States)===================//


$.ajax({
    url: stateURL,
    method: "GET",
   
   }).then(function(stateData) {
   console.log(stateData)
   var total_recovered, total_deaths, total_confirmed;

   // 4 empty arrays for chart
    var state = []
    var positive = []
    var recovered = []
    var death = []
 
     $.each(stateData, function(id, obj){
         state.push(obj.state)
         positive.push(obj.positive)
         recovered.push(obj.recovered)
         death.push(obj.death)
   
   })
      
    total_confirmed = stateData[0].positive;
    total_recovered = stateData[0].recovered;
    total_deaths = stateData[0].death;
 
    $("#confirmed").append(total_confirmed);
    $("recovered").append(total_recovered);
    $("#deceased").append(total_deaths);
    
    
 var myChart = document.getElementById('myChart').getContext('2d');
 
 var chart = new Chart(myChart, {
     type: 'bar',
     fill: false,
     data: {
         labels: state,
         datasets: [
             {
                 label: "Confirmed Cases",
                 data: positive,
                 backgroundColor: "#f1c40f",
                 minBarLength: 100
             },
             {
                 label: "Recovered Cases",
                 data: recovered,
                 backgroundColor: "green",
                 minBarLength: 100
             },
             {
                label: "Deceased",
                data: death,
                backgroundColor: "red",
                minBarLength: 200
            }
         ]
     },
     options:{
        title: {
            display: true,
            text: 'US STATES'
        },
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        }
     }
 })
})
})