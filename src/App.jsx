import { useState } from 'react'

import './App.css'
import { NavbarComponent } from './components/navbar'
import { ListRecipesComponent } from './components/listRecipes'
import { ThemeContext } from './context/themeContext'


function App() {
  const [searchTerm, setSearchTerm] = useState("");


  return (
      <>
        <NavbarComponent  searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ListRecipesComponent searchTerm={searchTerm} />
      </>
  )  
}

export default App