import React, { useState, useEffect } from "react";
import PageHeader from "../../components/Header/Header";
import AddPost from "../../components/AddPost/AddPost";
import PostGallery from "../../components/PostGallery/PostGallery";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";
import { Grid } from "semantic-ui-react";
import * as postsAPI from "../../utils/postApi";


export default function Feed({loggedUser, handleLogout}) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

async function handleAddPost(post) {
    try {
    
      setLoading(true);
      const response = await postsAPI.create(post);
    
      console.log(response);
      setPosts([response.data, ...posts]); 
      setLoading(false);
    } catch (err) {
      
      console.log(err.message);
      setError("Error creating post, please try again");
    }
  }
  async function getPosts() {
    try {
      const response = await postsAPI.getAll();
      console.log(response, " data");
      setPosts([...response.data]);
      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the getPosts error");
      setLoading(false);
    }
  }

  useEffect(() => {
    //Getting posts, C(R)UD

    getPosts();
  }, []); // This is useEffect runs once when the Feed component
  // loads
  if (error) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        <ErrorMessage error={error} />;
       
      </>
    );
  }
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddPost handleAddPost={handleAddPost} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <PostGallery
            posts={posts}
            numPhotosCol={1}
            isProfile={false}
            loggedUser={loggedUser}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

