const form = document.querySelector('#log-in')
//check if user is signed in
firebase.auth().onAuthStateChanged( (user) => {
  if( user ) {
    console.log('signed in')
  }
  else{
    console.log('not signed in')
  }
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const data = new FormData(form)
  const email = data.get('Uname')
  const pass = data.get('Pass')
  firebase.auth().signInWithEmailAndPassword(email,pass)
  .catch((error) => { console.log(error) })
})

