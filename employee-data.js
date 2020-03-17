var config = {
    apiKey: "AIzaSyA4pHXDN9-0j5u5Xi1mWtyEb6z3nxnd2iU",
    authDomain: "my-awesome-project-44bb0.firebaseapp.com",
    databaseURL: "https://my-awesome-project-44bb0.firebaseio.com",
    projectId: "my-awesome-project-44bb0",
    storageBucket: "my-awesome-project-44bb0.appspot.com",
  };
var monthsWorked;
var totalBilled;

  firebase.initializeApp(config);



  var database = firebase.database();


  $("#add-user").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();
    name = $("#name").val().trim();
    role = $("#role").val().trim();
    date = $("#date").val().trim();
    rate = $("#rate").val().trim();
    $("table").append("<tr><td>" + name + "</td><td>" + role + "</td><td>" + date + "</td><td>" + monthsWorked + "</td><td>" + rate + "</td><td>" + totalBilled + "</td></tr>");

    database.ref().push({
        name: name,
        role: role,
        date: date,
        rate: rate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
  });

  database.ref().on("child_added", function(snapshot) {
    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().role);
    console.log(snapshot.val().date);
    console.log(snapshot.val().rate);

    monthsWorked = 12;
    totalBilled = monthsWorked * snapshot.val().rate;
     //Change the HTML to reflect
     $("table").append("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().role + "</td><td>" + snapshot.val().date + "</td><td>" + monthsWorked + "</td><td>" + snapshot.val().rate + "</td><td>" + totalBilled + "</td></tr>");
    
    
    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });



