import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import User from "./router/index.routes.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const PORT = 2000;

const DBconfig=async()=>{
    try {
        await mongoose.connect('mongodb+srv://Jas-13:123@jasper.cclnzjl.mongodb.net/DealsDray?retryWrites=true&w=majority')
        console.log("DB connected");
    } catch (error) {
        console.log("couldn't connect DB",error);
    }
}
DBconfig();
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.use('/api',User);
app.listen(PORT, () => {
    try {
        console.log(`Server is running on port ${PORT}.`);
    } catch (error) {
        console.log(`Server is not running on port ${PORT}.`);
    }
});