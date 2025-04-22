import EmptyLayout from './layouts/EmptyLayout'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import FilterLayout from './layouts/FilterLayout'
import NavLayout from './layouts/NavLayout'

import LandingView from './views/LandingView'
import HomeView from './views/HomeView'
import NoMatchView  from './views/NoMatchView'
import CheckoutView from './views/CheckoutView'
import PlannerView from './views/PlannerView';
import LoginView from './views/LoginView'
import CategoryView from './views/CategoryView'
import CartView from './views/CartView'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmptyLayout />}>
          <Route index element={<NoMatchView />} />
          <Route path='login' element={<LoginView />} />

          <Route path=":lang/" element={<NavLayout />}>
            <Route index element={<LandingView />} />

            <Route path='category/' element={<FilterLayout />}>
              <Route index element={<HomeView />} />
              <Route path=':id' element={<CategoryView />} />
            </Route>

            <Route path='cart' element={<CartView />} />
            <Route path='planning' element={<PlannerView />} />
            <Route path='checkout' element={<CheckoutView />} />

            <Route path='*' element={<NoMatchView />} /> 
          </Route>      
        </Route>
      </Routes>
    </Router>
  )
}

export default App
