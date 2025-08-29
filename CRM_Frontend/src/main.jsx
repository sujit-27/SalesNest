import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import DashboardHome from './components/Dashboard/DashboardHome.jsx'
import Customers from './components/Dashboard/Customers.jsx'
import Leads from './components/Dashboard/Leads.jsx'
import Deals from './components/Dashboard/Deals.jsx'
import Activities from './components/Dashboard/Activities.jsx'
import AddLeadForm from './components/Forms/AddLeadsForm.jsx'
import AddCustomerForm from './components/Forms/AddCustomerForm.jsx'
import AddActivityForm from './components/Forms/AddActivityForm.jsx'
import AddDealForm from './components/Forms/AddDealForm.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<Dashboard />}>
        <Route path="" element={<DashboardHome />} />
        <Route path="customers" element={<Customers />} />
        <Route path="leads" element={<Leads />} />
        <Route path="deals" element={<Deals />} />
        <Route path="activities" element={<Activities />} />
        <Route path='addLead' element={<AddLeadForm/>}/>
        <Route path='addCustomer' element={<AddCustomerForm/>}/>
        <Route path='addActivity' element={<AddActivityForm/>}/>
        <Route path='addDeal' element={<AddDealForm/>}/>
      </Route>

  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)