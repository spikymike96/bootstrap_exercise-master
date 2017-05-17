function publishEvent() {
    var city = document.getElementById('city').value;
    var name = document.getElementById('name').value;
    var venue = document.getElementById('venue').value;
    var dateText = document.getElementById('dateText').value;
    var time = document.getElementById('time').value;
    var slots = document.getElementById('slots').value;
    var eventDescription = document.getElementById('eventDescription').value;
    var terms = document.getElementById('terms').value;
    var user = firebase.auth().currentUser;
    var RefObject = firebase.database().ref("events/");
    var UserRefObject = firebase.database().ref("users/" + user.uid + "/eventsOwned");

    //var date = moment(dateInput.value, "DD/MM/YYYY");


    RefObject.push({
        eventCreator: user.uid,
        city: city,
        venue: venue,
        date: dateText,
        description: eventDescription,
        startTime: time,
        name: name,
        terms: terms,
        numberofslots: slots,
        bands: [{
            id: 1,
            name: "Bruno Mars"
        }, {
            id: 2,
            name: "Coldplay"
        }, {
            id: 3,
            name: "Linkin Park"
        }]
    });

    // UserRefObject.push({
    //     eventsOwned: "THE RANDOM ID"
    // })

    //var name = snapshot.name();
    // console.log(key);

    swal({
        title: 'Your event has been created!',
        text: 'Check your profile for applications!',
        type: 'success'
    })

    if (user != null) {
        console.log(user);
    }
}
