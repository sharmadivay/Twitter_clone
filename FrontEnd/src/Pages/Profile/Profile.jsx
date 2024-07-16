import '../pages.css'
import MainProfile from './MainProfile/MainProfile'
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init.jsx"
function Profile() {
  const [user] = useAuthState(auth)
  return (
    <div className='profilePage'>
        <MainProfile user={user}/>
    </div>
  )
}

export default Profile
