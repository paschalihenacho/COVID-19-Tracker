// Smooth scroll with animation
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

$(document).ready(function() {

    function buildQueryURL() {
       // if(queryParams != '') {
        // queryURL is the url we'll use to query the API
        var  queryParams = $("#countryInput").val();
    
       //  var queryURL = "https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&timelines=true&country=";
       var queryURL = "https://covid-19.dataflowkit.com/v1/";
      
        $('#country').text (queryParams)
    
        console.log(queryParams)
        return queryURL + queryParams;
        
    // }else{
    //               $("#error").html('Field cannot be empty');
    //         }
      }
    
    // This function appends searched country to the countryCard
    function showCountry(data) {
    
        var activeCases = data["Active Cases_text"]; 
        var newCases = data["New Cases_text"];
        var newDeaths = data["New Deaths_text"];
        var totalCases = data["Total Cases_text"];
        var totalDeaths = data["Total Deaths_text"];
        var totalRecorvered = data["Total Recovered_text"];
        var totalRecorvered = data["Total Recovered_text"];
    
        // Convert date
        let lastUpaded = new Date(data["Last Update"]);
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
    
    
            var percentageOfCountryDeath = ((parseInt(data["Total Deaths_text"])) / (parseInt(totalCases))
           
                *100).toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + "%";
    
            // appending data to UI
    
            $('#deaths').text (totalDeaths); //
            $('#active-cases').text (activeCases); //
            $('#new-cases').text (newCases); 
            $('#new-deaths').text (newDeaths)
            $('#percent').text (percentageOfCountryDeath)
            $('#total-recovered').text (totalRecorvered)
            $('#total-cases').text (totalCases)
    
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

    //============End Country Stats (United States)===================//
        })

        $.ajax({
            url: 'https://covid-19.dataflowkit.com/v1/Nigeria',
            method: "GET",
   
        }).then(function(data) {
           console.log(data['Active Cases_text'])
               
            var totalConfirmedGlobal = data.latest.confirmed;
            var totalDeathsGlobal = data.latest.deaths;
          // var totalRecoveredGlobal = data.latest.recovered;
           $('#global-cases').text (totalConfirmedGlobal)
           $('#global-deaths').text (totalDeathsGlobal)
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

    


    // $.ajax({
    //     // url: 'https://api.covid19api.com/summary',
    //     url: 'https://api.thevirustracker.com/free-api?countryTotals=ALL',
    //    dataType: 'json',
    //    method: "GET",
    //    }).then(function(data) {

      //  console.log(data.countryitems[0][1].title)
       // console.log(data.Countries[0])

       //var TotalConfirmed, TotalRecovered, TotalDeaths;
       
       // 4 empty arrays for chart
    //    var  title = [];
    //    var TotalConfirmed = [];
    //    var TotalRecovered = []
    //    var TotalDeaths = []
       
        // trying to grab all the items in "title", "total_cases", "total_recovered" and "total_deaths"
    //     $.each(data.countryitems[0][1], function( obj){
    //         title.push(obj.title)
    //         TotalConfirmed.push(obj.TotalConfirmed)
    //         TotalRecovered.push(obj.TotalRecovered)
    //         TotalDeaths.push(obj.TotalDeaths)
       
    //       // console.log(title)
    //    })

    // title = Object.keys(data);
    //     console.log(title)
    
    //     countryitems.forEach(title => {
    //         let DATA = data[title];
    
           // formatedDates.push(formatedDates(d  ate));
        //    title.push(DATA
        //    TotalConfirmed.push(parseInt(DATA.TotalConfirmed));
        //    TotalRecovered.push(parseInt(DATA.TotalRecovered));
        //    TotalDeaths.push(parseInt(DATA.TotalDeaths));
    
       // })
       // console.log(data.countryitems[0])
      // var UpDate =  (moment(data.Countries[0].Date).format('LLLL'));
     //  $("#updated").append(UpDate);

     // UPDATE Country CHART
// let GlobalChart;
// function AllCountriesChart(){

// 	if(GlobalChart){
// 		GlobalChart.destroy();
//     }
// }

//      GlobalChart = new Chart(ctxGlobal, {
//         type: 'line',
//         data: {
//             labels: dates,
//             datasets: [
//                 {
//                     label: "Cases",
//                     fill: false,
//                     data: Confirmed,
//                     backgroundColor: "#f1c40f",
//                     minBarLength: 100
//                 },
//                 {
//                     label: "Active",
//                     data: Active,
//                     backgroundColor: "white",
//                     minBarLength: 100
//                 },
//                 {
//                    label: "Recovered",
//                    data: Recovered,
//                    backgroundColor: "green",
//                    minBarLength: 100
//                },
//                 {
//                    label: "Deceased",
//                    data: Deaths,
//                    backgroundColor: "red",
//                    minBarLength: 200
//                }
//             ]
//         },
//         options:{
//            title: {
//                display: true,
//                text: queryParams
//            },
//            scales: {
//                xAxes: [{
//                    // type: 'time',
//                    // time: {
//                    //     displayFormats: {
//                    //         quarter: 'MMM YYYY'
//                    //     }
//                    // },
//                    stacked: true
//                }],
//                yAxes: [{
//                    stacked: true
//                }]
//            }
//         }
//        })
//        var settings = {
//         "async": true,
//         "crossDomain": true,
//         "url": "https://coronavirus-monitor-v2.p.rapidapi.com/coronavirus/cases_by_country.php",
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "coronavirus-monitor-v2.p.rapidapi.com",
//             "x-rapidapi-key": "409edfd192msh76f5ae7cd381374p17ad34jsn668e30d41ee5"
//         }
//     }
    
//     $.ajax(settings).done(function (response) {
//        // console.log(response);
//     });
