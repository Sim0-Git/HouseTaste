//check if user is signed in or not
firebase.auth().onAuthStateChanged( (user) => {
  if(user) {
      // user is signed in
      // console.log('signed in')
  }
  else {
      //user is not signed in
  }
})

const form = document.querySelector('#log-in')
form.addEventListener('submit', (event) => {
  event.preventDefault()
  const data = new FormData(form)
  const email = data.get('Email')
  const pass = data.get('Pass')
  // create the account with firebase
  firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function (error) {
      // Handle Errors here.
  });
})