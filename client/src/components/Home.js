import React from 'react'
import { Link } from 'react-router-dom'
import Common from '../common/Background'

const Home = () => {
  return (
    <main className='home-page'>
      <div className='logo'>
        <div className='logo-image'></div>
        <h2>Find the meals that fit your needs.</h2>
        <Link to={'/recipes'}>Start</Link>
      </div>
      <div className='meal-img'></div>
    </main>
  )
}

export default Home