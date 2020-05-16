$(document).ready(function() {

// "https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&country_code=AU&province=South%20Australia&county=Australia&timelines=true"
//  = ((Number(deaths)/Number(confirmedCases))*100).toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + "%";
//      if(countryName != '' || countryCode != '' || countryProvince != '') {
// *******     Code goes here
//    }else{
//            $("#error").html('Field cannot be empty');
//     }
var baseURL = "https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&timelines=true";

function loadData(baseURL) {

    
    var countryCode = '';
    var countryProvince = '';
    
    $.ajax({
        url: baseURL,
        method: "GET",

    }).then(function(data) {
            
       // var rating = response.Rated;

        console.log(data);
        console.log(data.locations[0].country_population)
        console.log(baseURL);
    })
         
}

 // AJAX CALL FOR GLOBAL DATA
    // var countryCode = '';
    // var countryProvince = '';
    
    $.ajax({
        url: baseURL,
        method: "GET",

    }).then(function(data) {
            
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

$('#search').click(function(event) {
    event.preventDefault();
    baseURL = baseURL;
    
var countryName  = $("#input").val();
newURL = baseURL + "&country=" + countryName;
loadData(newURL);
$('#country').text (countryName)
    console.log(newURL);

  // loadData(newURL);
})

})