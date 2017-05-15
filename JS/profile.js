 function EUGH() {

     var dispEmail = document.getElementById('userEmail');
     var dispAcc = document.getElementById('accountTypeVariable');

     var user = firebase.auth().currentUser;


     var refObj = firebase.database().ref("users/" + user.uid);

     var accountType;

     refObj.on('value', snap => {
         //console.log(user.uid);
         //console.log(snap.val().email);
         dispEmail.innerText = JSON.stringify(snap.val().email);
         if (snap.val().accountType == "Musician") {
             dispAcc.innerText = "Account Type: Musician";
         } else if (snap.val().accountType == "Promoter") {
             dispAcc.innerText = "Account Type: Promoter";
         }

         //console.log(filtered.bands)
     });

     var refCart = firebase.database().ref("events/");
     refCart.on("value", function(snapshot) {

         console.log(snapshot.val());

         snapshot.forEach(function(childSnapshot) {
             // var item_id = childSnapshot.name();
             // var qty = childSnapshot.val();
             var { eventCreator } = childSnapshot.val();
             if (eventCreator == user.uid) {
                 console.log(childSnapshot.val());
             }


             // refMenu.child("city").once("value", function(snapshot) {
             //     var city = snapshot.val()

             // });

         });

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
