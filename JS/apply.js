var eventId = window.location.hash.substr(1);

function submit() {


    //var firebaseRef = firebase.database().ref('users/' + 1);

    const dbRefObject = firebase.database().ref("events/" + eventId + "/bandsApplied/");
    // //sync object changes

    var user = firebase.auth().currentUser;

    const refOb = firebase.database().ref("users/" + user.uid);

    dbRefObject.push({
        id: user.uid
    });

    dbRefObject.on('value', snap => {
        console.log(snap.val());
    });

    refOb.on('value', snap => {
        console.log(snap.val().email);
    });

    var user = firebase.auth().currentUser;
    if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        console.log(user);
    }

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





    swal(
        'You have successfully applied for this event!',
        "You will hear back from the promoter soon",
        'success'
    )
}
