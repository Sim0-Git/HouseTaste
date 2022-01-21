// select the dish elemens
const dishName = document.querySelector('#dish-name')
const dishImage = document.querySelector('#dish-image')
const dishIngredients = document.querySelector('#dish-ingredients')
const dishSteps = document.querySelector('#dish-steps')
const currentURL = new URL(window.location.href)
const recipeName = currentURL.searchParams.get('name')
// get the recipe from database
firebase.database().ref(`recipes/${recipeName}`).once('value')
  .then((snapshot) => {
    let recipe = snapshot.val()
    // recipe name
    dishName.innerHTML = recipe.name
    // recipe image
    dishImage.src = `recipe_images/${recipe.image}`
    // recipe ingredients
    recipe.ingredients.forEach((ingredient) => {
      let elm = `<li>${ingredient.amount} ${ingredient.description}</li>`
      dishIngredients.insertAdjacentHTML('beforeend', elm)
    })
    // recipe steps
    recipe.method.forEach((method) => {
      let elm = `<li>${method}</li>`
      dishSteps.insertAdjacentHTML('beforeend', elm)
    })
  })