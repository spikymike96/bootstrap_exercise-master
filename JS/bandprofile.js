var band = (function() {

    var bandObject = {};

    //cache DOM
    var $el = $('#bandProfile'); //area for where shit is gonna go
    var $insert = $el.find('#insert-bandInfo');
    var template = Handlebars.compile($el.find('#bandInfo-template').html());

    //bind events
    // bind events
    function render() {
        $insert.html(template(bandObject)); //inserts into template, in {{#each this}} it is THIS
    }

    function setBandInfo(data) {
        bandObject = data; //events array become the filtered array

        render();
    }

    return {
        set: setBandInfo //filtered into setEvents^
    };

})();

var bandID = window.location.hash.substr(1);

var filtered = bandData.find(function(item) { //item is one of the values of 'data' e.g data[0]
    return item.id == bandID;
});

band.set(filtered);
