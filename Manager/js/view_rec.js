
var docRef = firestore.collection("Infy-Attendence");
// var newdocRef = firestore.collection("Attendence");
var fetchdoc = document.getElementById("emp_select")
Mdept = "";
my_list = [];
emp_email = "";
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
    mdoc = docRef.where("Email", "==", uid_email);
    fetchdoc.innerHTML = "<option value='' selected disabled hidden>Select an Employee</option>";
    mdoc.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            myData = doc.data();
            Mdept = myData.Department;
            empdocRef = docRef.where("Designation", "==", "E");
            empdocRef = empdocRef.where("Department", "==", Mdept);
            empdocRef.get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    myData = doc.data();
                    console.log(myData.Employee_ID);
                    emp_no = myData.Employee_ID;
                    
                    fetchdoc.innerHTML += "<option value='"+ emp_no +"' style='background-color:transparent;color:black;font-weight:bold'>" + emp_no + "</option";
                    
                });
            }).catch(function (error) {
                console.log("Error: ", error);
            });

        });
    }).catch(function (error) {
        console.log("Error: ", error);
    })

    fetchdoc.onchange = function(){
        var selected_emp =  $('#emp_select option:selected').text();
        console.log(fetchdoc.value);
        selempdoRef = docRef.where("Designation", "==", "E");
        selempdoRef = selempdoRef.where("Employee_ID","==",selected_emp);
        selempdoRef.get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                console.log(doc.data());
                emp_email = doc.data().Email;
                docRef.doc(emp_email).collection("Attendence").get().then(function (querySnapshot) {
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
                            console.log();
                            
                            document.getElementById('echo').innerHTML += "<tr><td>" + data + "</td><td>" +
                                pre_sense + "</td><td>" + doc.data()[data].timestamp.toDate() + "</td><td><input type='button' onclick='openModal()' class='btn btn-success' style='width:80px;height:30px;border-radius:8px' value='Map-it!&nbsp;' /></td></tr><script>"+initMap(doc.data()[data].location._lat, doc.data()[data].location._long)+"</script>";
                            
                            // data_list.push(data);
                          
                            // function displayLocation(latitude,longitude){

                            //     initMap = function(latitude,longitude) {
                            //         var uluru = {lat: latitude, lng: longitude};
                            //         var map = new google.maps.Map(document.getElementById('map'), {
                            //           zoom: 4,
                            //           center: uluru
                            //         });
                            //         var marker = new google.maps.Marker({
                            //           position: uluru,
                            //           map: map
                            //         });
                            //       }
                            //     var request = new XMLHttpRequest();
                        
                            //     var method = 'GET';
                            //     var url = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBvk1u8e3xLOfvEv7aHjZyZOnXS9DUnn_Y&callback=initMap';
                            //     var async = true;
                                
                            //     request.open(method, url, async);
                            //     request.onreadystatechange = function(){
                            //       if(request.readyState == 4 && request.status == 200){
                                    
                            //         var data = JSON.parse(request.responseText);
                            //         var address = data.results[0];
                                   
                            //         // document.getElementById('map').innerHTML = "<p>"+ address.formatted_address +"</p>"
                            //       }
                            //     };
                            //     request.send();
                            //   };
                            //   var successCallback = function(position){
                            //     var x = doc.data()[data].location._lat;
                            //     var y = doc.data()[data].location._long;
                            //     console.log(x,y);
                                
                            //     displayLocation(x,y);
                            //   };
                        
                            //   var errorCallback = function(error){
                            //     var errorMessage = 'Unknown error';
                            //     switch(error.code) {
                            //       case 1:
                            //         errorMessage = 'Permission denied';
                            //         break;
                            //       case 2:
                            //         errorMessage = 'Position unavailable';
                            //         break;
                            //       case 3:
                            //         errorMessage = 'Timeout';
                            //         break;
                            //     }
                            //     document.write(errorMessage);
                            //   };
                        
                            //   var options = {
                            //     enableHighAccuracy: true,
                            //     timeout: 1000,
                            //     maximumAge: 0
                            //   };
                        
                            //   navigator.geolocation.getCurrentPosition(successCallback,errorCallback,options);
                            console.log(doc.data()[data].location);
    
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
     
    }
    
    
    
    
});
