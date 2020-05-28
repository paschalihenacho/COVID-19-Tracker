//============Begin Country Stats (United States)===================//
var countryURL = "https://covid-19.dataflowkit.com/v1/usa";
$.ajax({
    url: countryURL,
    method: "GET",
   
   }).then(function(data) {
       
       var activeCasesUSA = data["Active Cases_text"]; 
       var newCasesUSA = data["New Cases_text"];
       var newDeathsUSA = data["New Deaths_text"];
       var totalCasesUSA = data["Total Cases_text"];
       var totalDeathsUSA = data["Total Deaths_text"];
       var totalRecorveredUSA = data["Total Recovered_text"];
       var lastUpadedUSA = (moment(data["Last Update"]).format('LL'));
       console.log(data["Last Update"])
       var percentageOfCountryDeathUSA = ((parseInt(totalDeathsUSA)) / (parseInt(totalCasesUSA))
       *100).toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + "%";
   
           // appending data to UI
   
        $('#deathsUSA').text (totalDeathsUSA); //
        $('#active-casesUSA').text (activeCasesUSA); //
        $('#new-casesUSA').text (newCasesUSA); 
        $('#new-deathsUSA').text (newDeathsUSA);
        $('#percentUSA').text (percentageOfCountryDeathUSA);
        $('#total-recoveredUSA').text (totalRecorveredUSA);
        $('#total-casesUSA').text (totalCasesUSA);
        $('#last-updatedUSA').text (lastUpadedUSA);
        $('#countryUSA').text (newCountryNameUSA);
})
//============End Country Stats (United States)===================//


$.ajax({
    url: "https://covidtracking.com/api/states",
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
    
    
 var myChart = document.getElementById('usaChart').getContext('2d');
 
   var chart = new Chart(myChart, {
     type: 'bar',
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