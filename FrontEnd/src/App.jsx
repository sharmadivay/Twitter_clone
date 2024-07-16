import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from './Pages/Login/Login'
import Signup from "./Pages/Login/Signup.jsx";
import Home from "./Pages/Home.jsx"
import './App.css'
import ProtectedRoute from "./Pages/ProtectedRoute.jsx";
import PageLoading from "./Pages/PageLoading.jsx";
import Feed from "./Pages/Feed/Feed.jsx";
import Explore from "./Pages/Explore/Explore.jsx";
import Notifications from "./Pages/Notification/Notification.jsx";
import Messages from "./Pages/Messages/Messages.jsx";
import Bookmarks from "./Pages/Bookmarks/Bookmarks.jsx";
import Lists from "./Pages/Lists/Lists.jsx";
import More from "./Pages/More/More.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element :<ProtectedRoute><Home/></ProtectedRoute> 
    },
    {
      path: "/home",
      element: <ProtectedRoute><Home /></ProtectedRoute>,
      children:[
        {
          path : 'feed',
          element :<Feed/>
        },
        {
          path : 'explore',
          element :<Explore/>
        },
        {
          path : 'notifications',
          element :<Notifications/>
        },
        {
          path : 'messages',
          element :<Messages/>
        },
        {
          path : 'bookmarks',
          element :<Bookmarks/>
        },
        {
          path : 'lists',
          element :<Lists/>
        },
        {
          path : 'more',
          element :<More/>
        },
        {
          path : 'profile',
          element :<Profile/>
        },
      ]
    },
    {
      path: "/Login",
      element: <Login />,
    },
   
    {
      path: "/Signup",
      element: <Signup />,
    },
    {
      path: "/pageloading",
      element: <PageLoading />,
    },
    ])

  return (
    <>
     <div>
      
      <RouterProvider router={router} />
      
      </div>
    </>
  )
}

export default App
