import React, { useState, useEffect, useCallback } from "react";
import { Grid } from "semantic-ui-react";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostGallery from "../../components/PostGallery/PostGallery";
import PageHeader from "../../components/Header/Header";
import Loading from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import userService from "../../utils/userService";

import { useParams } from "react-router-dom";


export default function ProfilePage({ loggedUser, handleLogout}) {
    const [posts, setPosts] = useState([]);
    const [profileUser, setProfileUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const {username} = useParams();

    const getProfile = useCallback(async () => {
        try {
            console.log(username, "this is the username");
          const response = await userService.getProfile(username);          
          setLoading(false);
          setProfileUser(response.data.user);
          setPosts(response.data.posts);
    
          console.log(response);
        } catch (err) {
          console.log(err.message);
          setError("Profile does not exist"); 
          
        }
      }, [username]);


    useEffect(() => {
        console.log("its firing")
        getProfile();

    }, [username, getProfile]);

    if (error) {
        return(
            <>
                <PageHeader handleLogout={handleLogout} loggedUser={loggedUser}/>
                <ErrorMessage error={error} />
                </>
        );
    }
    if (loading) {
        return (
            <>
            <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
            <Loading />
            </>
        );
    }
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <PageHeader handleLogout={handleLogout} loggedUser={loggedUser}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <ProfileBio user={profileUser} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
                <Grid.Column style={{maxWidth:750}}>
                    <PostGallery
                        posts={posts}
                        numPhotosCol={3}
                        isProfile={true}
                        loading={loading}
                        loggedUser={loggedUser}
                        />                        
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}