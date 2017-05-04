var cities = []; //an array for the selected cities to be stored in

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
    var firebaseRef = firebase.database().ref();
    //firebaseRef.child("mate").set("lit");
    firebaseRef.push("mate").set("lit");

}

function submit() {
    var startDate = moment(from.value, "YYYY-MM-DD");
    var endDate = moment(until.value, "YYYY-MM-DD");

    var filtered = data.filter(function(item) { //item is one of the values of 'data' e.g data[0]
        var date = moment(item.date, "DD/MM/YYYY"); //save the date of a gig
        return (
            isInArray(item.city, cities) && //is the city in the city array?
            (date.isBetween(startDate, endDate)) //is the date of gig inbetween the start and end date?
        );
    });
    console.log(filtered); //new filtered array
    var eventNo = filtered.length;
    swal("Nice, there are " + filtered.length + " available events!");

    events.set(filtered);
}

var search = (function() {

})();

function eventPage() {

}

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
