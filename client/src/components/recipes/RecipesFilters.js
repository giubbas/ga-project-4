import React, { useEffect, useState } from 'react'
import { IoIosTimer } from 'react-icons/io' 

const RecipeFilters = ({ recipes, handleChange, handleClearFiltersBtn }) => {

  const [ mainIngredientList, setMainIngredientList ] = useState([])
  const [ cookTimeList, setCookTimeList ] = useState([])

  useEffect(() => {
    // Generate the "main ingredients" buttons list
    const arrOne = []
    recipes.map(item => {
      if (!arrOne.includes(item.main_ingredient)) {
        arrOne.push(item.main_ingredient)
      }
    })
    setMainIngredientList(arrOne)

    // Generate the "cook time" buttons list
    const arrTwo = []
    recipes.map(item => {
      if (!arrTwo.includes(item.cook_time)) {
        arrTwo.push(item.cook_time)
      }
    })
    setCookTimeList(arrTwo)
  }, [recipes])

  return (
    <section className='filters-wrapper'>
      <div className='time-cook-section'>
        {/* <IoIosTimer className='filters-timer-icon'/> */}
        {cookTimeList.map((item, index) => {
          return (
            <button name="cookTime" className={`${item}-btn`} key={index} value={item} onClick={handleChange}>{item}</button>
          )
        })}
      </div>
      <hr />
      <div className='main-ingredient-section'>
        {/* <h4>Main ingredient</h4> */}
        {mainIngredientList.map((item, index) => {
          console.log(item)
          return (
            <button name="mainIngredient" className={`main-ingredient ${item}-btn`} key={index} value={item} onClick={handleChange}></button>
          )
        })}
      </div>
      <button className='clear-filters' onClick={handleClearFiltersBtn}>Clear filters</button>
    </section>
  )
}

export default RecipeFilters