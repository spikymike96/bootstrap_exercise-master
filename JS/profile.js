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
         }

         //console.log(filtered.bands)
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
