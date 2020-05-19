// $(document).ready(function() {

// "https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&country_code=AU&province=South%20Australia&county=Australia&timelines=true"
//  = ((Number(deaths)/Number(confirmedCases))*100).toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + "%";
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

    var queryURL = "https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&timelines=true&country=" + queryParams;
  
   
  // ===========================
    // Logging the URL so we have access to it for troubleshooting
   // console.log("---------------\nURL: " + queryURL + "\n---------------");
    //console.log(queryURL + $.param(queryParams));
    console.log(queryParams)
    return queryURL
    // + queryParams;
    
  }


function showCountry(data) {
   // var baseURL = "https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&timelines=true";
   console.log(data);
    

            
       // var rating = response.Rated;
       // Retrieving data
        var totalConfirmedCountry = data.locations[0].confirmed;
        console.log(data.locations[0].confirmed);
        var countryPopulation = data.locations[0].country_population;

        // appending data to UI
        $('#country-cases').text (totalConfirmedCountry);
        $('#country-population').text (countryPopulation);
        console.log(data);
        console.log(data.locations[0].country_population)
        console.log(baseURL);
    })       
}



         
}





$('#search').click(function(event) {
    event.preventDefault();
    //var baseURL = "https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&timelines=true" + "&country=" + countryName;
    queryURL = buildQueryURL();
   // countryName  = $("#input").val();
   // $('#country').text (countryName)

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

<<<<<<< HEAD
})
=======
//})
>>>>>>> f768eb54391647e4e27927398d58c966263de80d
