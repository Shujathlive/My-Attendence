

var docRef = firestore.collection("Infy-Attendence");

function add(){
    email =""
var name = $('#name').val()
var empid =$('#empid').val()
email = $('#email').val();
var pass = $('#password').val()
var dept = $('#dept').val()
var E_desgn = $('#E_des').val()
var M_desgn = $('#M_des').val()
desgn = "";
if(E_desgn.checked){
    desgn = "E";
}else if(M_desgn.checked){
    desgn = "M";
}
    docRef.doc(email).set({
        Name: name,
        Department: dept,
        Designation : desgn,
        Email: email,
        Employee_ID: empid,
        Password: pass,
        link_flag: false
    }).then(function(docRef) {
        console.log("Document written with ID: ");
    }).catch(function(error) {
        console.error("Error adding document: ", error);
    });
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email,pass);
    promise.catch(e => console.log(e.message));
}