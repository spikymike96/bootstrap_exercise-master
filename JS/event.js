var event = (function() {
    var eventObject = {}; //self contained array, events.set(filtered) passes our filtered array in

    // cache DOM
    var $el = $('#eventInfo'); //the area where the info is gonna be displayed
    var $insert = $el.find('#insert-event'); //
    var template = Handlebars.compile($el.find('#event-template').html()); //the template the html adheres to

    // bind events
    function render() {
        $insert.html(template(eventObject)); //inserts into template, in {{#each this}} it is THIS
    }

    var testArray = [];

    function setEvent(data) {
        eventObject = data; //events array become the filtered array

        console.log(testArray);

        render();
    }

    return {
        set: setEvent //filtered into setEvents^
    };
})();


var bands = (function() {


    var bandArray = [];

    var $el = $('#bandsPlaying'); //the area where the info is gonna be displayed
    var $insert = $el.find('#insert-bands'); //
    var template = Handlebars.compile($el.find('#band-template').html()); //the template the html adheres to


    function render() {
        $insert.html(template(bandArray)); //inserts into template, in {{#each this}} it is THIS
    }

    function setBands(bands) {
        //bandArray = bands; //events array become the filtered array

        for (var i = 0; i < bands.length; i++) {
            var filteredBands = bandData.filter(function(item) { //item is one of the values of 'data' e.g data[0]
                return item.id == filtered.bands[i].id;
            })[0];

            bandArray.push(filteredBands);

            console.log(filteredBands);
        }

        console.log(bandArray);

        render();

    }

    return {
        set: setBands //filtered into setEvents^
    };

})();

var eventId = window.location.hash.substr(1); //theIDofthepage after the rest of the URL


var filtered = data.filter(function(item) { //item is one of the values of 'data' e.g data[0]
    return item.id == eventId;
})[0];


event.set(filtered);
bands.set(filtered.bands);

// for loop over filtered.bands
// then a filter on bandData




// get the id from the url
// filter by id
// event.set(filtered);


// ajax function here
// in this case you'd pass the eventId to the ajax
// the ajax will give you the correct event

// but, because you don't have a server
// you need to create a local database, and filter it
