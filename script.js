 

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

function fetchData(user_country){
	country_name_element.innerHTML = "Loading...";

	cases_list = [], recovered_list =[], deaths_list = [], dates = [], formatedDates = [];
    
    var settings = {
        "async": true,
        "crossDomain": true,
 

        "url": `https://covid19-monitor-pro.p.rapidapi.com/coronavirus/cases_by_days_by_country.php?country=${user_country}`,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "covid19-monitor-pro.p.rapidapi.com",
			"x-rapidapi-key": "409edfd192msh76f5ae7cd381374p17ad34jsn668e30d41ee5"
		}
    
    }.then( response => {
		return response.json();
	})
	.then( data => {
		dates = Object.keys(data);
		
		dates.forEach( date => {
			let DATA = data[date];

			formatedDates.push(formatDate(date));
			app_data.push(DATA);
			cases_list.push(parseInt(DATA.total_cases.replace(/,/g, "")));
			recovered_list.push(parseInt(DATA.total_recovered.replace(/,/g, "")));
			deaths_list.push(parseInt(DATA.total_deaths.replace(/,/g, "")));
		})
	})
	.then( () => {
		updateUI();
	})
	.catch( error => {
		//alert(error);
	})
}

fetchData(user_country);

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
	new_recovered_element.innerHTML = `+${parseInt(last_entry.total_recovered.replace(/,/g, "")) - parseInt(before_last_entry.total_recovered.replace(/,/g, ""))}`;
	
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
// SELECT SEARCH COUNTRY ELEMENTS
const search_country_element = document.querySelector(".search-country");
const country_list_element = document.querySelector(".country-list");
const chang_country_btn = document.querySelector(".change-country");
const close_list_btn = document.querySelector(".close");
const input = document.getElementById('search-input')

// CREATE TE COUNTRY LIST
function createCountryList(){
    const num_countries = country_list.length;

    let i = 0, ul_list_id;

    country_list.forEach( (country, index) => {
        if( index % Math.ceil(num_countries/num_of_ul_lists) == 0){
            ul_list_id = `list-${i}`;
            country_list_element.innerHTML += `<ul id='${ul_list_id}'></ul>`;
            i++;
        }

        document.getElementById(`${ul_list_id}`).innerHTML += `
            <li onclick="fetchData('${country.name}')" id="${country.name}">
            ${country.name}
            </li>
        `;
    })
}

let num_of_ul_lists = 3;
createCountryList();

// SHOW/HIDE THE COUTRY LIST ON CLICK EVENT
chang_country_btn.addEventListener("click", function(){
    input.value = "";
    resetCountryList();
    search_country_element.classList.toggle("hide");
    search_country_element.classList.add("fadeIn");
});

close_list_btn.addEventListener("click", function(){
    search_country_element.classList.toggle("hide");
});

country_list_element.addEventListener("click", function(){
    search_country_element.classList.toggle("hide");
});

// COUNTRY FILTER
/* input event fires up whenever the value of the input changes */
input.addEventListener("input", function(){
    let value = input.value.toUpperCase();

    country_list.forEach( country => {
        if( country.name.toUpperCase().startsWith(value)){
            document.getElementById(country.name).classList.remove("hide");
        }else{
            document.getElementById(country.name).classList.add("hide");
        }
    })
})

// RESET COUNTRY LIST (SHOW ALL THE COUNTRIES )
function resetCountryList(){
    country_list.forEach( country => {
        document.getElementById(country.name).classList.remove("hide");
    })
}