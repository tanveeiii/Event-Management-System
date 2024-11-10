import './static/App.css'
import Homepage from './pages/Homepage'
import Competitions from './pages/Competitions'
import Events from './pages/Events'
import Partners from './pages/Partners'
import Gallery from './pages/Gallery'
import Team from './pages/Team'
import Speakers from './pages/Speakers'
import Login from './pages/Login'
import { RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom'
import MainLayout from './pages/MainLayout'
// import TeamLogin from './pages/TeamLogin'
import Dashboard from './pages/Dashboard'
import Ticket from './pages/Ticket'
<<<<<<< HEAD
import PaymentSuccess from './pages/PaymentSuccess'
=======
import Register from './pages/Register'
>>>>>>> bb4a517a3153a4aa1e2f146c53fec2dfdad75ca6
// import { useLocation } from 'react-router-dom'

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/", element: <MainLayout />, children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/ticket",
          element: <Ticket />,
        },
        {
          path: "/competitions",
          element: <Competitions />
        },
        {
          path: "/events",
          element: <Events />
        },
        {
          path: "/gallery",
          element: <Gallery />
        },
        {
          path: "/partners",
          element: <Partners />
        },
        {
          path: "/team",
          element: <Team />
        },
        {
          path: "/login",
          element: <Login />,
          // action: loginAction
        },
        {
          path: "/speakers",
          element: <Speakers />
        },
        {
          path: "/dashboard",
          element: <Dashboard />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
<<<<<<< HEAD
          path: "/success",
          element: <PaymentSuccess/>
=======
          path: "/register/:compName",
          element: <Register />
>>>>>>> bb4a517a3153a4aa1e2f146c53fec2dfdad75ca6
        },
      ]
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App
