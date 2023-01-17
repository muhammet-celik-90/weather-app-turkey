import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CityList from './pages/CityList';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import WeatherDetail from './pages/WeatherDetail';
import Map from './pages/Map';

function App() {

  useEffect(() => {
    document.title = "Hava Durumu | Türkiye"
  })

  const APIKey = useSelector((state) => state.APIKey.value)
  //console.log(APIKey)

   const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      errorElement: <ErrorPage />
    },
    {
      path: "/iller",
      element: <CityList/>
    },
    {
      path: "/havadurumu",
      element: <WeatherDetail/>
    },
    {
      path: "/harita",
      element: <Map/>
    }
  ])


  return (
    <RouterProvider router={router}/>
  )
}

export default App;
