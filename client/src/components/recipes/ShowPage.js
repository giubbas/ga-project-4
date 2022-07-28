import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { useNavigate, useParams } from 'react-router-dom'
import { getTokenFromLocalStorage, userIsOwner } from '../../helpers/auth'
import { Link } from 'react-router-dom'
import Comments from '../Comments'

// Import icons
import { FaUserAlt } from 'react-icons/fa' 
import { RiDeleteBin6Fill } from 'react-icons/ri' 
import { MdOutlineModeEditOutline } from 'react-icons/md' 

const ShowPage = () => {

  const navigate = useNavigate()

  const [ recipe, setRecipe ] = useState([])
  const { id } = useParams()
  const [ boxDisplay, setBoxDisplay ] = useState('ingredients')

  // Get a single recipe
  const getData = async () => {
    const { data } = await axios.get(`/api/recipes/${id}/`) 
    console.log(data)
    setRecipe(data)
  }

  // Call the function GET a single recipe inside useEffect
  useEffect(() => {
    getData()
  }, [])

  // DELETE the recipe
  const handleRemoveBtn = async () => {
    try {
      await axios.delete(`/api/recipes/${id}/`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }) 
      navigate('/recipes')
    } catch (error) {
      console.log(error)
    }
  }

  const handleBoxBtn = (e) => {
    setBoxDisplay(e.target.value)
    console.log(boxDisplay)
  }

  // DELETE a comment
  const handleDeleteComment = async (e) => {
    e.preventDefault()
    try {
      await axios.delete(`/api/comments/${e.target.value}/`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      getData()
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      {
        recipe.owner
          ?
          <>
            <header>
              <h1>{recipe.title}</h1>
              <div>
                {
                  recipe.owner.username &&
                    <h3><FaUserAlt className='header-user-icon'/> {recipe.owner.username}</h3>
                }
                {
                  userIsOwner(recipe.owner) &&
                  <div>
                    <Link to={`/recipes/${id}/edit`}><MdOutlineModeEditOutline /></Link>
                    <button onClick={handleRemoveBtn}><RiDeleteBin6Fill /></button>
                  </div>
                }
              </div>
            </header>
            <section className='recipe-show'>
              <div className='image-wrapper'>
                <div>
                  <img src={recipe.image} />
                </div>
              </div>
              <div className='box'>
                <button onClick={handleBoxBtn} value="ingredients">Ingredients</button>
                <button onClick={handleBoxBtn} value="method">Method</button>
                {
                  boxDisplay === 'ingredients'
                    ?
                    <div className='ingredients'>
                      <ul>
                        {
                          recipe.ingredients && recipe.ingredients.map((item, index) => {
                            return (
                              <li key={index}>{item}</li>
                            )
                          })
                        }
                      </ul>
                    </div>
                    :
                    <div className='method'>{recipe.method}</div>
                }
              </div>
            </section>
            <section className='comments-section'>
              <Comments getData={getData} />
              <div className='comment-list'>
                {
                  recipe.comments && recipe.comments.length > 0
                    ?
                    recipe.comments.map(item => {
                      return (
                        <>
                          <div key={item.id} className='single-comment'>
                            <h5><FaUserAlt className='comments-user-icon'/> {item.owner.username}</h5>
                            <p>{item.created_at.slice(0, 10)}</p>
                            <p>{item.text}</p>
                            {
                              userIsOwner(item.owner.id) && <button value={item.id} onClick={handleDeleteComment}>Delete</button>
                            }
                            <hr />
                          </div>
                        </>
                      )
                    })
                    :
                    <h6>No comments yet!</h6>
                }
              </div>
            </section>
          </>
          :
          <h4>Not found!</h4>
      }
    </>
  )
}

export default ShowPage