import "./MainProfile.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import useLoggedInUser from "../../../hooks/useLoggedInUser.jsx";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import LockResetIcon from "@mui/icons-material/LockReset";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import AddLinkIcon from "@mui/icons-material/AddLink";
import Post from "../../Feed/Post/Post.jsx";
import axios from "axios";
import EditProfile from "../EditProfile/EditProfile.jsx";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Modal from "./Modal.jsx";

const MainProfile = ({ user }) => {
  const navigate = useNavigate();
  const username = user?.email?.split("@")[0];
  const [loggedInUser] = useLoggedInUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState("");
  const [change , setChange] = useState("")
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/userPost?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, [user?.email]);

  const changeIsOpen = (data) => {
    setIsOpen(data);
    setImages(" ");
    setIsLoading(false)
  };
  
 
  const handleUploadCoverImage = (e) => {
    setIsLoading(true);
    setIsOpen(true);
    const image = e.target.files[0];
   
    setChange("coverImage")
    const formData = new FormData();
    formData.set("image", image);

    axios
      .post(
        "https://api.imgbb.com/1/upload?key=b2e1b5a49562e43c1fecd683d7f2da4f",
        formData
      )
      .then((res) => {
        const url = res.data.data.display_url;
        setImages(url);
        setIsLoading(false);
      });
  };
  
  const handleUploadProfileImage = (e) => {
    setIsLoading(true);
    setIsOpen(true);
    const image = e.target.files[0];
    
    setChange("profileImage")
    const formData = new FormData();
    formData.set("image", image);

    axios
      .post(
        "https://api.imgbb.com/1/upload?key=b2e1b5a49562e43c1fecd683d7f2da4f",
        formData
      )
      .then((res) => {
        const url = res.data.data.display_url;
        setImages(url);
        setIsLoading(false);

      });
  };
  
  return (
    <div>
      <ArrowBackIcon
        className="arrow-icon"
        onClick={() => navigate("/home/feed")}
      />
      <h4 className="heading-4">{username}</h4>
      <div className="mainprofile">
        <div className="profile-bio">
          <div>
            <div className="coverImageContainer">
              <img
                src={
                  loggedInUser[0]?.coverImage
                    ? loggedInUser[0]?.coverImage
                    : "https://www.proactivechannel.com/Files/BrandImages/Default.jpg"
                }
                alt=""
                className="coverImage"
              />
              <div className="hoverCoverImage">
                <div className="imageIcon_tweetButton">
                  <label htmlFor="image" className="imageIcon">
                    {isLoading ? (
                      <LockResetIcon className="photoIcon photoIconDisabled " />
                    ) : (
                      <CenterFocusWeakIcon className="photoIcon" />
                    )}
                  </label>
                  <input
                    type="file"
                    id="image"
                    className="imageInput"
                    onChange={handleUploadCoverImage}
                  />
                </div>
              </div>
            </div>

            <div className="avatar-img">
              <div className="avatarContainer">
                <img
                  src={
                    loggedInUser[0]?.profileImage
                      ? loggedInUser[0]?.profileImage
                      : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                  }
                  className="avatar"
                  alt=""
                />
                <div className="hoverAvatarImage">
                  <div className="imageIcon_tweetButton">
                    <label htmlFor="profileImage" className="imageIcon">
                      {isLoading ? (
                        <LockResetIcon className="photoIcon photoIconDisabled " />
                      ) : (
                        <CenterFocusWeakIcon className="photoIcon" />
                      )}
                    </label>
                    <input
                      type="file"
                      id="profileImage"
                      className="imageInput"
                      onChange={handleUploadProfileImage}
                    />
                  </div>
                </div>
              </div>
              <div className="userInfo">
                <div>
                  <h3 className="heading-3">
                    {loggedInUser[0]?.name
                      ? loggedInUser[0].name
                      : user && user.displayName}
                  </h3>
                  <p className="usernameSection">@{username}</p>
                </div>
                <EditProfile user={user} loggedInUser={loggedInUser} />
                {isOpen && <Modal changeIsOpen={changeIsOpen}  url={images} change={change} />}
              </div>
              <div className="infoContainer">
                {loggedInUser[0]?.bio ? <p>{loggedInUser[0].bio}</p> : ""}
                <div className="locationAndLink">
                  {loggedInUser[0]?.location ? (
                    <p className="subInfo">
                      <MyLocationIcon /> {loggedInUser[0].location}
                    </p>
                  ) : (
                    ""
                  )}
                  {loggedInUser[0]?.website ? (
                    <p className="subInfo link">
                      <AddLinkIcon /> {loggedInUser[0].website}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <h4 className="tweetsText">Tweets</h4>
              <hr />
            </div>
            {posts.map((p) => (
              <Post key={p._id} id={p._id} p={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

MainProfile.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    displayName: PropTypes.string,
  }),
};

export default MainProfile;
