import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useEffect, useState } from "react";

function useLoggedInUser() {
  const [user] = useAuthState(auth);
  const email = user?.email;
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/loggedInUser?email=${email}`)
        .then(res => res.json())
        .then(data => {
            // console.log('from useLoggedinuser', data)
            setLoggedInUser(data)
        })
}, [email, loggedInUser])

return [loggedInUser, setLoggedInUser] ;

}

export default useLoggedInUser
