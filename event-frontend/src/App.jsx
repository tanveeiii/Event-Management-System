import './static/App.css'
import Homepage from './pages/Homepage'
import Competitions from './pages/Competitions'
import Events from './pages/Events'
import PastArtists from './pages/PastArtists'
import Team from './pages/Team'
import Speakers from './pages/Speakers'
import { RouterProvider , createBrowserRouter } from 'react-router-dom'
import MainLayout from './pages/MainLayout'

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
          path: "/past-artists",
          element: <PastArtists />
        },
        {
          path: "/team",
          element: <Team />
        },
        {
          path: "/speakers",
          element: <Speakers />
        },
      ]
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App
