import React, { useState } from "react";
import PageHeader from "../../components/Header/Header";
import AddPost from "../../componenets/AddPost/AddPost";
import PostGallery from "../../components/PostGaller/PostGallery";

import { Grid } from "semantic-ui-react";

import * as postsAPI from '../../utils/postApi';


export default function Feed() {
    const [posts, setPosts] = useState([]);
    async function handleAddPost(post){
        try {
            const response = await postsAPI.create(post);
            console.log(response)
        } catch(err){
            console.log(err.message)
        }        
    }

    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                    <PageHeader />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <AddPost handleAddPost={handleAddPost}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450}}>
                    <PostGallery />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}