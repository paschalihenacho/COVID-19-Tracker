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
   last_updated =  (moment(countryURL[0].lastModified).format('LLLL'));
//    var dateFormat = require('dateformat');
//     last_updated = new Date(countryURL[0].lastModified);
//    dateFormat(last_updated, "dddd, mmmm dS, yyyy, h:MM:ss TT");

  
 
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
  // console.log(stateData)
   var recovered, death, positive;

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
      
    // total_confirmed = stateData[0].positive;
    // total_recovered = stateData[0].recovered;
    // total_deaths = stateData[0].death;
 
    // $("#confirmed").append(total_confirmed);
    // $("#recovered").append(total_recovered);
    // $("#deceased").append(total_deaths);
    
    
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

$(document).ready(function() {
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function() {
            window.location.hash = target;
        });
    });
});

function buildCountryQueryURL() {
 var queryParams = $("#countryInput").val();
//  var queryParams = 'US'

//  var queryURL = `https://api.covid19api.com/live/country/${queryParams}/status/confirmed`;
var queryURL = `https://api.thevirustracker.com/free-api?countryTimeline=${queryParams}`

$('#country').text (queryParams)
// console.log(queryURL)
// console.log(queryParams)

$.ajax({
    // url: 'https://api.thevirustracker.com/free-api?countryTotals=ALL',
    url: queryURL,
    dataType: 'json',
    method: "GET",
//    }).then(function(data) {
//        console.log(data)
}).then(data => {

    console.log(data)

    dates = Object.keys(data);

    dates.forEach(date => {
        let DATA = data[date];

        app_date.push(DATA);

        cases_list.push(parseInt(DATA.total_cases.replace(/,/g,"")));

        recovered_list.push(parseInt(DATA.total_recovered.replace(/,/g,"")));

        deaths_list.push(parseInt(DATA.total_deaths.replace(/,/g,"")));
    })
//})

   var Confirmed, Recovered, Deaths, Active;
  //var Date =  (moment(data.Date).format('LL'));
   // 4 empty arrays for chart
    var  Date = [];
    var Confirmed = [];
    var Recovered = []
    var Deaths = []
    
     // trying to grab all the items in "title", "total_cases", "total_recovered" and "total_deaths"
     $.each(data, function( obj){
        Date.push(obj.Date)
        Confirmed.push(obj.Confirmed)
        Recovered.push(obj.Recovered)
        Deaths.push(obj.Deaths)

    

     //   console.log(timelineitems)
})

Confirmed = data.Confirmed;
Recovered = data.Recovered;
Deaths = data.Deaths;

    // $("#confirmed").append(Confirmed);
    // $("#recovered").append(TotRecoveredalRecovered);
    // $("#deceased").append(Deaths);


var myCountryChart = document.getElementById('myCountryChart').getContext('2d');

var myCountryChart = new Chart(myCountryChart, {
 type: 'bar',
 fill: false,
 data: {
     labels: dates,
     datasets: [
         {
             label: "Cases",
             data: Confirmed,
             backgroundColor: "#f1c40f",
             minBarLength: 100
         },
         {
             label: "Active",
             data: Active,
             backgroundColor: "white",
             minBarLength: 100
         },
         {
            label: "Recovered",
            data: Recovered,
            backgroundColor: "green",
            minBarLength: 100
        },
         {
            label: "Deceased",
            data: Deaths,
            backgroundColor: "red",
            minBarLength: 200
        }
     ]
 },
 options:{
    title: {
        display: true,
        text: queryParams
    },
    scales: {
        xAxes: [{
            // type: 'time',
            // time: {
            //     displayFormats: {
            //         quarter: 'MMM YYYY'
            //     }
            // },
            stacked: true
        }],
        yAxes: [{
            stacked: true
        }]
    }
 }
})
})


}
// buildCountryQueryURL()
function showCountry(data) {
var countryName = $("#countryInput").val();

var totalConfirmedCountry = data.latest.confirmed; 

var totalDeathsCountry = data.latest.deaths

var countryPopulation = data.locations[0].country_population;

// Convert date
var lastUpaded =  (moment(data.locations[0].last_updated).format('LL'));

    // Message on country population and death percentage
    var deathPercentageByCountryPopulation = ((parseInt(data.latest.deaths)) / (parseInt(countryPopulation))
   
    *100).toLocaleString("en", {minimumFractionDigits: 3, maximumFractionDigits: 4});

    //var message = `${deathPercentageByCountryPopulation} percent of ${countryName} population dead from COVID-19`
    var message = `${countryName} experienced a ${deathPercentageByCountryPopulation} % reduction in population due to COVID-19`

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

queryURL = buildCountryQueryURL();
$("#myGlobalChart").empty();
$.ajax({
url: queryURL,
method: "GET",

}).then(showCountry);
})
// AJAX CALL FOR GLOBAL DATA
$.ajax({
url: 'https://api.thevirustracker.com/free-api?global=stats',
dataType: 'json',
success: function(data) {
var total_cases = data.results[0].total_cases;
var GlobalTotal_recovered = data.results[0].total_recovered;
var total_unresolved = data.results[0].total_unresolved;
var GlobalDeaths = data.results[0].total_deaths;
var total_new_cases_today = data.results[0].total_new_cases_today;
var total_new_deaths_today = data.results[0].total_new_deaths_today;
var total_active_cases = data.results[0].total_active_cases;
var total_serious_cases = data.results[0].total_serious_cases;
var total_affected_countries = data.results[0].total_affected_countries;

$('#total_cases').text (total_cases)
$('#GlobalTotal_recovered').text (GlobalTotal_recovered)
$('#total_unresolved').text (total_unresolved)
$('#GlobalDeaths').text (GlobalDeaths)
$('#total_new_cases_today').text (total_new_cases_today)
$('#total_new_deaths_today').text (total_new_deaths_today)
$('#total_active_cases').text (total_active_cases)
$('#total_serious_cases').text (total_serious_cases)
$('#total_affected_countries').text (total_affected_countries)

}
});

