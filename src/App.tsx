import EmptyLayout from './layouts/EmptyLayout'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import FilterLayout from './layouts/FilterLayout'
import ClientLayout from './layouts/ClientLayout'
import ConfigLayout from './layouts/ConfigLayout'
import ContainerLayout from './layouts/ContainerLayout'
import DashboardLayout from './layouts/DashboardLayout'

import LandingView from './views/LandingView'
import HomeView from './views/HomeView'
import NoMatchView  from './views/NoMatchView'
import CheckoutView from './views/CheckoutView'
import PlannerView from './views/PlannerView';
import LoginView from './views/LoginView'
import CategoryView from './views/CategoryView'
import CartView from './views/CartView'
import DashboardView from './views/DashboardView'
import RegisterView from './views/RegisterView'
import OrdersView from './views/OrdersView'
import PlanView from './views/PlanView'
import HistoryView from './views/HistoryView'

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

              <Route path='orders' element={<OrdersView />} />
              <Route path='plan' element={<PlanView />} />
              <Route path='history' element={<HistoryView />} />
            </Route>   

            <Route path='dashboard/' element={<DashboardLayout />}>
              <Route index element={<DashboardView />} />
            </Route>

            <Route path='*' element={<NoMatchView />} /> 
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
