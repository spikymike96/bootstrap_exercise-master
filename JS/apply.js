var eventId = window.location.hash.substr(1);

function submit() {


    //var firebaseRef = firebase.database().ref('users/' + 1);
    var user = firebase.auth().currentUser;
    var dbRefObject = firebase.database().ref("events/" + eventId + "/bandsApplied/");
    var UserRefObject = firebase.database().ref("users/" + user.uid + "/eventsAppliedFor");

    var bandsRef = firebase.database().ref("bands/");
    bandsRef.on("value", function(snapshot) {
        //var band = [];


        snapshot.forEach(function(childSnapshot, index) {

            // var { whoOwns } = childSnapshot.val();
            if (childSnapshot.val().ownedBy == user.uid) {

                // if (childSnapshot.val().hasOwnProperty(key)) {
                //     band.push(key);
                // }
                var arr = [];
                var obj = childSnapshot.val();
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        arr.push(Object.assign({}, obj[key], { id: key }));
                    }
                };
                console.log(arr);

                //console.log(childSnapshot.val());

                // band.push(childSnapshot.val());
                // console.log(childSnapshot.val())
                // console.log("yep");
                // band.push(snapshot.val());
                // console.log(band);
                // dbRefObject.push({
                //     id: childSnapshot.val()
                // });




                //events.push(childSnapshot.val());
            }
            //eventCreator == user.uid && events.push(childSnapshot.val());
            //^ IS THE SAME THING?! :O

            // refMenu.child("city").once("value", function(snapshot) {
            //     var city = snapshot.val()

            // });
        });
        //console.log(band.index[key]);

        // var arr = [];
        // var obj = snap.val();
        // for (var key in obj) {
        //     if (obj.hasOwnProperty(key)) {
        //         band.push(Object.assign({}, obj[key], { id: key }));
        //     }
        // };


    });

    // //sync object changes
    // dbRefObject.on('value', snap => {
    //     console.log(snap.val());
    // });

    dbRefObject.push({
        id: user.uid
    });

    // UserRefObject.push({
    //     id: eventId
    // });

    // var refOb = firebase.database().ref("users/" + user.uid);
    // refOb.on('value', snap => {
    //     console.log(snap.val().email);
    // });

    // var user = firebase.auth().currentUser;
    // if (user != null) {
    //     name = user.displayName;
    //     email = user.email;
    //     photoUrl = user.photoURL;
    //     emailVerified = user.emailVerified;
    //     uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
    //     // this value to authenticate with your backend server, if
    //     // you have one. Use User.getToken() instead.
    //     console.log(user);
    // }


    // firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //         // User is signed in.
    //         var displayName = user.displayName;
    //         var email = user.email;
    //         var emailVerified = user.emailVerified;
    //         var photoURL = user.photoURL;
    //         var isAnonymous = user.isAnonymous;
    //         var uid = user.uid;
    //         var providerData = user.providerData;

    //         console.log(displayName);
    //         user.displayName = "Mike";
    //         console.log(displayName);




    //         console.log(user);
    //         console.log(providerData);





    //         // ...
    //     } else {
    //         // User is signed out.
    //         // ...
    //     }
    // });


    swal({
        title: 'You have successfully applied for this event!',
        text: 'You will hear back from the promoter soon',
        type: 'success'
    }).then(
        function() {
            window.open("profile.html", '_self', false);

        },
        // handling the promise rejection
        function(dismiss) {

        }
    )


}
