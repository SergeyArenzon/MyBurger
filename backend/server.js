const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();

app.use(cors()); // Cors middlware
app.use(express.json()); // Parsing json

if (process.env.NODE_ENV === "production") {
    //serve up production assets
    app.use(express.static("../build"));
    // let the react app to handle any unknown routes // serve up the index.html if express does'nt recognize the route
    // app.get("*", (req, res) => {
    //     res.sendFile(path.resolve(__dirname, "../", "build", "index.html"));
    // });

    app.get("*", (req, res) => {
        let url = path.join(__dirname, '../build', 'index.html');
        if (!url.startsWith('/app/')) // since we're on local windows
          url = url.substring(1);
        res.sendFile(url);
      });
      
}

const port = process.env.PORT || 5000;


/////////////////////////////////////////////////////////////
////////////////// Mongoose Configurations //////////////////
/////////////////////////////////////////////////////////////

const uri = process.env.ATLAS_URI || "mongodb+srv://typhoonn:sergey91@myburger.rhayo.mongodb.net/myburgerDB?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

const ordersRouter = require("./routes/orders");
app.use("/orders", ordersRouter);

const ingredientsRouter = require("./routes/ingredients");
app.use("/ingredients", ingredientsRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

app.listen(port, () => {
    console.log("Server is running on port: " + port);
});
