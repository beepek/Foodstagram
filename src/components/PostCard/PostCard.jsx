import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";//comment as well when we get there
import { Link } from "react-router-dom";
import CommentExampleComment from "../Comment/Comment";
import { deletePost } from "../../utils/postApi";

import * as postAPI from "../../utils/postApi";


function PostCard({ post, isProfile, addComment, removeComment, loggedUser, setPosts }) {
  
  async function deleteClickHandler () {
    deletePost(post._id);
    try{
      const response = await postAPI.getAll()
      console.log(response, "response")
      setPosts([...response.data])
    }catch(err){
      console.log("error")
    }
    
    
  };
  


  console.log(post, "heres the posts");
    return (
        <>
        <Card key={post._id} raised>
          {isProfile ? (
            ""
          ) : (
            <Card.Content textAlign="left">
              <Card.Header>
              <Link to={`/${post?.user?.username}`}>
                  <Image
                    size="large"
                    avatar
                    src={
                      post?.user?.photoUrl
                        ? post?.user?.photoUrl
                        : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                    }
                  />
                  {post?.user?.username}
                </Link>
              </Card.Header>
            </Card.Content>
          )}
    
          <Image src={`${post?.photoUrl}`} wrapped ui={false} />
          <Card.Content>
            <Card.Description>{post.caption}</Card.Description>
            <Icon
                name={"delete"}
                size="large"
                color={"red"}
                onClick={deleteClickHandler}
              />

          </Card.Content>          
        </Card>
        <CommentExampleComment/>
        </>
      );
    }
    
export default PostCard;
    
    

