import "../cardRecipe.css"

export function CardRecipeComponent({ recipe }) {
    const image = (recipe && recipe.image) ? recipe.image : "Recette01.jpg"
    const name = (recipe && recipe.name) ? recipe.name : "Default Recipe"
    const ingredients = (recipe.ingredients) ? recipe.ingredients : []
    
    const description = recipe.description
    
    return (
        <article className="cardRecipe">
            <img src={'/src/assets/recipes/' + image} alt={image} />
            <div className="cardContent">
                <h3>{name}</h3>

                <h4>RECETTE</h4>
                <p>{description}</p>

                <h4>INGRÉDIENTS</h4>
                <div className="cardIngredientsList">
                    {ingredients.map((ingredient, index) => (
                        <div className="cardIngredient" key={index}>
                            <p>{ingredient.ingredient}</p>
                            <p>
                                {ingredient.quantity ? ingredient.quantity : ""}
                                {ingredient.unit ? ` ${ingredient.unit}` : ""}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}