 var $el = $('#profile');

 var profileModule = (function() {
     // var eventObject = {}; //self contained array, events.set(filtered) passes our filtered array in

     // // cache DOM
     // var $profile = $el.find('#eventInfo'); //the area where the info is gonna be displayed
     // var $insert = $profile.find('#insert-event'); //
     // var template = Handlebars.compile($profile.find('#event-template').html()); //the template the html adheres to

     // // bind events
     // function render() {
     //     $insert.html(template(eventObject)); //inserts into template, in {{#each this}} it is THIS
     // }

     // function setEvent(data) {
     //     eventObject = data; //events array become the filtered array
     //     eventObject.slotsLeft = eventObject.numberofslots - eventObject.bands.length;
     //     render();
     // }
     // return {
     //     set: setEvent //filtered into setEvents^
     // };

 })();


 var eventsModule = (function() {
     var eventsArray = []; //self contained array, events.set(filtered) passes our filtered array in

     // cache DOM
     var $events = $el.find('#output'); //the area where the info is gonna be displayed
     var $insert = $events.find('#insert-events'); //
     var template = Handlebars.compile($events.find('#events-template').html()); //the template the html adheres to

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


 var dispEmail = document.getElementById('userEmail');
 var dispAcc = document.getElementById('accountTypeVariable');
 var dispAnything = document.getElementById('thingToPrint');

 function EUGH() {
     var user = firebase.auth().currentUser;
     console.log(user);
     var refObj = firebase.database().ref("users/" + user.uid);

     refObj.on('value', snap => {
         dispEmail.innerText = JSON.stringify(snap.val().email);
         if (snap.val().accountType == "Musician") {
             dispAcc.innerText = "Account Type: Musician";
         } else if (snap.val().accountType == "Promoter") {
             dispAcc.innerText = "Account Type: Promoter";
         }
     });


     closeNav();

 }

 function offers() {
     var user = firebase.auth().currentUser;
     //dispAnything.innerText = events[0].bands;

     var eventRef = firebase.database().ref("events/");
     eventRef.on("value", function(snapshot) {
         var events = [];

         snapshot.forEach(function(childSnapshot) {
             // var item_id = childSnapshot.name();
             // var qty = childSnapshot.val();
             var { eventCreator } = childSnapshot.val();
             if (eventCreator == user.uid) {
                 console.log(childSnapshot.val().bandsApplied)
                 events.push(childSnapshot.val());
             }
             //eventCreator == user.uid && events.push(childSnapshot.val());
             //^ IS THE SAME THING?! :O

             // refMenu.child("city").once("value", function(snapshot) {
             //     var city = snapshot.val()

             // });
             eventsModule.set(events);
             console.log(events.bandsApplied);

         });
         dispAnything.innerText = events[0].bands[0].id;
     });
     closeNav();
 }

 function openNav() {
     document.getElementById("mySidenav").style.width = "380px";
     document.getElementById("main").style.marginLeft = "380px";
 }

 function closeNav() {
     document.getElementById("mySidenav").style.width = "0";
     document.getElementById("main").style.marginLeft = "0";
 }
