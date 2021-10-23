const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogroutes");

const app = express();

// connect to mongodb
const dbURI =
  "mongodb+srv://admin:kYnQZKb75c6Bftst@node-tuts.7ebrx.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

const port = 3000;

// listining for requests
app.listen(port, () => {
  console.log(`App is running on ${port} port`);
});

// register view engine
app.set("view engine", "ejs");

// middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// app.use((req, res, next) => {
//   console.log("New request made");
//   console.log("Hostname :", req.hostname);
//   console.log("Path :", req.path);
//   console.log("Mehtod :", req.method);
//   next();
// });

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// Redirect
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// Blog routes
app.use("/blogs", blogRoutes);

// 404
app.use((req, res) => {
  res.render("404", { title: "404" });
});
