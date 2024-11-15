"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
}, {
    timestamps: true,
});
const UserModel = mongoose_1.default.model("User", userSchema);
exports.default = UserModel;
