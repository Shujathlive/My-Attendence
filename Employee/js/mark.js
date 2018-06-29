
var getlink = document.getElementById('markattendence');
var docRef = firestore.collection("Infy-Attendence");
// var newdocRef = firestore.collection("Attendence");

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd;
}
if (mm < 10) {
    mm = '0' + mm;
}
latitude = 0;
longitude = 0;
// var infowindow = new google.maps.InfoWindow;

function success(position) {
    var mylat = position.coords.latitude;
    var mylong = position.coords.longitude;
    // var test =infowindow.setContent(results[0].formatted_address);
    // console.log(test);

    latitude = mylat;
    longitude = mylong; 
    dataLoaded();
}
function failure() {
    alert("Sorry! coordinates not available");

}

navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
    if (result.state == 'granted') {
        report(result.state);
        navigator.geolocation.getCurrentPosition(success, failure);
        
    } else if (result.state == 'prompt') {
        alert("In order to, mark your attendence, kindly, grant us your Location Access!");
        navigator.geolocation.getCurrentPosition(success, failure);
    } else if (result.state == 'denied') {
        getlink.setAttribute("disabled", true);
        report(result.state);
        
    }
    result.onchange = function () {
        report(result.state);
    }
});

function report(state) {
    alert('Permission ' + state);
}


var today = dd + '-' + mm + '-' + yyyy;
function dataLoaded() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
        var uid_email = firebase.auth().currentUser.email;
        console.log(uid_email);
        linkdocRef = docRef.where("Email", "==", uid_email);
        linkdocRef.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                myData = doc.data();
                console.log(myData);
                link_check = myData.link_flag;
                department = myData.Department;
                console.log(link_check);
                console.log(department);
                if (!link_check) {
                    getlink.setAttribute("disabled", true);
                } else {
                    getlink.removeAttribute("disabled");
                }
                dataReceivedMax = null;
                dataReceivedMaxId = null;
                getlink.onchange = function () {
                    newdocRef = docRef.doc(myData.Email).collection("Attendence");
                    current_time = new Date();
                    //console.log(current_time);
                    // newdocRef.orderBy("timestamp").get().then(function(querySnapshot){
                    newdocRef.get().then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                            console.log(doc.data());
                            nameOfObject = Object.keys(doc.data())[0];

                            console.log(nameOfObject);
                            if (dataReceivedMax == null) {
                                dataReceivedMax = doc.data();
                                nameOfMax = Object.keys(doc.data())[0];
                                dataReceivedMaxId = doc.id;
                            } else if (dataReceivedMax[nameOfMax].timestamp.seconds < doc.data()[nameOfObject].timestamp.seconds) {
                                dataReceivedMax = doc.data();
                                nameOfMax = Object.keys(doc.data())[0];
                                dataReceivedMaxId = doc.id;
                            } else if (dataReceivedMax[nameOfMax].timestamp.seconds == doc.data()[nameOfObject].timestamp.seconds && dataReceivedMax[nameOfMax].timestamp.nanoseconds < doc.data()[nameOfObject].timestamp.nanoseconds) {
                                dataReceivedMax = doc.data();
                                nameOfMax = Object.keys(doc.data())[0];
                                dataReceivedMaxId = doc.id;
                            }
                        });
                        // console.log(dataReceivedMaxId);
                        docRef.doc(myData.Email).collection("Attendence").doc(dataReceivedMaxId).update({ [nameOfObject]: { location: new firebase.firestore.GeoPoint(latitude, longitude), presence: getlink.checked, timestamp: new Date() } }).then(function (querySnapshot) {
                            message = "Success";
                            alert(message)
                        }).catch(function (error) {
                            console.log("Error: ", error);
                        });
                        docRef.doc(myData.Email).collection("Attendence").get().then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                                objdate = Object.keys(doc.data())[0].substr(0, 2);
                                dates = doc.data().timestamp.substr(4, 5);
                                console.log(objdate);
                                console.log(dates);

                            })
                        })

                    }).catch(function (error) {
                        console.log("Error: ", error);
                    });
                    // alert("Successful");
                }

            });
        }).catch(function (error) {
            console.log("Error: ", error);
        });


    });
}

// function alerter(message){
//     document.getElementById('alert') = '<div class="alert alert-success">  <strong>'+message+'</strong> Indicates a successful or positive action. </div>';
//  }