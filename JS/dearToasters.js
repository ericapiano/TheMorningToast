$(document).ready(function() {
  firebase.initializeApp(config);

  var notesDatabase = firebase.database();

  $("#enterButton").on("click", function(event) {
    event.preventDefault();
    var name = $("#name")
      .val()
      .trim();
    var title = $("#title")
      .val()
      .trim();
    var body = $("#body")
      .val()
      .trim();

    var note = {
      name: name,
      title: title,
      body: body
    };

    notesDatabase.ref().push(note);
    console.log(note.name);
    console.log(note.title);
    console.log(note.body);

    $("#name").val("");
    $("#title").val("");
    $("#body").val("");
  });

  trainDatabase.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    var trainN = childSnapshot.val().name;
    var destinationCity = childSnapshot.val().destination;
    var timeIn = childSnapshot.val().time;
    var frequencyMin = childSnapshot.val().frequency;

    var timeArray = frequencyMin.split(":");
    var trainTime = moment()
      .hours(timeArray[0])
      .minutes(timeArray[1]);
    var maxMoment = moment().max(moment(), trainTime);
    var trainMinutes;
    var trainArrival;

    console.log(maxMoment);
    console.log(trainTime);
    console.log(trainRemainder);
    console.log(trainMinutes);
    console.log(trainArrival);
  });

  $("#clearButton").on("click", function(event) {
    event.preventDefault();

    $("td").empty();
  });
});
