var eventModule = (function() {
    var eventObject = {}; //self contained array, events.set(filtered) passes our filtered array in

    // cache DOM
    var $el = $('#eventInfo'); //the area where the info is gonna be displayed
    var $insert = $el.find('#insert-event'); //
    var template = Handlebars.compile($el.find('#event-template').html()); //the template the html adheres to

    // bind events
    function render() {
        $insert.html(template(eventObject)); //inserts into template, in {{#each this}} it is THIS
    }

    function setEvent(data) {
        eventObject = data; //events array become the filtered array
        eventObject.slotsLeft = eventObject.numberofslots - eventObject.bands.length;
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
        bandArray = bands; //events array become the filtered array
        render();
    }


    return {
        set: setBands //filtered into setEvents^
    };
})();

var eventId = window.location.hash.substr(1); //theIDofthepage after the rest of the URL

var firebaseRef = firebase.database().ref();
//create references
var dbRefObject = firebase.database().ref().child('events').child(eventId);
// //sync object changes
dbRefObject.on('value', snap => {
    eventModule.set(snap.val());
    bands.set(snap.val().bands);
    console.log(snap.val().bands);

    applyBtn.addEventListener('click', function(e) {

        loginCheck("apply.html#" + eventId);
    })

    //console.log(filtered.bands)
});




//eventModule.set(filtered);
//bands.set(filtered.bands);

// function loginCheck() {
//     const auth = firebase.auth();
//     const applyBtn = document.getElementById('eventApplyBtn');
//     applyBtn.addEventListener('click', function(e) {
//         firebase.auth().onAuthStateChanged(firebaseUser => {

//             if (firebaseUser) {
//                 swal("You're logged in!");
//                 window.open('apply.html#' + eventId, '_self', false)

//             } else {
//                 var inputtedEmail;
//                 var inputtedPassword;
//                 swal({
//                     title: 'You must be logged in to access this feature',
//                     showCancelButton: true,
//                     confirmButtonText: 'Login',
//                     cancelButtonText: 'Sign Up',
//                 }).then(function() {
//                     swal({
//                         title: 'Input email address',
//                         input: 'email',
//                         showCancelButton: true

//                     }).then(function(email) {

//                         inputtedEmail = email;
//                         console.log(inputtedEmail);

//                         swal({
//                             title: 'Enter your password',
//                             input: 'password',
//                         }).then(function(password) {
//                             inputtedPassword = password;
//                             console.log(inputtedPassword);
//                             if (password) {
//                                 swal({
//                                     type: 'success',
//                                     html: 'Password Entered Successfully'
//                                 })
//                             }

//                             const promise = auth.signInWithEmailAndPassword(inputtedEmail, inputtedPassword);
//                             promise.catch(e => console.log(e.message + "Incorrect Email & Password Combo"));


//                         })

//                     })

//                 }, function(dismiss) {
//                     if (dismiss === 'cancel') {
//                         swal({
//                             title: 'Input email address',
//                             input: 'email',
//                             showCancelButton: true

//                         }).then(function(email) {
//                             inputtedEmail = email;
//                             console.log(inputtedEmail);

//                             swal({
//                                 title: 'Enter your password',
//                                 input: 'password',
//                             }).then(function(password) {
//                                 inputtedPassword = password;
//                                 console.log(inputtedPassword);
//                                 if (password) {
//                                     swal({
//                                         type: 'success',
//                                         html: 'Password Successfully Entered'
//                                     })
//                                 }
//                                 const promise = auth.createUserWithEmailAndPassword(inputtedEmail, inputtedPassword);
//                                 promise.catch(e => console.log(e.message + "nooooo"));
//                             })
//                         })

//                     }
//                 })

//             }
//         })

//     })





// }













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
