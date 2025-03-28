import EmptyLayout from './layouts/EmptyLayout'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HomeView from './views/HomeView'
// import PricingView from './views/PricingView'
// import SuscribeView from './views/SuscribeView'
// import ConfigLayout from './layouts/ConfigLayout'
import NoMatchView  from './views/NoMatchView'
import CategoryView from './views/CategoryView'
import LandingView from './views/LandingView'
import FilterLayout from './layouts/FilterLayout'
import NavLayout from './layouts/NavLayout';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmptyLayout />}>
          <Route index element={<NoMatchView />} />
          <Route path=":lang/" element={<NavLayout />}>
            <Route index element={<LandingView />} />
            <Route path='category/' element={<FilterLayout />}>
              <Route index element={<HomeView />} />
              <Route path=':id' element={<CategoryView />} />
            </Route>

            {/* <Route path='config/' element={<ConfigLayout />}>
              <Route index element={<PricingView />} />
              <Route path='suscribe' element={<SuscribeView />} />
            </Route> */}

            <Route path='*' element={<NoMatchView />} /> 
          </Route>      
        </Route>
      </Routes>
    </Router>
  )
}

export default App
