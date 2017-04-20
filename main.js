var Manchester = false;
var York = false;
var Leeds = false;
var date;


function doalert(city) {

    if (city == "York") {
        York = !York;
    }
    if (city == "Manchester") {
        Manchester = !Manchester;
    }
    if (city == "Leeds") {
        Leeds = !Leeds;
    }
    console.log(city);
}

function submit() {
    alert(from.value);
    alert("Manchester: " + Manchester + " York: " + York + " Leeds: " + Leeds + " between " + from.value + " and " + until.value);
}
