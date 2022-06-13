import React, { useContext } from 'react'
import RecipeIngredientEdit from './RecipeIngredientEdit'
import { RecipeContext } from './App'

export default function RecipeEdit({ recipe }) {
    const  { handleRecipeChange , handleRecipeSelect } = useContext(RecipeContext)

    function handleChange(changes) {
       handleRecipeChange(recipe.id, { ...recipe, ...changes})

    }

    function handleIngredientChange (id, ingredient) {
        const newIngredients = [...recipe.ingredients]
        const index = newIngredients.findIndex(i => i.id === id)
        newIngredients[index] = ingredient
        handleChange({ ingredients: newIngredients })
    }
    function handleIngredientAdd() {
        const newIngredients = {
      id: Date.now().toString(),
      name : '',
    amout: ''
        }
        handleChange({ingredients: [...recipe.ingredients, newIngredients]})
    }

    function handleIngredientDelete(id)  {
        handleChange({ ingredients: recipe.ingredients.filter(i => i.id !== id)})
    }

  return (
   <div className="recipe-edit">
    <div className="recipe-edit__remove-button-container">
        <button className="btn recipe-edit__remove-button"
        onClick={() => handleRecipeSelect(undefined)}>&times;</button>
    </div>
<div className="recipe-edit__details-grid">
    <label htmlFor="name" className="recipe-edit__label">Name</label>
    <input type="text" name="name" id="name" className="recipe-edit__input" onInput={e => handleChange({ name: e.target.value })} value={recipe.name}></input>
    <label htmlFor="cookTime" className="recipe-edit__label">Cook Time</label>
    <input type="text" name="cookTime" id="cookTime" className="recipe-edit__input" onInput={e => handleChange({ cookTime: e.target.value })} value={recipe.cookTime}></input>
    <label htmlFor="servings" className="recipe-edit__label">Servings</label>
    <input type="text" min="1" name="servings" id="servings" className="recipe-edit__input" onInput={e => handleChange({ servings : parseInt(e.target.value) || '' })} value={recipe.servings}></input>
    <label htmlFor='instructions' className="recipe-edit__label" >Instructions</label>
    <textarea name="instructions" id="instructions" className="recipe-edit__input" onInput={e => handleChange({ instructions : e.target.value })} value={recipe.instructions}></textarea>
  </div>
  <br />
  <label className="recipe-edit__label">Ingredients</label> 
  <div className="recipe-edit__ingredient-grid">
      <div>Name</div>
      <div>amount</div>
      <div></div>
      {recipe.ingredients.map(ingredient => (
          <RecipeIngredientEdit key={ingredient.id}
          handleIngredientChange={handleIngredientChange}

          handleIngredientDelete={handleIngredientDelete}
           ingredient={ingredient} />
      ))}   
     
      
  </div>
  <div className="recipe-edit__add-ingredient-btn-container">
      <button className='btn btn--primary' 
       onClick={() => handleIngredientAdd()}
       >Add Ingredients</button>
  </div>
</div>  
  )
}
