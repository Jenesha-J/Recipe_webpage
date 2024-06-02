//d9c46ade2ab54c99855b907d7f3aa17f
// Function to display the recipe list and hide the back button
function showRecipes() {
    document.getElementById('recipes-container').style.display = 'block';
    document.getElementById('back-button').style.display = 'none';
    window.history.back();
}

document.getElementById('search-button').addEventListener('click', searchRecipes);

function searchRecipes() {
    const query = document.getElementById('search-input').value;
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=d9c46ade2ab54c99855b907d7f3aa17f`)
        .then(response => response.json())
        .then(data => displayRecipes(data.results))
        .catch(error => console.error('Error fetching recipes:', error));
}

function displayRecipes(recipes) {
    const container = document.getElementById('recipes-container');
    container.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-cards';
        
        const recipeImage = document.createElement('img');
        recipeImage.src = recipe.image;
        recipeCard.appendChild(recipeImage);
        
        const recipeTitle = document.createElement('h2');
        recipeTitle.textContent = recipe.title;
        recipeCard.appendChild(recipeTitle);
        
        recipeCard.addEventListener('click', () => fetchRecipeDetails(recipe.id));
        
        container.appendChild(recipeCard);
    });
}

function fetchRecipeDetails(recipeId) {
    fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=d9c46ade2ab54c99855b907d7f3aa17f`)
        .then(response => response.json())
        .then(data => displayRecipeDetails(data))
        .catch(error => console.error('Error fetching recipe details:', error));
}

function displayRecipeDetails(recipe) {
    const container = document.getElementById('recipes-container');
    container.innerHTML = '';
    
    const recipeCard = document.createElement('div');
    recipeCard.className = 'recipe-card';
    
    const recipeImage = document.createElement('img');
    recipeImage.src = recipe.image;
    recipeCard.appendChild(recipeImage);
    
    const recipeTitle = document.createElement('h2');
    recipeTitle.textContent = recipe.title;
    recipeCard.appendChild(recipeTitle);
    
    const recipeIngredients = document.createElement('ul');
    recipe.extendedIngredients.forEach(ingredient => {
        const ingredientItem = document.createElement('li');
        ingredientItem.textContent = ingredient.original;
        recipeIngredients.appendChild(ingredientItem);
    });
    recipeCard.appendChild(recipeIngredients);
    
    const recipeInstructions = document.createElement('div');
    recipeInstructions.innerHTML = recipe.instructions;
    recipeCard.appendChild(recipeInstructions);
    
    container.appendChild(recipeCard);
    
    // Show the back button
    document.getElementById('back-button').style.display = 'block';
    document.getElementById('back-button').addEventListener('click',showRecipes);
    // Hide the recipe list
    //container.style.display = 'none';
}
