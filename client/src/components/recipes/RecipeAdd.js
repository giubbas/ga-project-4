import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { TagsInput } from 'react-tag-input-component'
import { useNavigate } from 'react-router-dom'
import ImageUpload from '../ImageUpload'
import { getPayload, getTokenFromLocalStorage } from '../../helpers/auth'


const RecipeAdd = () => {

  const navigate = useNavigate()

  const [ formData, setFormData ] = useState({
    title: '',
    ingredients: '',
    method: '',
    cook_time: '',
    main_ingredient: '',
    image: '',
    owner: '',
  })

  const [ingredients, setIngredients] = useState([])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log('image --->', formData.image)
  }

  const handleSubmitBtn = async (e) => {
    e.preventDefault()
    const payload = getPayload()
    formData.ingredients = ingredients
    formData.owner = payload.sub
    console.log(formData)

    try {
      const { data } = await axios.post('/api/recipes/', formData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      navigate(`/recipes/${data.id}`)
    } catch (err) {
      console.log(err)
      console.log(err.response)
    }
  }

  return (
    <section className='add-recipe-section'>
      <form onSubmit={handleSubmitBtn}>
        <label htmlFor='title'>Title</label>
        <input type='text' name="title" className="add-page-title" value={formData.title} onChange={handleChange}></input>

        <label htmlFor='Ingredients'>Ingredients</label>
        <TagsInput
          name="ingredients"
          value={ingredients}
          onChange={setIngredients}
          placeHolder="Enter ingredients"
        />

        <label htmlFor='method'>Method</label>
        <textarea name='method' value={formData.method} onChange={handleChange}></textarea>
        
        <label htmlFor='cook-time'>Cook time</label>
        <select name="cook_time" value={formData.cook_time} onChange={handleChange}>
          <option value="" disabled="disabled">--</option>
          <option value="15min">15 min</option>
          <option value="30min">30 min</option>
          <option value="45min">45 min</option>
          <option value="1h or more">1 h</option>
        </select>

        <label htmlFor='main_ingredient'>Main ingredient</label>
        <select name="main_ingredient" value={formData.main_ingredient} onChange={handleChange}>
          <option value="" disabled="disabled">--</option>
          <option value="meat">Meat</option>
          <option value="fish">Fish</option>
          <option value="eggs">Eggs</option>
          <option value="vegetables">Vegetables</option>
          <option value="fruit">Fruit</option>
          <option value="dairy">Dairy</option>
          <option value="grain">Grain</option>
          <option value="tubers">Tubers</option>
          <option value="legumes">Legumes</option>
        </select>
        
        <label htmlFor='image'>Image</label>
        <ImageUpload 
          formData={formData}
          setFormData={setFormData}
        />

        <button type='submit' className='add-recipe-btn'>Add a recipe</button>
      </form>
    </section>
  )
}

export default RecipeAdd