import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user";
import productRouter from "./routes/productRoute";
import "dotenv/config"

const app = express();

const port = process.env.PORT


//              Middlewares:

// for parse incoming requests in json format
app.use(express.json());

// for connection through the client 
app.use(cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
}));



//              Routes:
        
// for /user endpoint routes
app.use("/user", userRouter);

//fpr /product endpoint routes
app.use("/product", productRouter);




app.get("/", (req, res) => {
    res.send("Hello!")
})




//      Connecting to DB:
mongoose.connect(process.env.DB_URI)
.then(() => {
    console.log("Connected to Database")
})
.catch(err => {
    console.log("NOT connected to database", err);
})



app.listen(port, () => {
    console.log(`listening the port ${port}`)
})