const recipesView = document.querySelector('#recipes-view')
const ingredientsView = document.querySelector('#ingredients-view') 
const viewAll = document.querySelector('.view-all')

// recipes will be stored as an array in recipes
let recipes = []

// ingredients will be stored as an array in ingredients
let ingredients = []

// function to render recipes
function renderRecipes( container, dataArray ) {
  container.innerHTML = ''
  dataArray.forEach((recipe) => {
    let html = `<div class="item" style="position:relative;">
                  <img style="max-width:100%;" src="recipe_images/${recipe.image}">
                  <div class="title-box">
                  <h3 style="text-transform:capitalize;">${recipe.name}</h3>
                  </div>
                  <a href="recipe-detail.html?name=${recipe.id}" style="position:absolute;top:0;bottom:0;left:0;right:0;"></a>
                </div>`
    container.insertAdjacentHTML('beforeend', html)
  })
}

// function to show all recipes
function showAllRecipes() {
  renderRecipes( recipesView, recipes )
}

viewAll.addEventListener('click', showAllRecipes )

// function to filter recipes using ingredient name
function filterRecipes( name ) {
  let filteredRecipes = recipes.filter( ( recipe ) => {
    
    // get the ingredients of recipe and filter it
    let match = recipe.ingredients.filter((ingredient) => {
      if( ingredient.name.includes( name ) || name.includes(ingredient.name ) ) {
        return ingredient
      }
      else if( name.indexOf(' ') > 0 || ingredient.name.indexOf(' ') > 0 ) {
        nameWords = name.split(' ')
        ingredientWords = ingredient.name.split(' ')
        ingredientWords.forEach( (word) => {
          if( nameWords.includes(word) ) {
            return ingredient
          }
        })
      }
    })
    // if there is more than 0 match, add recipe to result
    if( match.length > 0 ) {
      return recipe
    }
  })
  console.log( filteredRecipes)
  return filteredRecipes
}

// read data from database from 'recipes'

// get recipes
firebase.database().ref('recipes').once('value')
  .then((snapshot) => {
    let result = snapshot.val()
    let items = []
    if (JSON.stringify(result)) {
      let keys = Object.keys(result)
      keys.forEach((key) => {
        let recipe = result[key]
        recipe.id = key
        items.push(recipe)
      })
      recipes = items
      // now show the recipes in the HTML
      renderRecipes( recipesView, recipes )
      
    }
  })


// get the ingredients
firebase.database().ref('ingredients').once('value')
  .then((snapshot) => {
    let result = snapshot.val()
    let items = []
    if (JSON.stringify(result)) {
      let keys = Object.keys(result)
      keys.forEach( (key) => {
        let group = {}
        group.items = result[key]
        group.name = key
        items.push(group)
      })
      ingredients = items
      // add the ingredients to the HTML
      items.forEach( (group) => {
        let safeName = group.name.replace(' ','-')
        let link = `<button class="collapsible" style="text-transform:capitalize;">${group.name}</button>
                    <div class="content" id=${safeName}>
                        <ul>
                        </ul>
                    </div>`
        // add ingredient group to side menu
        ingredientsView.insertAdjacentHTML('beforeend', link )
        // add subgroup ingredients to the collapse
        const groupCollapse = document.querySelector(`#${safeName} > ul`)
        group.items.forEach( (item) => {
          let itemLink = `<li><a style="text-transform:capitalize;" class="ingredient-link" href="#" data-name="${item}">${item}</a></li>`
          groupCollapse.insertAdjacentHTML('beforeend',itemLink)
        })
      })
      let ingredientLinks = document.querySelectorAll('.ingredient-link')
      ingredientLinks.forEach( (link) => {
        link.addEventListener('click', (event) => {
          event.preventDefault()
          let result = filterRecipes(event.target.getAttribute('data-name'))
          renderRecipes( recipesView, result )
        })
      })
      // call to activate the collapsibles
      activateCollapsibles()
    }
  })

  //search
  // added id="search" to input
  const searchInput = document.querySelector('#search')
  searchInput.addEventListener('input', (event) => {
    // add a delay of 500ms (0.5 sec) so it does not fire everytime the user types
    setTimeout( () => {
      const query = event.target.value
      const result = recipes.filter( ( recipe ) => {
        if( recipe.name.indexOf(query) >= 0 ) {
          return recipe
        }
      })
      renderRecipes( recipesView, result )
    }, 500 )
  })