"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = 5000;
let lists = [];
app.post("/save", (req, res) => {
    console.log(req.body);
    lists = req.body.lists;
    return res.json({ success: true });
});
app.get("/load", (req, res) => res.json({ lists }));
app.listen(port, () => console.log(`Server running at port: ${port}`));
