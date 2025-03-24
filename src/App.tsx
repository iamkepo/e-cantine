import EmptyLayout from './layouts/EmptyLayout'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HomeView from './views/HomeView'
import PricingView from './views/PricingView'
import SuscribeView from './views/SuscribeView'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmptyLayout />}>
          <Route index element={<HomeView />} />
          <Route path='pricing' element={<PricingView />} />
          <Route path='suscribe' element={<SuscribeView />} />
        </Route>      
      </Routes>
    </Router>
  )
}

export default App
