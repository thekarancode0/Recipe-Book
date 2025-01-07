const container = document.querySelector(".recipe-Box");
const searchInpt = document.querySelector(".searchBox");
const home = document.querySelector(".home");
const recipeBook = document.querySelector(".book");
const sweets = document.querySelector(".sweet");
const login = document.querySelector(".login");
const recipeBox = document.querySelector('.recipe-Box')

recipeBook.addEventListener('click',()=>{
  console.log("click")
  recipeBox.classList.toggle('show')
})




let allRecipe = [];
fetch("https://dummyjson.com/recipes")
  .then((res) => res.json())
  .then((data) => {
    allRecipe = data.recipes; 
    console.log(allRecipe);
    renderRecipe(allRecipe);
  });

function renderRecipe(recipes) {
  container.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.cuisine}">
          <h2>${recipe.name}</h2>
          <p>Price: $${recipe.cookTimeMinutes}</p>
          <p>Calory: ${recipe.caloriesPerServing}</p>
      `;

      recipeDiv.addEventListener('click',()=>{
        window.location.href = `fullRecipe.html?${recipe.id}`;
                localStorage.setItem('recipeId', recipe.id)
      }); 
    container.appendChild(recipeDiv);
  });
}

searchInpt.addEventListener('input', () => {
    recipeBox.classList.toggle('show')
    const searchData = searchInpt.value.toLowerCase(); 
    const filteredRecipe = allRecipe.filter(recipe =>
        recipe.name.toLowerCase().includes(searchData) || 
        recipe.cuisine.toLowerCase().includes(searchData) 
    );
    renderRecipe(filteredRecipe); 
});

