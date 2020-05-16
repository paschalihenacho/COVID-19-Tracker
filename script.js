$(document).ready(function() {

     // "https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&country_code=AU&province=South%20Australia&county=Australia&timelines=true"

    function loadData(baseURL) {
        var countryName = $("#input").val();
        var baseURL = "https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&timelines=true";
        var countryCode = '';
        var countryProvince = '';
    
            if(countryName != '' || countryCode != '' || countryProvince != '') {
                
                $.ajax({
                    url: baseURL,
                    method: "GET",
                    success: function(data){
                        console.log(data);
                        console.log(baseURL);
                    }
                });
            }else{
                $("#error").html('Field cannot be empty');
            }
    }

    $('#search').click(function() {
        
        loadData();
    })

    function myLineChart() { new Chart(ctx, {
        type: 'line',
        data: [20, 10],
        options: showLines,
        backgroundColor: 'rgba(102, 254, , 0.1)',
        label: 
    });
})