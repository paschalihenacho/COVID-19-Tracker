var myChart = document.getElementById('#myChart').getContext('2d');

var chart = new Chart(myChart, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: locations,
        datasets: [
        {
            label: 'Confirmed',
            data: data.latest.confirmed,
            backgroundColor: '#cccccc'
        },

        {
            label: 'Recovered',
            data: data.latest.recovered,
            backgroundColor: '#dddddd'

        },

        {
            label: 'Deaths',
            data: data.latest.deaths,
            backgroundColor: '#eeeeee'

        },

        ],
    },

    // Configuration options go here
    options: {}
});