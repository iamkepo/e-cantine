import './App.css'
import EmptyLayout from './layouts/EmptyLayout'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HomeView from './views/HomeView'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmptyLayout />}>
          <Route index element={<HomeView />} />
        </Route>      
      </Routes>
    </Router>
  )
}

export default App
