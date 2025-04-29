import EmptyLayout from './layouts/EmptyLayout'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import FilterLayout from './layouts/FilterLayout'
import ClientLayout from './layouts/ClientLayout'
import ConfigLayout from './layouts/ConfigLayout'
import ContainerLayout from './layouts/ContainerLayout'

import LandingView from './views/LandingView'
import HomeView from './views/HomeView'
import NoMatchView  from './views/NoMatchView'
import CheckoutView from './views/CheckoutView'
import PlannerView from './views/PlannerView';
import LoginView from './views/LoginView'
import CategoryView from './views/CategoryView'
import CartView from './views/CartView'
import RegisterView from './views/RegisterView'
import OrdersView from './views/OrdersView'
import MenuView from './views/MenuView'
import HistoryView from './views/HistoryView'
import ProfileView from './views/ProfileView'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmptyLayout />}>
          <Route index element={<NoMatchView />} />

          <Route path=":lang/" element={<ContainerLayout />}>
            <Route index element={<LandingView />} />
            <Route path='login' element={<LoginView />} />
            <Route path='register' element={<RegisterView />} />

            <Route path="client/" element={<ClientLayout />}>
              <Route index element={<HomeView />} />
              <Route path='filter/' element={<FilterLayout />}>
                <Route index element={<CategoryView />} />
                <Route path=':id' element={<CategoryView />} />
              </Route>
              <Route path='cart/' element={<ConfigLayout />}>
                <Route index element={<CartView />} />
                <Route path='planning' element={<PlannerView />} />
                <Route path='checkout' element={<CheckoutView />} />
              </Route>

              <Route path='menu' element={<MenuView />} />
              <Route path='orders' element={<OrdersView />} />
              <Route path='history' element={<HistoryView />} />
              <Route path='profile' element={<ProfileView />} />
            </Route>   

            <Route path='*' element={<NoMatchView />} /> 
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
