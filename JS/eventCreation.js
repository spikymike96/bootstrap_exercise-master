function publishEvent() {
    var city = document.getElementById('city').value;
    alert(city);

    var venue = document.getElementById('venue').value;
    var date = document.getElementById('date').value;
    var time = document.getElementById('time').value;
    var slots = document.getElementById('slots').value;
    var user = firebase.auth().currentUser;
    var RefObject = firebase.database().ref("events/");
    var UserRefObject = firebase.database().ref("users/" + user.uid + "/eventsOwned");

    RefObject.push({
        eventCreator: user.uid,
        city: city,
        venue: venue,
        date: date,
        startTime: time,
        numberofslots: slots,
        bands: [{
            id: 1
        }, {
            id: 2
        }, {
            id: 0
        }]
    });

    UserRefObject.push({
        eventsOwned: "THE RANDOM ID"
    })

    //var name = snapshot.name();
    // console.log(key);



    if (user != null) {
        console.log(user);
    }
}
