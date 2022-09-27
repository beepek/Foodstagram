import React from 'react';
import { Card, Image } from 'semantic-ui-react'
import PostCard from '../PostCard/PostCard';

export default function PostGallery({posts, numPhotosCol, isProfile, loggedUser}){
    return (
        <Card.Group itemsPerRow={numPhotosCol} stackable>
            {posts.map((post) => {
              return (
                <PostCard
                post={post}
                key={post._id}
                isProfile={isProfile}
                loggedUser={loggedUser}
              />
              )
            })}
        </Card.Group>
    )
}