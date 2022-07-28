/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'
import RecipeFilters from './RecipesFilters'

// Import icons
import { IoIosTimer } from 'react-icons/io' 
import { BsFilterRight } from 'react-icons/bs' 

const RecipeIndex = () => {

  const [ recipes, setRecipes ] = useState([])
  const [ filtersSwitchBtn, setFiltersSwitchBtn ] = useState(false)
  const [ recipesFiltered, setRecipesFiltered ] = useState([])
  const [ filters, setFilters ] = useState({
    search: '',
    cookTime: '',
    mainIngredient: '',
  })

  // GET all the recipes
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/recipes/')
        console.log('GET all data --->', data)
        setRecipes(data)
      } catch (err) {
        console.log(err.response.data.detail)
      }
    }
    getData()
  }, [])

  const handleFiltersToggleBtn = () => {
    filtersSwitchBtn === false ? setFiltersSwitchBtn(true) : setFiltersSwitchBtn(false)
    console.log(filtersSwitchBtn)
  }

  const handleChange = (e) => {
    console.log(e.target.value)
    const newObj = {
      ...filters, 
      [e.target.name]: e.target.value,
    }
    setFilters(newObj)
    // console.log(filters)
  }

  useEffect(() => {
    const filtered = recipes.filter(item => {
      return item.title.toLowerCase().startsWith(filters.search) && (filters.mainIngredient === item.main_ingredient || filters.mainIngredient === '') && (filters.cookTime === item.cook_time || filters.cookTime === '')
    })
    setRecipesFiltered(filtered)
  }, [recipes, filters])

  const handleClearFiltersBtn = () => {
    setFilters({
      search: '',
      cookTime: '',
      mainIngredient: '',
    })
  }

  return (
    <div className='recipes-index-page'>
      <div className='search-bar-and-filters-btn'>
        <input name="search" type="text" placeholder='Search by name' onChange={handleChange}></input>
        <button onClick={handleFiltersToggleBtn}><BsFilterRight className='filters-button'/></button>
      </div>
      {
        filtersSwitchBtn
        && 
        <RecipeFilters recipes={recipes} handleChange={handleChange} handleClearFiltersBtn={handleClearFiltersBtn}/>
      }
      <div className='index-recipes-list'>
        {recipesFiltered.map(item => {
          const { title, image, id, cook_time } = item
          return (
            <div key={id} className='index-recipe-card'>
              <Link to={`/recipes/${id}`}>
                <div className='index-card-image'>
                  <img src={image}/>
                </div>
                <div className='index-card-body'>
                  <h4>{title}</h4>
                  <h5><IoIosTimer className='index-card-timer-icon'/>{cook_time}</h5>
                </div>
              </Link>
            </div>
          )
        })} 
      </div>
    </div>
  )
}

export default RecipeIndex