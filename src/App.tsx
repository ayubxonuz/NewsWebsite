import {RouterProvider, createBrowserRouter} from "react-router-dom"
import RootLayout from "./layout/RootLayout"
import Home from "./components/Home"
import Detail from "./pages/Detail"
import Create from "./pages/Create"
import Edit from "./pages/Edit"

function App() {
  const routest = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/detail/:id",
          element: <Detail />,
        },
        {
          path: "/create",
          element: <Create />,
        },
        {
          path: "/edit",
          element: <Edit />,
        },
      ],
    },
  ])

  return <RouterProvider router={routest} />
}

export default App
