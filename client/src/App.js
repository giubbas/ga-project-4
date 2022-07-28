import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import components
import PageNavbar from './components/PageNavbar'
import Home from './components/Home'
import RecipesIndex from './components/recipes/RecipesIndex'
import ShowPage from './components/recipes/ShowPage'
import RecipeAdd from './components/recipes/RecipeAdd'
import RecipeEdit from './components/recipes/RecipeEdit'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Common from './common/Background'

const App = () => {

  return (
    <main className='site-wrapper'>
      <BrowserRouter>
        <PageNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipesIndex />} />
          <Route path="/recipes/:id" element={<ShowPage />} />
          <Route path="/recipes/add" element={<RecipeAdd />} />
          <Route path="/recipes/:id/edit" element={<RecipeEdit />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Common />
    </main>
  )

}

export default App
