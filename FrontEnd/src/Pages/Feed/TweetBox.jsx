import { useState } from "react";
import { Avatar, Button } from "@mui/material";
import axios from "axios";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import useLoggedInUser from "../../hooks/useLoggedInUser.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init.jsx";
import "./Tweet.css";
function TweetBox() {
  const [post, setPost] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [loggedInUser] = useLoggedInUser();
  const [user] = useAuthState(auth);
  const email = user?.email;

  const userProfilePic = loggedInUser[0]?.profileImage
    ? loggedInUser[0]?.profileImage
    : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";

  const handleUploadImage = (e) => {
    setImageURL(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);

    axios
      .post(
        "https://api.imgbb.com/1/upload?key=b2e1b5a49562e43c1fecd683d7f2da4f",
        formData
      )
      .then((res) => {
        setImageURL(res.data.data.display_url);
        // console.log(res.data.data.display_url)
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleTweet = (e) => {
    e.preventDefault();
    if (user.providerData[0].providerId === "password") {
      fetch(`http://localhost:5000/loggedInUser?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log('from useLoggedinuser', data)
          setName(data[0]?.name);
          setUserName(data[0]?.userName);
        });
    } else {
      setName(user?.displayName);
      setUserName(email?.split("@")[0]);
    }
    if (name) {
      const userPost = {
        profilePhoto: userProfilePic,
        post: post,
        photo: imageURL,
        name: name,
        userName: userName,
        email: email,
      };
      setImageURL("");
      setPost("");
      fetch("http://localhost:5000/post", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userPost),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };
  return (
    <div className="tweetBox">
      <form onSubmit={handleTweet}>
        <div className="tweetBox_input">
          <Avatar
            src={
              userProfilePic
            }
          />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setPost(e.target.value)}
            value={post}
            required
          />
        </div>
        <div className="imageIcon_tweetButton">
          <label htmlFor="image" className="imageIcon">
            {isLoading ? (
              <p>Uploading image</p>
            ) : (
              <p>{imageURL ? "image uploaded" : <AddPhotoAlternateIcon />}</p>
            )}
          </label>
          <input
            type="file"
            className="imageInput"
            id="image"
            onChange={handleUploadImage}
          />
          <Button className="tweetBox_tweetButton" type="submit">
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TweetBox;
