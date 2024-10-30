import './static/App.css'
import Homepage from './pages/Homepage'
import Competitions from './pages/Competitions'
import Events from './pages/Events'
import PastArtists from './pages/PastArtists'
import Gallery from './pages/Gallery'
import Team from './pages/Team'
import Speakers from './pages/Speakers'
import Login from './pages/Login'
import { RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom'
import MainLayout from './pages/MainLayout'
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
        // {
        //   path: "/past-artists",
        //   element: <PastArtists />
        // },
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
          element: <p style={{ "color": "white", "margin": "200px" }}>Hello</p>
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
