var cities = []; //an array for the selected cities to be stored in
var eventsLol = [];
//document.getElementById("imageId").src = "images/crowd3.jpg";


function isInArray(value, array) { //checks if element is in array
    return array.indexOf(value) > -1;
}

function doalert(city) { //when checkbox is checked
    if (!isInArray(city, cities)) { //if city not in array, add it to the cities array
        cities.push(city);
    } else { //if it is, check where in the array it is and get rid of it
        var index = cities.indexOf(city);
        cities.splice(index, 1);
    }
    console.log(cities);


}

function submit() {
    var startDate = moment(from.value, "YYYY-MM-DD");
    var endDate = moment(until.value, "YYYY-MM-DD");

    //var firebaseRef = firebase.database().ref();
    var dbRefObject = firebase.database().ref("events/");

    dbRefObject.on('value', snap => {
        //console.log(snap.val().length);
        eventsLol.push(snap.val());
        //console.log(eventsLol).length;
        //console.log(snap.val());

        var arr = [];
        var obj = snap.val();
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                arr.push(Object.assign({}, obj[key], { id: key }));
            }
        };
        // var result = arr.join(',');
        console.log(arr);
        console.log("hmm");

        // var array = $.map(snap.val(), function(value, index) {
        //     //console.log(Object.keys(value));
        //     console.log(value.key);
        //     return [value];

        // });
        // console.log(array);

        var filtered = arr.filter(function(item) { //item is one of the values of 'data' e.g data[0]
            var date = moment(item.date, "DD/MM/YYYY"); //save the date of a gig
            return (
                isInArray(item.city, cities) && //is the city in the city array?
                (date.isBetween(startDate, endDate)) //is the date of gig inbetween the start and end date?
            );
        });

        console.log(filtered.length); //new filtered array
        //var eventNo = filtered.length;
        if (filtered.length > 1) {
            //swal("Nice, there are " + filtered.length + " available events!");
            swal({
                title: 'Nice!',
                text: "There are " + filtered.length + " available events fitting your criteria!",
            })

        } else if (filtered.length == 1) {
            //swal("Nice, there is " + filtered.length + " available event!");
            swal({
                title: 'Nice!',
                text: "There is " + filtered.length + " available event fitting your criteria!"
            })
        } else {
            swal("Unfortunatly there are currently no available events that fit your criteria... Please try again!");
            swal({
                title: 'Uh oh..',
                text: "Unfortunatly there are currently no available events that fit your criteria... Please try again!",
                type: 'warning'
            })
        }

        //events.set(snap.val());

        events.set(filtered);
        //$("#imageId").attr('src', 'images/crowd3.jpg');

    });

    // events.set(filtered);
}

var search = (function() {

})();


var events = (function() {
    var eventsArray = []; //self contained array, events.set(filtered) passes our filtered array in

    // cache DOM
    var $el = $('#output'); //the area where the info is gonna be displayed
    var $insert = $el.find('#insert-events'); //
    var template = Handlebars.compile($el.find('#events-template').html()); //the template the html adheres to

    // bind events
    function render() {
        $insert.html(template(eventsArray)); //inserts into template, in {{#each this}} it is THIS
    }

    function setEvents(data) {
        eventsArray = data; //events array become the filtered array
        render();
    }

    return {
        set: setEvents //filtered into setEvents^
    };
})();

$('#profileBtn').on('click', function() {
    loginCheck("profile.html")
});



// $.getJSON("./gigs.json", function(data) {});

// $.ajax({
//     type: 'GET',
//     dataType: "jsonp",
//     url: "gigs.json",
//     success: function(response) {

//         console.log(response);
//     }
// });

// var arr = [{
//     city: 'York'
// }, {
//     city: 'Manchester'
// }];


// console.log(filtered);
