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


 var eventModule = (function() {
     // var eventObject = {}; //self contained array, events.set(filtered) passes our filtered array in

     // // cache DOM
     // var $el = $('#eventInfo'); //the area where the info is gonna be displayed
     // var $insert = $el.find('#insert-event'); //
     // var template = Handlebars.compile($el.find('#event-template').html()); //the template the html adheres to

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


 var dispEmail = document.getElementById('userEmail');
 var dispAcc = document.getElementById('accountTypeVariable');
 var dispAnything = document.getElementById('thingToPrint');

 function EUGH() {
     var user = firebase.auth().currentUser;
     var refObj = firebase.database().ref("users/" + user.uid);

     refObj.on('value', snap => {
         dispEmail.innerText = JSON.stringify(snap.val().email);
         if (snap.val().accountType == "Musician") {
             dispAcc.innerText = "Account Type: Musician";
         } else if (snap.val().accountType == "Promoter") {
             dispAcc.innerText = "Account Type: Promoter";
         }
     });

     var eventRef = firebase.database().ref("events/");
     eventRef.on("value", function(snapshot) {
         var events = [];

         snapshot.forEach(function(childSnapshot) {
             // var item_id = childSnapshot.name();
             // var qty = childSnapshot.val();
             var { eventCreator } = childSnapshot.val();
             if (eventCreator == user.uid) {
                 console.log(childSnapshot.val())
                 events.push(childSnapshot.val());
             }
             //eventCreator == user.uid && events.push(childSnapshot.val());
             //^ IS THE SAME THING?! :O

             // refMenu.child("city").once("value", function(snapshot) {
             //     var city = snapshot.val()

             // });

         });
         dispAnything.innerText = events[0].bands[0].id;
     });
     closeNav();

 }

 function offers() {
     //dispAnything.innerText = events[0].bands;
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
