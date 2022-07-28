import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import logoImage from '../../styles/assets/logo-image.png'

const Register = () => {

  const navigate = useNavigate()

  const [ formData, setFormData ] = useState({
    username: '',
    email: '',
    password: '', 
    password_confirmation: '',
  })

  const [ errors, setErrors ] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmitBtn = async (e) => {

    e.preventDefault()

    try {
      await axios.post('/api/auth/register/', formData)
      console.log(formData)
      navigate('/login')
    } catch (err) {
      console.log(err)
      console.log(err.response.data.errors)
      setErrors(err.response.data.errors)
    }
  }


  return (
    <section className='register-section'>
      <form onSubmit={handleSubmitBtn}>
        <img src={logoImage} />
        <input type='text' name='username' placeholder='Username' value={formData.username} onChange={handleChange}></input>
        <input type='text' name='email' placeholder='Email' value={formData.email} onChange={handleChange}></input>
        <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange}></input>
        <input type='password' name='password_confirmation' placeholder='Confirm password' value={formData.password_confirmation} onChange={handleChange}></input>
        <button type='submit'>Sign up</button>
      </form>
    </section>
  )
}

export default Register