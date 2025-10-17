import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import './App.css'
import Landing from './pages/landing'
import Login from './pages/login'
import Signup from './pages/signup'
import Venues from './pages/venues'
import Profile from './pages/profile'
import About from './pages/about'
import Add from './pages/Add'
import Form from './pages/Form'
import Details from './pages/details'
import Booking from './pages/booking'
import Booked from './pages/booked'
import Listed from './pages/listed'

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<Landing/>,
    },
    {
      path:"/login",
      element:<Login/>,
    },
    {
      path:"/signup",
      element:<Signup/>,
    },
    {
      path:"/venues",
      element:<Venues/>
    },
    {
      path:"/profile",
      element:<Profile/>
    },
    {
      path:"/about",
      element:<About/>
    },
    {
      path:"/add",
      element:<Add/>
    },
    {
      path:"/add/form",
      element:<Form/>
    },
    {
      path:"/details/:id",
      element:<Details/>
    },
    {
      path:"/booking/:id",
      element:<Booking/>
    },
    {
      path:"/booked",
      element:<Booked/>
    },
    {
      path:"/listed",
      element:<Listed/>
    }

  ])

  return (
    <>
    <RouterProvider router = {router}/> 
    </>
  )
}

export default App
