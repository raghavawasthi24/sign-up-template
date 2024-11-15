import * as dotenv from "dotenv";
dotenv.config();

import * as express from "express";

import { Application, Request, Response } from "express";
const PORT = process.env.PORT || 5001;
const app: Application = express();
import * as cors from "cors";
import "./config/db.config";
import UserModel from "./models/user.model";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// app.use(`/${process.env.VERSION}`, require("./routes/index"));

app.get("/", (req: Request, res: Response) => {
    // const obj = req.body;

    // UserModel.create(obj);

    res.status(200).json({
        message: "Successfully Saved!",
    });
});

app.listen(PORT, () => {
  console.log(`Server is live at PORT: ${PORT}`);
});
