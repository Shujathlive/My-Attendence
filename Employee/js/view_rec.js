var docRef = firestore.collection("Infy-Attendence");
// var newdocRef = firestore.collection("Attendence");
function initMap (latitude,longitude) {
    var uluru = {lat: latitude, lng: longitude};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }
firebase.auth().onAuthStateChanged(firebaseUser => {
    var uid_email = firebase.auth().currentUser.email;
    console.log(uid_email);


    linkdocRef = docRef.where("Email", "==", uid_email);
    linkdocRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            myData = doc.data();
            docRef.doc(myData.Email).collection("Attendence").get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    //console.log(doc.data());

                    // document.getElementById("echoes").innerHTML += "<br><div><h3> name :" + doc.data().name + "<br> employee id:" + doc.data().employeeid + "</div></h3>";

                    // // document.getElementById("show").innerHTML += "<tr><td> employee id:" +"</td></tr>";

                    // for (i = 1; i < diffDays + 1; i++) {
                    //     for (j = 1; j < 3; j++) {
                    //         document.getElementById("echoes").innerHTML += "<div><h3>" + doc.data()["day" + i]["time" + j] + "</div></h3>";
                    //     }
                    // }
                    Object.keys(doc.data()).forEach(function (data) {
                        console.log(data);
                        if(doc.data()[data].presence == true){
                            pre_sense = "Present";
                        }else{
                            pre_sense = "Absent"
                        }
                        
                     


                        document.getElementById('echo').innerHTML += "<tr><td>" + data + "</td><td>" +
                            pre_sense + "</td><td>" + doc.data()[data].timestamp.toDate() + "</td><td><input type='button' onclick='openModal()' class='btn btn-success' style='width:80px;height:30px;border-radius:8px' value='Map-it!&nbsp;' /></td></tr><script>"+initMap(doc.data()[data].location._lat, doc.data()[data].location._long)+"</script>";
                            
                            // "<input type='button' onclick='openModal()' class='btn btn-success' style='width:80px;height:30px;border-radius:8px' value='Map-it!&nbsp;' /></td></tr>";

                        // data_list.push(data);
                        
                        // console.log(doc.data()[data].location);

                        // console.log(doc.data()[data].presence);
                    });
                    // for(i=0;i<=data_list.length; i++){
                    //     // document.getElementById('echo').innerHTML = "<tr><td>" + data_list[i] + "</td></tr> ";
                    //     console.log(data_list);


                    // }

                    //console.log(doc.data());

                });
            }).catch(function (error) {
                console.log("Error: ", error);
            });
        });
    }).catch(function (error) {
        console.log("Error: ", error);
    });
});
