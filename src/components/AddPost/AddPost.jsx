import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

export default function AddPostForm(props) {
    const [state, setState] = useState({
        caption: "",
    });
    const [selectedFile, setSelectedFile] = useState("");

    function handleFileInput(e) {
        setSelectedFile(e.target.files[0]);
    }
    function handleChange(e) {
        setState({
            caption: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("photo", selectedFile);
        formData.append("caption", state.caption);
        props.handleAddPost(formData);
    }


  return (
    <Segment>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          className="form-control"
          name="caption"
          value={state.caption}
          placeholder="Tell us about your recipie!"
          onChange={handleChange}
          required
        />
        <Form.Field>
          <Form.Input
            type="file"
            name="photo"
            placeholder="upload image"
            onChange={handleFileInput}
          />
        </Form.Field>
        <Button type="submit" className="btn">
          Add A Recipie or Meal!
        </Button>
      </Form>
    </Segment>
  );
  }

