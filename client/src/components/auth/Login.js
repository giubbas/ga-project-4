import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import logoImage from '../../styles/assets/logo-image.png'

const Login = () => {

  const navigate = useNavigate()

  const [ formData, setFormData ] = useState({
    email: '',
    password: '', 
  })

  const [ errors, setErrors ] = useState({})

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('recipes-app', token)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmitBtn = async (e) => {

    e.preventDefault()

    try {
      const { data } = await axios.post('/api/auth/login/', formData)
      setTokenToLocalStorage(data.token)
      navigate('/recipes')
      console.log('data token --->', data)
    } catch (err) {
      console.log(err)
      console.log(err.response.data.errors)
      setErrors(err.response.data.errors)
    }
  }


  return (
    <section className='login-section'>
      <form onSubmit={handleSubmitBtn}>
        <img src={logoImage} />
        <input type='text' name='email' placeholder='Email' value={formData.email} onChange={handleChange}></input>
        <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange}></input>
        <button type='submit'>Log in</button>
      </form>
    </section>
  )
}

export default Login