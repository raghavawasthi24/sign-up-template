"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const PORT = process.env.PORT || 5001;
const app = express();
const cors = require("cors");
require("./config/db.config");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// app.use(`/${process.env.VERSION}`, require("./routes/index"));
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello, Welcome To This Page",
    });
});
app.listen(PORT, () => {
    console.log(`Server is live at PORT: ${PORT}`);
});
