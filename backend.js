const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const cors = require("cors");
const _ = require("lodash");
const { title } = require("process");
var webpack = require("webpack");
const { response } = require("express");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

console.log(process.env.MONGO_NAME);
const connection_url = `mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASSWORD}@cluster0.stes5.mongodb.net/blogDB?retryWrites=true&w=majority`;
// connection mongodb
console.log(connection_url);
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);

// intialsing the passport
app.use(passport.initialize());
// telling paspport to use session
app.use(passport.session());

//db for blogs
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  imgsrc: String,
  tags: [],
  content: String,
});

const Blog = mongoose.model("blog", blogSchema);

// db for users
const userSchema = new mongoose.Schema({
  name: String,
  password: String,
});
// plugin into mongoose schema
userSchema.plugin(passportLocalMongoose);
// console.log(process.env.SECRET);

const User = new mongoose.model("User", userSchema);
// passport loca configuration
passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app
  .route("/compose")
  .post(function (req, res) {
    const tags = _.capitalize(req.body.tags.split(" "));
    console.log(req.body.tags);
    const newBlog = new Blog({
      title: req.body.title,
      author: req.body.author,
      imgsrc: req.body.imgsrc,
      tags: tags,
      content: req.body.content,
    });
    newBlog.save();
    console.log(req.body.title);
    console.log(req.body.author);
    Blog.find(function (err, results) {
      console.log(results);
    });
    res.send("true");
  })
  .get(function (req, res) {
    // res.send("the backend server is connected");
  });

app
  .route("/signup")
  .post(function (req, res) {
    // console.log(req.body.username);
    // console.log(req.body.password);

    User.register(
      { username: req.body.username },
      req.body.password,
      function (err, user) {
        if (err) {
          console.log(err);
          return res.send("asfd");
        } else {
          passport.authenticate("local")(req, res, function () {
            return res.send("signup");
          });
        }
      }
    );
  })
  .get(function (req, res) {
    console.log("i am ok");
    res.redirect("/");
  });

// login page
app.post("/login", function (req, res, next) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, function (err) {
    if (err) {
      console.log(err);
      res.json({ err });
    } else {
      console.log(req.body);

      passport.authenticate("local", function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.send("login");
        }
        req.logIn(user, function (err) {
          if (err) {
            return next(err);
          }
          return res.send("loggedin");
        });
      })(req, res, next);
    }
  });
  // Value 'result' is set to false. The user could not be authenticated since the user is not active
});

app.get("/logout", function (req, res) {
  req.logout();
  res.send("home");
});

// blog page
app.get("/blogs/:title", (req, res) => {
  const blogTitle = req.params.title;
  console.log(req.params);
  console.log(encodeURI(blogTitle));
  Blog.find({ title: blogTitle }, (err, foundList) => {
    console.log(blogTitle);
    if (!err) {
      if (foundList.length > 0) {
        res.send(foundList);
      } else {
        console.log("no tagblogs found!!!");
        res.send("notfound");
      }
    } else console.log(err);
  });
});

app.get("/tags/:tagName", (req, res) => {
  const tag = _.capitalize(req.params.tagName);
  Blog.find({ tags: tag }, (err, foundList) => {
    if (!err) {
      if (foundList.length > 0) {
        res.send(foundList);
      } else {
        console.log("no tagblogs found!!!");
      }
    } else console.log(err);
  });
});

// main-page
app.route("/home").get(function (req, res) {
  Blog.find(function (err, results) {
    res.send(results);
    // console.log(results);
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port, function () {
  console.log("Server started successfully");
});