// GLOBAL CHART DATA
$.ajax({
url: 'https://api.covid19api.com/summary',
dataType: 'json',
success: function(data) {
var UpDate =  (moment(data.Countries[0].Date).format('LLLL'));

$("#updated").append(UpDate);

}
});

$.ajax({
 url: 'https://api.thevirustracker.com/free-api?countryTotals=ALL',
dataType: 'json',
method: "GET",
}).then(function(data) {
 //  console.log(data)
//    console.log(data.timelineitems)
// console.log(data)
   

var total_cases, total_recovered, total_deaths;
//var Date =  (moment(data.Date).format('LL'));
// 4 empty arrays for chart
var  title = [];
var total_cases = [];
var total_recovered = []
var total_deaths = []

 // trying to grab all the items in "title", "total_cases", "total_recovered" and "total_deaths"
 $.each(data.countryitems[0], function( obj){
    title.push(obj.title)
    total_cases.push(obj.total_cases)
    total_recovered.push(obj.total_recovered)
    total_deaths.push(obj.total_deaths)



   // console.log(title)
})

  //UpDate = data.Countries[0].Date;
//    TotalConfirmed = data.Countries[0].TotalConfirmed;
//    TotalRecovered = data.Countries[0].TotalRecovered;
//    TotalDeaths = data.Countries[0].TotalDeaths;

//     $("#recovered").append(TotalRecovered);
//     $("#deceased").append(TotalDeaths);


var myGlobalChart = document.getElementById('myGlobalChart').getContext('2d');

var myGlobalChart = new Chart(myGlobalChart, {
type: 'bar',
fill: false,
data: {
 labels: title,
 datasets: [
     {
         label: "Cases",
         data: total_cases,
         backgroundColor: "#f1c40f",
         minBarLength: 100
     },
     {
         label: "Recovered",
         data: total_recovered,
         backgroundColor: "green",
         minBarLength: 100
     },
     {
        label: "Deceased",
        data: total_deaths,
        backgroundColor: "red",
        minBarLength: 200
    }
 ]
},
options:{
title: {
    display: true,
    text: "Effected Countries"
},
scales: {
    xAxes: [{
        // type: 'time',
        // time: {
        //     displayFormats: {
        //         quarter: 'MMM YYYY'
        //     }
        // },
        stacked: true
    }],
    yAxes: [{
        stacked: true
    }]
}
}
})
})

var globalURL = "https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&timelines=true"

 $.ajax({
     url: globalURL,
     method: "GET",

 }).then(function(data) {
  //  console.log(data)
        
     var totalConfirmedGlobal = data.latest.confirmed;
     var totalDeathsGlobal = data.latest.deaths;
     
    $('#global-cases').text (totalConfirmedGlobal)
    $('#global-deaths').text (totalDeathsGlobal)
 })

$.ajax({
url: 'https://api.covid19api.com/live/country/Nigeria/status/confirmed',
dataType: 'json',
success: function(data) {
 // console.log(data[0].Country);
  //console.log(data.timelineitems['0']);
}
});
