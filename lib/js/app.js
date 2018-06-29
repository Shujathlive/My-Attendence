
// Initialize Firebase
//   var config = {
//     apiKey: "",
//     authDomain: "",
//     databaseURL: "https://imwattendence.firebaseio.com",
//     projectId: "",
//     storageBucket: "",
//     messagingSenderId: "520812398143"
//   };

function check() {
    if(!myform.username.value && !myform.password.value){
        alert("Field is empty.");
        return (false);
      }
      return (true);
}
firebase.initializeApp({
  apiKey: 'AIzaSyCj-SUgFkGVp6LfJe2ou79uo_k6fjzUinA',
  databaseURL: "https://imwattendence.firebaseio.com",
  authDomain: 'imwattendence.firebaseapp.com',
  storageBucket: "imwattendence.appspot.com",
  projectId: 'imwattendence'
});
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

var docRef = firestore.collection("Infy-Attendence");
const user = document.querySelector('#username');
const pass = document.querySelector('#password');
const E_role = document.querySelector('#E_role');
const M_role = document.querySelector('#M_role');
const login = document.querySelector('#login-button');
var role;
var url;

if(username == null && password == null){
  alert("Error");
   
}else{
  login.addEventListener("click",function(){
      const email = user.value;
      const password = pass.value;
      const auth = firebase.auth();
      const promise = auth.signInWithEmailAndPassword(email,password);    
      console.log(promise);
      promise.then(function() {
          firebase.auth().onAuthStateChanged(firebaseUser => {
              if(E_role.checked == true){
                  role= E_role.value;
                  url = "Employee/employee_dashboard.html";
              }
              else if(M_role.checked == true){
                  role= M_role.value;
                  url = "Manager/manager_dashboard.html";
              }
              var uid_email = firebase.auth().currentUser.email;
              var user = firebase.auth().currentUser;
              console.log(uid_email);
              docRef = docRef.where("Email", "==", email);
              docRef = docRef.where("Password", "==", password);
              docRef.where("Designation", "==", role).get().then(function(querySnapshot) {
              
                  querySnapshot.forEach(function(doc) {
                      // doc.data() is never undefined for query doc snapshots
                      console.log(doc.id, " => ", doc.data());
                      if(firebaseUser){
                          message = "Successfully Logged-in!"
                          alert(message);
                          // console.log(firebaseUser.email);
                          
                          window.location.href = url ;
      
                      }
                      else{
                          console.log("Not Logged in!");
                      }
              
                  });
              }).catch(function(error) {
                  console.log("Error: ", error);
              });
   
          });
          firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
          .then(function() {
              var uid_email = firebase.auth().currentUser.email;
  
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even if
          // a user forgets to sign out.
          });
      }).catch(e => {
          console.log(e.message);
      });
  });

}
/////////////////////////////////////////////DB reference

      
/////////////////////////////////////////////DB based login

  // query.get().then(function(doc){
  //         if(doc.exists){
  //             const myData = doc.data();
  //             console.log(myData);
  //             if(myData.Employee_ID == username){
  //                 console.log("3");
  //                 if(myData.Password == password){
  //                     console.log("4");
  //                     if(myData.Designation == 'E'){
  //                         console.log("5");
  //                         window.location.href = "Employee/employee_dashboard.html";
  //                     }
  //                     else if(myData.Designation == 'M'){
  //                         window.location.href = "Manager/manager_dashboard.html";
  //                     }
  //                 }else{
  //                     alert("Incorrect Password, Please Check your password and Try Again!");
  //                 }
  //             }else{
  //                 alert("User does not Exist!");
  //             }
  //         }
  //     }).catch(function(error){
  //         console.log("Got an error: ",error)
  //     });
// alert("Success");
// function alerter(message){
//    document.getElementById('alert').innerHTML = '<div style="background-color:yellow;color:black;border-radius:4px;width:400px;height:30px;">'+message+'</strong> Indicates a successful or positive action. </div>';
// }