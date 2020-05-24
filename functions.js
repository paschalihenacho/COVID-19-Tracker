// //============Begin Country Stats (United States)===================//
// $.ajax({
//     url: countryURL,
//     method: "GET",
   
//    }).then(function(countryURL) {
       
//    var total_TestedResults, total_hospitalized, total_confirmed, onVentilator, total_recovered, total_deaths, last_updated;
 
//    total_TestedResults = countryURL[0].totalTestResults;
//    total_hospitalized = countryURL[0].hospitalized;
//    total_confirmed = countryURL[0].positive;
//    onVentilator = countryURL[0].onVentilatorCurrently;
//    total_recovered = countryURL[0].recovered;
//    total_deaths = countryURL[0].death;
//    last_updated =  (moment(countryURL[0].lastModified).format('LLLL'));
// //    var dateFormat = require('dateformat');
// //     last_updated = new Date(countryURL[0].lastModified);
// //    dateFormat(last_updated, "dddd, mmmm dS, yyyy, h:MM:ss TT");

  
 
//     $("#total_TestedResults").append(total_TestedResults);
//     $("#total_hospitalized").append(total_hospitalized);
//     $("#total_confirmed").append(total_confirmed);
//     $("#onVentilator").append(onVentilator);
//     $("#total_recovered").append(total_recovered);
//     $("#total_deaths").append(total_deaths);
//     $("#last_updated").append(last_updated);
// })
// //============End Country Stats (United States)===================//


// $.ajax({
//     url: stateURL,
//     method: "GET",
   
//    }).then(function(stateData) {
//   // console.log(stateData)
//    var recovered, death, positive;

//    // 4 empty arrays for chart
//     var state = []
//     var positive = []
//     var recovered = []
//     var death = []
 
//      $.each(stateData, function(id, obj){
//          state.push(obj.state)
//          positive.push(obj.positive)
//          recovered.push(obj.recovered)
//          death.push(obj.death)
         
//    })
      
//     // total_confirmed = stateData[0].positive;
//     // total_recovered = stateData[0].recovered;
//     // total_deaths = stateData[0].death;
 
//     // $("#confirmed").append(total_confirmed);
//     // $("#recovered").append(total_recovered);
//     // $("#deceased").append(total_deaths);
    
    
//  var myChart = document.getElementById('myChart').getContext('2d');
 
//  var chart = new Chart(myChart, {
//      type: 'bar',
//      fill: false,
//      data: {
//          labels: state,
//          datasets: [
//              {
//                  label: "Confirmed Cases",
//                  data: positive,
//                  backgroundColor: "#f1c40f",
//                  minBarLength: 100
//              },
//              {
//                  label: "Recovered Cases",
//                  data: recovered,
//                  backgroundColor: "green",
//                  minBarLength: 100
//              },
//              {
//                 label: "Deceased",
//                 data: death,
//                 backgroundColor: "red",
//                 minBarLength: 200
//             }
//          ]
//      },
//      options:{
//         title: {
//             display: true,
//             text: 'US STATES'
//         },
//         scales: {
//             xAxes: [{
//                 stacked: true
//             }],
//             yAxes: [{
//                 stacked: true
//             }]
//         }
//      }
//  })
// })