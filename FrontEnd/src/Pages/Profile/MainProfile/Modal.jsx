import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import PropTypes from "prop-types";
import "./Modal.css"; // Ensure you have the styles for the modal
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init.jsx";
import { useState } from "react";

const Modal = ({ changeIsOpen, url, change }) => {
  const [user] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(true);

  const handleUploadImage = () => {
    const userCoverImage = {
      email: user?.email,
      [change]: url,
    };

    if (url) {
      fetch(`http://localhost:5000/userUpdates/${user?.email}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userCoverImage),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("done", data);
        });
    }
    setIsOpen(false);
    changeIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    changeIsOpen(false);
  };
  // console.log(images)

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <div>
          {url ? (
            <div>
              <img src={url} alt="" style={{ maxHeight: "250px" }} />
            </div>
          ) : (
            <h2>Image Loading....</h2>
          )}
        </div>
        <div>
          <button onClick={handleUploadImage} style={{ padding: "10px" }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  changeIsOpen: PropTypes.func.isRequired,
  change: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Modal;
