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
        eventObject.slotsLeft = eventObject.numberofslots - eventObject.bands.length;
        console.log(eventObject.slotsLeft);

        console.log(eventObject);

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
            var filteredBands = bandData.find(function(item) { //item is one of the values of 'data' e.g data[0]
                return item.id == filtered.bands[i].id;
            });

            bandArray.push(filteredBands);

            console.log(bandArray);
        }

        console.log(bandArray);
        render();

    }

    return {
        set: setBands //filtered into setEvents^
    };

})();

var eventId = window.location.hash.substr(1); //theIDofthepage after the rest of the URL


var filtered = data.find(function(item) { //item is one of the values of 'data' e.g data[0]
    return item.id == eventId;
});


event.set(filtered);
bands.set(filtered.bands);

logIn();

function logIn() {

}



var firebaseRef = firebase.database().ref();
const auth = firebase.auth();



const applyBtn = document.getElementById('eventApplyBtn');

applyBtn.addEventListener('click', function(e) {

    firebase.auth().onAuthStateChanged(firebaseUser => {



        if (firebaseUser) {
            swal("You're logged in!");

        } else {
            var inputtedEmail;
            var inputtedPassword;
            swal({
                title: 'You must be logged in to access this feature',
                showCancelButton: true,
                confirmButtonText: 'Login',
                cancelButtonText: 'Sign Up',
            }).then(function() {
                swal({
                    title: 'Input email address',
                    input: 'email',
                    showCancelButton: true

                }).then(function(email) {
                    inputtedEmail = email;
                    console.log(inputtedEmail);
                    swal({
                        type: 'success',
                        html: 'Entered email: ' + email
                    })
                    swal({
                        title: 'Enter your password',
                        input: 'password',
                    }).then(function(password) {
                        inputtedPassword = password;
                        console.log(inputtedPassword);
                        if (password) {
                            swal({
                                type: 'success',
                                html: 'Entered password: ' + password
                            })
                        }
                        const promise = auth.signInWithEmailAndPassword(inputtedEmail, inputtedPassword);
                        promise.catch(e => console.log(e.message + "Incorrect Email & Password Combo"));
                    })

                })

            }, function(dismiss) {
                if (dismiss === 'cancel') {
                    swal({
                            title: 'Input email address',
                            input: 'email',
                            showCancelButton: true

                        }).then(function(email) {
                            inputtedEmail = email;
                            console.log(inputtedEmail);
                            swal({
                                type: 'success',
                                html: 'Entered email: ' + email
                            })
                            swal({
                                title: 'Enter your password',
                                input: 'password',
                            }).then(function(password) {
                                inputtedPassword = password;
                                console.log(inputtedPassword);
                                if (password) {
                                    swal({
                                        type: 'success',
                                        html: 'Entered password: ' + password
                                    })
                                }
                                const promise = auth.createUserWithEmailAndPassword(inputtedEmail, inputtedPassword);
                                promise.catch(e => console.log(e.message + "nooooo"));
                            })
                        })
                        // const promise = auth.signUpWithEmailAndPassword(inputtedEmail, inputtedPassword);
                        // promise.catch(e => console.log(e.message + "nooooo"));

                }
            })


        }
    })
})

function sweetLogin() {


}






//////////////////////////////////////////////////////
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
