
//============Begin Country Stats (United States)===================//
var countryURL = "https://covid-19.dataflowkit.com/v1/usa";
$.ajax({
    url: countryURL,
    method: "GET",
   
   }).then(function(data) {
       
       var activeCasesUSA = data["Active Cases_text"].replace(/,/g, ""); 
       var newCasesUSA = data["New Cases_text"].replace(/,/g, "");
       var newDeathsUSA = data["New Deaths_text"].replace(/,/g, "");
       var totalCasesUSA = data["Total Cases_text"].replace(/,/g, "");
       var totalDeathsUSA = data["Total Deaths_text"].replace(/,/g, "");
       var totalRecorveredUSA = data["Total Recovered_text"].replace(/,/g, "");
       var lastUpadedUSA = (moment(data["Last Update"]).format('LL'));
       var percentageOfCountryDeathUSA = ((parseInt(totalDeathsUSA.replace(/,/g, ""))) / (parseInt(totalCasesUSA.replace(/,/g, "")))
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
   console.log(stateData)
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
    
 var myChart = document.getElementById('usaChart').getContext('2d');
 
    myChart = new Chart(myChart, {
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

//============End Country Stats (United States)===================//


$.ajax({
    url: "https://covidtracking.com/api/v1/us/daily.json",
    method: "GET",
   
   }).then(function(data) {
   console.log(data)
   var recovered, death, total;

   // 4 empty arrays for chart
    var dateChecked = []
    var total = []
    var recovered = []
    var death = []
 
     $.each(data, function(id, obj){
        dateChecked.push(obj.dateChecked)//(moment(dateChecked.format('LL')))
        total.push(obj.total)
         recovered.push(obj.recovered)
         death.push(obj.death)
         
        // console.log(dateChecked)
         
   })
    
 var uschart = document.getElementById('usChart').getContext('2d');
 
 uschart = new Chart(uschart, {
     type: 'bar',
     data: {
         labels: dateChecked,
         datasets: [
             {
                 label: "Confirmed Cases",
                 data: total,
                 fill: false,
                 backgroundColor: "#f1c40f",
                 minBarLength: 100
             },
             {
                 label: "Recovered Cases",
                 data: recovered,
                 fill: true,
                 backgroundColor: "green",
                 minBarLength: 100
             },
             {
                label: "Deceased",
                data: death,
                fill: true,
                backgroundColor: "red",
                minBarLength: 200
            }
         ]
     },
     options:{
        title: {
            display: true,
            text: 'United States Timeline'
        },

        scales: {
            xAxes: [{
                stacked: true,  
            }],
            yAxes: [{
                stacked: true
            }]
        }
      }
 })
})
// // FORMAT DATES
// const monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// function formatDate(dateChecked){
// 	let date = new Date(dateChecked);

// 	return `${date.getDate()} ${monthsNames[date.getMonth()]}`;
// }