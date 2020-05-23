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

function buildQueryURL() {
   // if(queryParams != '') {
    // queryURL is the url we'll use to query the API
    var  queryParams = $("#countryInput").val();

    var queryURL = "https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&timelines=true&country=";
  
    $('#country').text (queryParams)

  //  console.log(queryParams)
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

    queryURL = buildQueryURL();

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

    var globalURL = "https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&timelines=true"

     $.ajax({
         url: globalURL,
         method: "GET",

     }).then(function(data) {
       // console.log(data)
            
         var totalConfirmedGlobal = data.latest.confirmed;
         var totalDeathsGlobal = data.latest.deaths;
         
        $('#global-cases').text (totalConfirmedGlobal)
        $('#global-deaths').text (totalDeathsGlobal)
     })
    $.ajax({
        url: 'https://api.thevirustracker.com/free-api?countryTotals=ALL',
        dataType: 'json',
        method: "GET",
       }).then(function(data) 
       {console.log(data)
        console.log(data.countryitems[0][1].title)
           

       var total_cases, total_recovered, total_deaths;
    
       // 4 empty arrays for chart
        var title = []
        var total_cases = []
        var total_recovered = []
        var total_deaths = []
     
         // trying to grab all the items in "title", "total_cases", "total_recovered" and "total_deaths"
         $.each(data, function(id, obj){
            title.push(obj.title)
            total_cases.push(obj.total_cases)
            total_recovered.push(obj.total_recovered)
            total_deaths.push(obj.total_deaths)

           

         //   console.log(title)
       })

       total_cases = data.countryitems[0][1].total_cases;
       total_recovered = data.countryitems[0][1].total_recovered;
       total_deaths = data.countryitems[0][1].total_deaths;
 
        $("#confirmed").append(total_cases);
        $("#recovered").append(total_recovered);
        $("#deceased").append(total_deaths);
    
    
 var myGlobalChart = document.getElementById('myGlobalChart').getContext('2d');
 
 var chart = new Chart(myGlobalChart, {
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
            text: 'Countries'
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

$.ajax({
    url: 'https://api.thevirustracker.com/free-api?countryTimeline=US',
    dataType: 'json',
    success: function(data) {
      //console.log(data);
      //console.log(data.timelineitems['0']);
    }
  });

    //var infoURL = "https://covidtracking.com/api/states/info";
    var countryURL = "http://covidtracking.com/api/us";
    var stateURL = "https://covidtracking.com/api/states";


$.ajax({
    url: 'https://api.thevirustracker.com/free-api?countryTotals=ALL',
    dataType: 'json',
    success: function(data) {
      //console.log(data);
    // console.log(data.countryitems[0][1].title)
    }
  });
//   $(document).ready(function() {
//     $("#countries").msDropdown();
//     })
// $.ajax({
//     url: 'https://api.thevirustracker.com/free-api?countryTotals=ALL',
//     dataType: 'json',
//     success: function(data) {
//       console.log(data);
//     }
//   });



