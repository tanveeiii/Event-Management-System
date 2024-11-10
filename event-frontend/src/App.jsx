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
      ]
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App
