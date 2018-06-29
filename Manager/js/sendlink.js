
var sendlink = document.getElementById('sendattendence');
var docRef = firestore.collection("Infy-Attendence");
department = "";
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
i=1
if(dd<10){
    dd='0'+dd;
} 
if(mm<10){
    mm='0'+mm;
} 
var today = dd+'-'+mm+'-'+yyyy;
timestamps = firebase.database.ServerValue.TIMESTAMP;
firebase.auth().onAuthStateChanged(firebaseUser => {
    var uid_email = firebase.auth().currentUser.email;
    console.log(uid_email);
    depdocRef = docRef.where("Email", "==", uid_email);
    depdocRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            myData = doc.data();
            sendlink.checked = myData.link_flag;
        });
    }).catch(function (error) {
        console.log("Error: ", error);
    });
   
    sendlink.onchange = function () {


        depdocRef = docRef.where("Email", "==", uid_email);
        depdocRef.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                myData = doc.data();

                docRef.doc(uid_email).update({ link_flag: sendlink.checked }).then(function (querySnapshot) {
                    //  alert("Successfully Deactivated!")
                }).catch(function (error) {
                    console.log("Error: ", error);
                });
                department = myData.Department;
                console.log(department);
                getdocRef = docRef.where("Department", "==", department);
                getdocRef = getdocRef.where("Designation", "==", "E");
                getdocRef.get().then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        myData = doc.data();
                        console.log(myData);

                        docRef.doc(myData.Email).update({ link_flag: sendlink.checked }).then(function (querySnapshot) {
                            //  alert("Successfully Deactivated!")

                        }).catch(function (error) {
                            console.log("Error: ", error);
                        }); 
                        if(sendlink.checked){
                            
                        docRef.doc(myData.Email).collection("Attendence").add({ [today]:{location:null,presence:false,timestamp: new Date()}}).then(function (querySnapshot) {
                            //  alert("Successfully Deactivated!")
                            i=i+1;
                        }).catch(function (error) {
                            console.log("Error: ", error);
                        });
                    }
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

// var today = new Date();
// var dd = today.getDate();
// var mm = today.getMonth()+1; //January is 0!

// var yyyy = today.getFullYear();
// if(dd<10){
//     dd='0'+dd;
// } 
// if(mm<10){
//     mm='0'+mm;
// } 
// var today = dd+'/'+mm+'/'+yyyy;