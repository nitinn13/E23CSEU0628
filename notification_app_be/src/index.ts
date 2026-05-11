import express from "express";
import { LogFunction } from "../../logging_middleware/index.js";

const app = express();
app.use(express.json());






app.get("/", (req, res) => {
    console.log("got a req at / ");
    LogFunction("backend", "info", "controller", "Testing if logger works");
    res.send("Hello World!");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});