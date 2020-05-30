// Smooth scroll with animation
$(document).ready(function () {

    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
});

$(document).ready(function () {
    // function that builds the query url
    function buildQueryURL() {
        // if(queryParams != '') {
        // queryURL is the url we'll use to query the API
        var queryParams = $("#countryInput").val();

        //  var queryURL = "https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&timelines=true&country=";
        var queryURL = "https://covid-19.dataflowkit.com/v1/";



        //  console.log(queryParams)
        return queryURL + queryParams;

        // }else{
        //               $("#error").html('Field cannot be empty');
        //         }
    }

    // This function appends searched country to the countryCard
    function showCountry(data) {

        var activeCases = data["Active Cases_text"].replace(/,/g, "");
        var newCases = data["New Cases_text"].replace(/,/g, "");
        var newDeaths = data["New Deaths_text"].replace(/,/g, "");
        var totalCases = data["Total Cases_text"].replace(/,/g, "");
        var totalDeaths = data["Total Deaths_text"].replace(/,/g, "");
        var totalRecorvered = data["Total Recovered_text"].replace(/,/g, "");
        var countryName = (data["Country_text"]).replace(/,/g, "");
        var newCountryName = countryName.toUpperCase();
        let lastUpaded = (moment(data["Last Update"]).format('LL'));

        var percentageOfCountryDeath = ((parseInt(totalDeaths.replace(/,/g, ""))) / (parseInt(totalCases.replace(/,/g, "")))
            * 100).toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%";

        // appending data to UI

        $('#deaths').text(totalDeaths); //
        $('#active-cases').text(activeCases); //
        $('#new-cases').text(newCases);
        $('#new-deaths').text(newDeaths);
        $('#percent').text(percentageOfCountryDeath);
        $('#total-recovered').text(totalRecorvered);
        $('#total-cases').text(totalCases);
        $('#last-updated').text(lastUpaded);
        $('#country').text(newCountryName);



        // 4 empty arrays for chart
        var totalCases = []
        var totalDeaths = []
        var totalRecorvered = []

        // $.each(data, function(id, obj){
        //     totalCases.push(obj.totalCases);
        //     totalDeaths.push(obj.totalDeaths);
        //     totalRecorvered.push(obj.totalRecorvered);

        //    })
        //     console.log(totalCases)
        var myChart = document.getElementById('my-country-chart').getContext('2d');

        myChart = new Chart(myChart, {
            type: 'bar',
            data: {
                labels: ["Confirmed", "Recovered", "Deaths"],
                datasets: [
                    {
                        label: "Confirmed Cases",
                        backgroundColor: ["#3e95cd"],
                        data: totalCases
                    },
                    {
                        label: "Recovered Cases",
                        backgroundColor: ["#8e5ea2"],
                        data: totalRecorvered
                    },
                    {
                        label: "Deceased",
                        backgroundColor: ["#3cba9f"],
                        data: totalDeaths
                    }
                ]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: countryName
                }
            }
        });

    }
    //===============================================================================

    $('#search').click(function (event) {
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

    }).then(showCountry);


})
//============End Country Stats (United States)===================//

// AJAX CALL FOR GLOBAL DATA
$.ajax({
    url: 'https://api.thevirustracker.com/free-api?global=stats',
    dataType: 'json',
    success: function (data) {
        var total_cases = data.results[0].total_cases;
        var GlobalTotal_recovered = data.results[0].total_recovered;
        var total_unresolved = data.results[0].total_unresolved;
        var GlobalDeaths = data.results[0].total_deaths;
        var total_new_cases_today = data.results[0].total_new_cases_today;
        var total_new_deaths_today = data.results[0].total_new_deaths_today;
        var total_active_cases = data.results[0].total_active_cases;
        var total_serious_cases = data.results[0].total_serious_cases;
        var total_affected_countries = data.results[0].total_affected_countries;

        $('#total_cases').text(total_cases)
        $('#GlobalTotal_recovered').text(GlobalTotal_recovered)
        $('#total_unresolved').text(total_unresolved)
        $('#GlobalDeaths').text(GlobalDeaths)
        $('#total_new_cases_today').text(total_new_cases_today)
        $('#total_new_deaths_today').text(total_new_deaths_today)
        $('#total_active_cases').text(total_active_cases)
        $('#total_serious_cases').text(total_serious_cases)
        $('#total_affected_countries').text(total_affected_countries)

    }
});
