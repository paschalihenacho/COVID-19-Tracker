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
// SELECT ALL ELEMENTS
const country_name_element = document.querySelector(".country .name");
const total_cases_element = document.querySelector(".total-cases .value");
const new_cases_element = document.querySelector(".total-cases .new-value");
const recovered_element = document.querySelector(".recovered .value");
const new_recovered_element = document.querySelector(".recovered .new-value");
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector(".deaths .new-value");

const ctx = document.getElementById("axes_line_chart").getContext("2d");

// APP VARIABLES
let app_data = [],
	cases_list = [],
	recovered_list = [],
	deaths_list = [],
	deaths = [],
	formatedDates = [];

// GET USERS COUNTRY CODE
let country_code = geoplugin_countryCode();
let user_country;
country_list.forEach( country => {
	if( country.code == country_code ){
		user_country = country.name;
	}
});

/* ---------------------------------------------- */
/*                API URL AND KEY                 */
/* ---------------------------------------------- */

function getData(user_country){
//	country_name_element.innerHTML = "Loading...";

	cases_list = [], recovered_list =[], deaths_list = [], dates = [], formatedDates = [];
    
    var settings = {
        "url": "https://coronavirus-monitor-v2.p.rapidapi.com/coronavirus/cases_by_days_by_country.php?country=%3Crequired%3E",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor-v2.p.rapidapi.com",
            "x-rapidapi-key": "409edfd192msh76f5ae7cd381374p17ad34jsn668e30d41ee5"
        }
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);
    })
	.then( response => {
		return response.json();
	})
	.then( data => {
		dates = Object.keys(data);
		console.log(data)
		dates.forEach( date => {
			let DATA = data[date];

			formatedDates.push(formatDate(date));
			app_data.push(DATA);
			cases_list.push(parseInt(DATA.total_cases));//.replace(/,/g, "")
			recovered_list.push(parseInt(DATA.total_recovered));//.replace(/,/g, "")
			deaths_list.push(parseInt(DATA.total_deaths));//.replace(/,/g, "")
		})
	})
	.then( () => {
		updateUI();
    });

    // fetch("https://coronavirus-monitor-v2.p.rapidapi.com/coronavirus/cases_by_days_by_country.php?country=%3Crequired%3E", {
    //     "method": "GET",
    //     "headers": {
    //         "x-rapidapi-host": "coronavirus-monitor-v2.p.rapidapi.com",
    //         "x-rapidapi-key": "409edfd192msh76f5ae7cd381374p17ad34jsn668e30d41ee5"
    //     }
	// })
	// .then( response => {
	// 	return response.json();
	// })
	// .then( data => {
	// 	dates = Object.keys(data);
		
	// 	dates.forEach( date => {
	// 		let DATA = data[date];

	// 		formatedDates.push(formatDate(date));
	// 		app_data.push(DATA);
	// 		cases_list.push(parseInt(DATA.total_cases.replace(/,/g, "")));
	// 		recovered_list.push(parseInt(DATA.total_recovered.replace(/,/g, "")));
	// 		deaths_list.push(parseInt(DATA.total_deaths.replace(/,/g, "")));
	// 	})
	// })
	// .then( () => {
	// 	updateUI();
    // })
 
    getData(user_country); 
}



// UPDATE UI FUNCTION
function updateUI(){
	updateStats();
    axesLinearChart();
       
}



function updateStats(){
	let last_entry = app_data[app_data.length - 1];
	let before_last_entry = app_data[app_data.length - 2];

	country_name_element.innerHTML = last_entry.country_name;

	total_cases_element.innerHTML = last_entry.total_cases || 0;
	new_cases_element.innerHTML = `+${last_entry.new_cases || 0 }`;

	recovered_element.innerHTML = last_entry.total_recovered || 0;
	new_recovered_element.innerHTML = `+${parseInt(last_entry.total_recovered) - parseInt(before_last_entry.total_recovered)}`;//.replace(/,/g, "")
	
	deaths_element.innerHTML = last_entry.total_deaths;
	new_deaths_element.innerHTML = `+${last_entry.new_deaths || 0}`;
}

// UPDATE CHART
let my_chart;
function axesLinearChart(){

	if(my_chart){
		my_chart.destroy();
	}

	my_chart = new Chart(ctx, {
		type: 'line',
		data: {
			datasets: [{
				label: 'Cases',
				data: cases_list,
				fill : false,
				borderColor : '#FFF',
				backgroundColor: '#FFF',
				borderWidth : 1
			},{
				label: 'Recovered',
				data: recovered_list,
				fill : false,
				borderColor : '#009688',
				backgroundColor: '#009688',
				borderWidth : 1
			},{
				label: 'Deaths',
				data: deaths_list,
				fill : false,
				borderColor : '#f44336',
				backgroundColor: '#f44336',
				borderWidth : 1
			}],
			labels: formatedDates
		},
		options: {
			responsive : true,
			maintainAspectRatio : false
		}
	});
}

// FORMAT DATES
const monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(dateString){
	let date = new Date(dateString);

	return `${date.getDate()} ${monthsNames[date.getMonth()]}`;
}

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
