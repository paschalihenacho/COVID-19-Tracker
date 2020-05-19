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

        var percentageOfCountryDeath = ((Number(deaths)/Number(totalConfirmedCountry))
            *100).toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + "%";

        // appending data to UI

        $('#deaths').text (totalDeathsCountry);
        $('#country-cases').text (totalConfirmedCountry);
        $('#country-population').text (countryPopulation); 
        $('#update').text (lastUpaded)
        $('#percent').text (percentageOfCountryDeath)

        console.log(data);
       
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