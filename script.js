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


       // var lastUpaded = new Date.parse(data.locations[0].last_updated);
       // var lastUpaded = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(data.locations[0].last_updated)
        var percentageOfCountryDeath = ((parseInt(data.latest.deaths)) / (parseInt(totalConfirmedCountry))
       
            *100).toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + "%";

        // appending data to UI

        $('#deaths').text (totalDeathsCountry);
        $('#country-cases').text (totalConfirmedCountry);
        $('#country-population').text (countryPopulation); 
        $('#update').text (lastUpaded)
        $('#percent').text (percentageOfCountryDeath)

        console.log(data);

      //  setTimeout(showCountry, 2000) // update every 2 secs
       
    }



// , "August", "September", "October", "November", "December"
 // ["January", "February", "March", "April", "May", "June", "July"],
 const ctx = document.getElementById('Chart').getContext('2d');
 const xlabels = [];
 const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: xlabels,
        //["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: 'Confirmed Cases',
            fill: false,
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});





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