// Web app's Firebase configuration 
var firebaseConfig = {
  apiKey: "AIzaSyC-1FaJ8JWxRmQ2u09hM1QieWk7SstAAIE",
  authDomain: "house-taste.firebaseapp.com",
  databaseURL: "https://house-taste.firebaseio.com",
  projectId: "house-taste",
  storageBucket: "house-taste.appspot.com",
  messagingSenderId: "381916878367",
  appId: "1:381916878367:web:b0b40bfcc540d543bee72a",
  measurementId: "G-Y1X5EVTLM0"
};

//Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.database();