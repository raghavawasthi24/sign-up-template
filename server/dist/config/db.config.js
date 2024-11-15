"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const DB_URL = process.env.DB_URL || "";
mongoose_1.default
    .connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
    console.log("Databse connected successfully!");
})
    .catch((err) => {
    console.log(err.message);
});
