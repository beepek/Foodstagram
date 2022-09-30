const Post = require("../models/post")

const S3 = require("aws-sdk/clients/s3")
const s3 = new S3();
const { v4: uuidv4 } = require("uuid");

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
module.exports = {
    create,
    index,
    deletePost
};
async function deletePost(req, res){
  try{
  post.findByIdAndDelete(req.params.id, function () {
    res.status(201).json({})
  })
}catch(err){
  res.staus(400).json({err})
}}
function create(req, res) {
    console.log(req.body, req.file, req.user); // < req.user comes the config/auth middleware that is mounted before our controllers in the server.js
    const key = `collectionbucketbeepek/posts/${uuidv4()}-${req.file.originalname}`;
    const params = { Bucket: BUCKET_NAME, Key: key, Body: req.file.buffer };
  
    s3.upload(params, async function (err, data) {
      console.log("=======================");
      console.log(err, " err from aws");
      console.log("=======================");
      if (err) return res.status(400).json({ err: "Check Terminal error with AWS" });
      try {
        // Using our model to create a document in the posts collection in mongodb
        const post = await Post.create({
          caption: req.body.caption,
          user: req.user,
          photoUrl: data.Location, // < this is from aws
        });
        // respond to the client!
        res.status(201).json({ data: post });
      } catch (err) {
        res.status(400).json({ err });
      }
    });
  }
  
  async function index(req, res) {
    try {
      // this populates the user when you find the posts
      // so you'll have access to the users information
      // when you fetch teh posts
      console.log("in the index functrion", req)
      const posts = await Post.find({}).populate("user").exec();
      console.log(posts)
      res.status(200).json({ data: posts });
    } catch (err) {
      res.status(400).json({ err });
    }
  }
  