var ctx = document.getElementById('myChart').getContext('2d');
var timeline = ;
var sortedData = [];

    for (let [key, value] of Object.entries(timeline)) {
        console.log(`${key}: ${value}`);
        sortedData.push(value);
      }
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(87, 232, 255)',
            borderColor: 'rgb(30, 80, 90)',
            data: sortedData
        }]
    },

    // Configuration options go here
    options: {}
});