import React, { useState } from "react";
import { FormControl, FilledInput, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import { ic_file } from "../../assets";
import ImageMessage from "./ImageMessage";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20
  }
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [images,setImages] = useState([]);
  const { postMessage, otherUser, conversationId, user } = props;

  const handleImage = async (event) => {
    const formData = new FormData();
    for (const file of event.target.files) {
      formData.append("file", file);
      formData.append("upload_preset", "rvsntehp");
      fetch("https://api.cloudinary.com/v1_1/db7wfnuge/image/upload", {
        method: "POST",
        body: formData
      })
        .then((response) => {
          response.json().then((data)=>setImages( prevState=>[...prevState, data.url] ))
        })
    }
  }

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: images
    };
    await postMessage(reqBody);
    setText("");
    setImages([]);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
          startAdornment={
            images.map((image)=><ImageMessage attachment={image} />)
          }
          endAdornment={
            <>
              <label htmlFor="image_upload">
                <Button component="span"> 
                  <img src={ic_file} alt="" />
                </Button>
              </label>
              <input 
                hidden
                multiple
                type="file"
                id="image_upload" 
                name="image_upload"
                accept="image/*"
                onChange={handleImage}
              />
            </>
          }
        />
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
