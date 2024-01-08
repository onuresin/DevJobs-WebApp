import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider,} from "react-router-dom";
import JobDetails from './JobDetail.jsx';


//[] ()
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path:"/jobdetail:position",
    element:<JobDetails/>
  }
  ])
ReactDOM.createRoot(document.getElementById('root')).render(

  <RouterProvider router={router} />
)
