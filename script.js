$(document).ready(function() {

// "https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&country_code=AU&province=South%20Australia&county=Australia&timelines=true"
//  = ((Number(deaths)/Number(confirmedCases))*100).toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + "%";
//      if(countryName != '' || countryCode != '' || countryProvince != '') {
// *******     Code goes here
//    }else{
//            $("#error").html('Field cannot be empty');
//     }

function loadData(baseURL) {

    
    var countryCode = '';
    var countryProvince = '';
    
    $.ajax({
        url: baseURL,
        method: "GET",

    }).then(function(data) {
            
        console.log(data);
        console.log(data.locations[0].country_population)
        console.log(baseURL);
    })
<<<<<<< HEAD

    function myLineChart() { new Chart(ctx, {
        type: 'line',
        data: [20, 10],
        options: showLines,
        backgroundColor: 'rgba(102, 254, , 0.1)',
        label: 
    });
=======
         
}
$('#search').click(function(event) {
    event.preventDefault();
    var baseURL = "https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&timelines=true";
    
var countryName  = $("#input").val();
newURL = baseURL + "&country=" + countryName;
loadData(newURL);
$('#country').text (countryName)
    console.log(newURL);

  // loadData(newURL);
})

>>>>>>> 2c8cb0e2b7461e966424199c3c75cc3cb82e9751
})