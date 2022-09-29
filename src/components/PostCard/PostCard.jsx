import React from "react";
import { Card, Image, } from "semantic-ui-react";//comment as well when we get there
import { Link } from "react-router-dom";
import CommentExampleComment from "../Comment/Comment";


function PostCard({ post, isProfile, loggedUser }) {
    return (
        <>
        <Card key={post._id} raised>
          {isProfile ? (
            ""
          ) : (
            <Card.Content textAlign="left">
              <Card.Header>
                <Link to={`/${post.user.username}`}>
                  <Image
                    size="large"
                    avatar
                    src={
                      post.user.photoUrl
                        ? post.user.photoUrl
                        : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                    }
                  />
                  {post.user.username}
                </Link>
              </Card.Header>
            </Card.Content>
          )}
    
          <Image src={`${post?.photoUrl}`} wrapped ui={false} />
          <Card.Content>
            <Card.Description>{post.caption}</Card.Description>
          </Card.Content>          
        </Card>
        <CommentExampleComment/>
        </>
      );
    }
    
export default PostCard;
    
    

