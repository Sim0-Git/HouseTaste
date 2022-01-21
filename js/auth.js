// check for authentication and change navigation
// function to change navigation buttons to only show logout when use is logged in
function updateNavigation( authState ) {
  //get reference to navigation buttons
  const authNav = document.querySelectorAll('#user-auth a')
  authNav.forEach( (navItem) => {
    let attr = navItem.getAttribute('data-name')
    if( authState == true ) {   
      if( attr == 'auth' ){
        navItem.style.display = 'none'
      }
      else {
        navItem.style.display = 'block'
        navItem.addEventListener('click', () => { 
          firebase.auth().signOut()
          .then( 
            // this is where it goes after log out
            window.location.href='index.html' 
          ) 
        })
      }
    }
    else {
      if( attr == 'auth' ){
        navItem.style.display = 'block'
      }
      else {
        navItem.style.display = 'none'
      }
    }
  })
}

firebase.auth().onAuthStateChanged( ( user ) => {
  if( user ) {
    updateNavigation(true)
  }
  else {
    updateNavigation(false)
  }
})



