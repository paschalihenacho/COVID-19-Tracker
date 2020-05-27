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
   