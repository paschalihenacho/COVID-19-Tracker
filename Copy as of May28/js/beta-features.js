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
country_list.forEach((country) => {
    if (country.code == country_code) {
        user_country = country.name;
    }
});

/* ---------------------------------------------- */
/*                API URL AND KEY                 */
/* ---------------------------------------------- */

function getData(user_country) {
    //	country_name_element.innerHTML = "Loading...";

    (cases_list = []), (recovered_list = []), (deaths_list = []), (dates = []), (formatedDates = []);

    var settings = {
        url: "https://coronavirus-monitor-v2.p.rapidapi.com/coronavirus/cases_by_days_by_country.php?country=%3Crequired%3E",
        method: "GET",
        headers: {
            "x-rapidapi-host": "coronavirus-monitor-v2.p.rapidapi.com",
            "x-rapidapi-key": "409edfd192msh76f5ae7cd381374p17ad34jsn668e30d41ee5",
        },
    };

    $.ajax(settings)
        .done(function (response) {
            console.log(response);
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            dates = Object.keys(data);
            console.log(data);
            dates.forEach((date) => {
                let DATA = data[date];

                formatedDates.push(formatDate(date));
                app_data.push(DATA);
                cases_list.push(parseInt(DATA.total_cases)); //.replace(/,/g, "")
                recovered_list.push(parseInt(DATA.total_recovered)); //.replace(/,/g, "")
                deaths_list.push(parseInt(DATA.total_deaths)); //.replace(/,/g, "")
            });
        })
        .then(() => {
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
function updateUI() {
    updateStats();
    axesLinearChart();
}

function updateStats() {
    let last_entry = app_data[app_data.length - 1];
    let before_last_entry = app_data[app_data.length - 2];

    country_name_element.innerHTML = last_entry.country_name;

    total_cases_element.innerHTML = last_entry.total_cases || 0;
    new_cases_element.innerHTML = `+${last_entry.new_cases || 0}`;

    recovered_element.innerHTML = last_entry.total_recovered || 0;
    new_recovered_element.innerHTML = `+${parseInt(last_entry.total_recovered) - parseInt(before_last_entry.total_recovered)}`; //.replace(/,/g, "")

    deaths_element.innerHTML = last_entry.total_deaths;
    new_deaths_element.innerHTML = `+${last_entry.new_deaths || 0}`;
}

// UPDATE CHART
let my_chart;
function axesLinearChart() {
    if (my_chart) {
        my_chart.destroy();
    }

    my_chart = new Chart(ctx, {
        type: "line",
        data: {
            datasets: [
                {
                    label: "Cases",
                    data: cases_list,
                    fill: false,
                    borderColor: "#FFF",
                    backgroundColor: "#FFF",
                    borderWidth: 1,
                },
                {
                    label: "Recovered",
                    data: recovered_list,
                    fill: false,
                    borderColor: "#009688",
                    backgroundColor: "#009688",
                    borderWidth: 1,
                },
                {
                    label: "Deaths",
                    data: deaths_list,
                    fill: false,
                    borderColor: "#f44336",
                    backgroundColor: "#f44336",
                    borderWidth: 1,
                },
            ],
            labels: formatedDates,
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });
}

// FORMAT DATES
const monthsNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(dateString) {
    let date = new Date(dateString);

    return `${date.getDate()} ${monthsNames[date.getMonth()]}`;
}

