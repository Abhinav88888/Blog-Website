const express=require("express");
const bodyparser=require("body-parser");
const ejs=require("ejs");
const lodash=require("lodash");
const mongoose =require("mongoose");

// var posts=[];
let posts=[];
var url;
var match;
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');


mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/blogDB",function(){
  console.log("connected");
});
const postSchema= new mongoose.Schema({
  title:String,
  content:String
});
const Post=mongoose.model("post",postSchema);


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
app.post('/compose',function(req,res){
  const post=new Post({
    title:req.body.posttitle,
    content:req.body.postbody
  });

  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });




// const post ={
//   title:req.body.posttitle,
//   content:req.body.postbody
// };
// posts.push(post);

});

app.get('/about',function(req,res){
  res.render('about',{
    aboutcontent:aboutContent
  });
});
app.get('/contact',function(req,res){
  res.render('contact',{
    contactcontent:contactContent
  });
});

app.get('/compose',function(req,res){

  res.render('compose');
});

app.get('/',function(req,res){
  Post.find({},function(err,posts){
    res.render("home",{
      startingContent:homeStartingContent,
      posts:posts
    });
  });
// 
// res.render('home',{
// startingContent:homeStartingContent,
// posts: posts,
// match:match,
// url:url
// });

});

app.get('/posts/:postId',function(req,res){
// postname
//instead of postId we used postname
const requestedPostId=req.params.postId;
Post.findOne({_id:requestedPostId},function(err,post){

    res.render("post",{
      title:post.title,
      content:post.content
    });

});
//   for(var i=0;i<posts.length;i++){
//   if( lodash.camelCase(posts[i].title)===lodash.camelCase(req.params.postname)) {
//     console.log("match found");
//     url=lodash.camelCase(req.params.postname);
//
//     res.render('post',{
//       title:posts[i].title,
//       content:posts[i].content
//
//     });
//   }
// }

});






app.listen(3000,function(){
  console.log("you are on port 3000");
});
