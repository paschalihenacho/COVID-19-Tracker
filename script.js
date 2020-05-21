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

// var chartURL = "https://thevirustracker.com/timeline/map-data.json"

// var chartURL = "https://api.apify.com/v2/datasets/jaycEQiGMlb7aOmtI/items?format=json&clean=1"
//var chartURL = "https://api.covid19india.org/data.json"

// var stateURL = "https://covidtracking.com/api/states";
// var usURL = "http://covidtracking.com/api/us";
// var infoURL = "https://covidtracking.com/api/states/info";

//  $.ajax({
//      url: stateURL,
//     method: "GET",

//  }).then(function(data) {
  
//     console.log(data + "USA")
   
//   var total_active, total_recovered, total_deaths, total_confirmed;

//   // 4 empty arrays for chart
//    var state = []
//    var confirmed = []
//    var recovered = []
//    var deaths = []

//     $.each(data.statewise, function(id, obj){
//         state.push(obj.state)
//         confirmed.push(obj.confirmed)
//         recovered.push(obj.recovered)
//         deaths.push(obj.deaths)

  
//   })

//     state.shift()
//     confirmed.shift()
//     recovered.shift()
//     deaths.shift()

//    // console.log(state)
     

//    total_active = data.statewise[0].active;
//    total_confirmed = data.statewise[0].confirmed;
//    total_recovered = data.statewise[0].recovered;
//    total_deaths = data.statewise[0].deaths;

//    $("#active").append(total_active);
//    $("#confirmed").append(total_confirmed);
//    $("recovered").append(total_recovered);
//    $("#deceased").append(total_deaths);
   
   
// var myChart = document.getElementById('myChart').getContext('2d');

// var chart = new Chart(myChart, {
//     type: 'bar',
//     fill: false,
//     data: {
//         labels: state,
//         datasets: [
//             {
//                 label: "Confirmed Cases",
//                 data: confirmed,
//                 backgroundColor: "#f1c40f",
//                 minBarLength: 100
//             },
//             {
//                 label: "Recovered Cases",
//                 data: recovered,
//                 backgroundColor: "green",
//                 minBarLength: 100
//             }
//         ]
//     },
//     options:{}
// })




//   var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://covid-19-data.p.rapidapi.com/report/country/name?date-format=YYYY-MM-DD&format=json&date=2020-05-01&name=usa",
//     "method": "GET",
//     "headers": {
//         "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
//         "x-rapidapi-key": "409edfd192msh76f5ae7cd381374p17ad34jsn668e30d41ee5"
//     }
// }
//var  queryParams = $("#countryInput").val();
// $.ajax(settings).done(function (response) {
//     console.log(response[0].provinces[0]);
// });


//  })



function buildQueryURL() {
   // if(queryParams != '') {
    // queryURL is the url we'll use to query the API
        
   // ******IMPORTANT******
   //var queryURL =  "https://api.covid19api.com/live/country/US"
 


    var  queryParams = $("#countryInput").val();

    var queryURL = "https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&timelines=true&country=";
  
    $('#country').text (queryParams)

    console.log(queryParams)
    return queryURL + queryParams;
    
// }else{
//               $("#error").html('Field cannot be empty');
//         }
  }



function showCountry(data) {

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


        var percentageOfCountryDeath = ((parseInt(data.latest.deaths)) / (parseInt(totalConfirmedCountry))
       
            *100).toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + "%";

        // appending data to UI

        $('#deaths').text (totalDeathsCountry); //
        $('#country-cases').text (totalConfirmedCountry); //
        $('#country-population').text (countryPopulation); 
        $('#update').text (lastUpaded)
        $('#percent').text (percentageOfCountryDeath)

        // console.log(data);
        // console.log(data.locations[0].timelines)

      //  setTimeout(showCountry, 2000) // update every 2 secs
//========================================================================================
//       var total_deaths, total_confirmed, total_recovered ;

//    // 4 empty arrays for chart
//    var timelines = []
//    var recovered = [] 
//    var confirmed = []
//    var deaths = []

//     $.each(data.locations, function(id, obj){
//         timelines.push(obj.timelines)
//         confirmed.push(obj.confirmed)
//         recovered.push(obj.recovered)
//         deaths.push(obj.deaths)

  
//     })

//     timelines.shift()
//     confirmed.shift()
//     recovered.shift()
//     deaths.shift()

//    // console.log(state)
     

//    total_active = data.locations[0].timelines;
//    total_confirmed = data.locations[0].confirmed;
//    total_recovered = data.locations[0].recovered;
//    total_deaths = data.locations[0].deaths;

//    $("#active").append(total_active);
//    $("#confirmed").append(total_confirmed);
//    $("recovered").append(total_recovered);
//    $("#deceased").append(total_deaths);
//       var myChart = document.getElementById('myChart').getContext('2d');

//         var chart = new Chart(myChart, {
//     type: 'line',
//     data: {
//         labels: timelines,
//         datasets: [
//             {
//                 label: "Deaths",
//                 data: deaths,
//                 backgroundColor: "Red",
//                 minBarLength: 100
//             },
//             {
//                 label: "Recovered Cases",
//                 data: recovered,
//                 backgroundColor: "green",
//                 minBarLength: 100
//             },
//             {
//                 label: "Confirmed Cases",
//                 data: confirmed,
//                 backgroundColor: "Yellow",
//                 minBarLength: 100
//             }
//         ]
//     },
//     options:{}
// })

}
//===============================================================================

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
       // var totalRecoveredGlobal = data.latest.recovered;
        $('#global-cases').text (totalConfirmedGlobal)
        $('#global-deaths').text (totalDeathsGlobal)
     })

     $(document).ready(function(){

  //  var TestqueryURL =  "https://api.covid19api.com/live/country/China"
    //https://api.covid19api.com/summary
    var TestqueryURL = "https://api.covid19api.com/live/country/US/status/confirmed"

   $.ajax({
    url: TestqueryURL,
    method: "GET",

}).then(function(data) {
  console.log(data)
//    var totalDeath = 0;
//    for (i = 0; i < data.length; i++) {
//        totalDeath += data[i].Deaths;
//    }
//    console.log(totalDeath);


})

var infoURL = "https://covidtracking.com/api/states/info";
var stateURL = "https://covidtracking.com/api/states";

$.ajax({
 url: infoURL,
 method: "GET",

}).then(function(info) {
console.log(info)


})

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
 
    //  state.shift()
    //  confirmed.shift()
    //  recovered.shift()
    //  deaths.shift()
 
    // console.log(state)
      
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
        }
     }
 })
   
   })
})