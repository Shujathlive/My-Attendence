  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCj-SUgFkGVp6LfJe2ou79uo_k6fjzUinA",
    authDomain: "imwattendence.firebaseapp.com",
    databaseURL: "https://imwattendence.firebaseio.com",
    projectId: "imwattendence",
    storageBucket: "imwattendence.appspot.com",
    messagingSenderId: "520812398143"
  };
  firebase.initializeApp(config);
  const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);