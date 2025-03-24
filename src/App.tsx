import EmptyLayout from './layouts/EmptyLayout'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HomeView from './views/HomeView'
import PricingView from './views/PricingView'
import SuscribeView from './views/SuscribeView'
import ConfigLayout from './layouts/ConfigLayout'
import { NoMatch } from './views/NoMatch'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmptyLayout />}>
          <Route index element={<HomeView />} />

          <Route path='config/' element={<ConfigLayout />}>
            <Route index element={<PricingView />} />
            <Route path='suscribe' element={<SuscribeView />} />
          </Route>

          <Route path='*' element={<NoMatch />} />
        </Route>      
      </Routes>
    </Router>
  )
}

export default App
