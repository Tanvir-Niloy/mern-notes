
// eslint-disable-next-line no-unused-vars
import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './pages/Home'


function App() {
  return (
   <>
    <Router>
     Header
     <Routes>
      <Route path='/' element={<Home/>} />
     </Routes>
     Footer
    </Router>
   </>
  )
}

export default App