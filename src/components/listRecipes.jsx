import { useEffect, useState } from "react"
import { FiltersComponent } from "./filters";
import { CardRecipeComponent } from "./CardRecipe";

import "../recipesList.css";
export function ListRecipesComponent({ searchTerm }) {
    const [recipes, setRecipes] = useState([])
    const [filteredRecipes, setFilteredRecipes] = useState([])
    // Récupération des recettes dans le fichier json
    useEffect(() => {
      fetch('/src/assets/recettes.json')
      .then((res) => res.json())
      .then((json) => setRecipes(json));
      
    }, []);
    
    return(
        
        <div>
         
            <FiltersComponent recipes={ recipes } filteredRecipes={filteredRecipes} setFilteredRecipes = {setFilteredRecipes} searchTerm={searchTerm} />
            <div className="recipesListDiv">

              {
              (filteredRecipes.length == 0 && searchTerm.length < 3) ?
                recipes.map((recipe) => <CardRecipeComponent recipe={recipe} />) 
              :  
                filteredRecipes.map((recipe) => <CardRecipeComponent recipe={recipe} />) 
              }
            </div>
        </div>

     
    )
}