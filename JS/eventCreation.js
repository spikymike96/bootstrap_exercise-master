function publishEvent() {
    var city = document.getElementById('city').value;
    alert(city);

    var venue = document.getElementById('venue').value;
    var date = document.getElementById('date').value;
    var time = document.getElementById('time').value;
    var slots = document.getElementById('slots').value;
    const RefObject = firebase.database().ref("events/");
    var user = firebase.auth().currentUser;
    RefObject.push({
        // eventCreator: user.uid,
        city: city,
        // venue: venue,
        date: date,
        startTime: time,
        numberofslots: slots,
        id: 31,
        bands: [{
            id: 1
        }, {
            id: 2
        }, {
            id: 0
        }]

    });


    if (user != null) {
        console.log(user);
    }
}
