import Sidebar from "./Sidebar/Sidebar.jsx"

import { Outlet } from "react-router-dom";
import Widget from "./Widgets/Widgets.jsx"
import auth from '../firebase.init.jsx'
import { signOut } from "firebase/auth"
import {useAuthState} from 'react-firebase-hooks/auth'


function Home() {
  const [user] = useAuthState(auth)

 

  const handleLogout = ()=>{
    signOut(auth);
  }
  return (
  <div className="app">
  <Sidebar handleLogout={handleLogout} user={user}/>
  <Outlet />
  <Widget/>
  </div>
  )
}

export default Home
