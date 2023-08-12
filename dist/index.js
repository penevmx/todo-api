"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
//instantiate express app
const app = (0, express_1.default)();
dotenv_1.default.config();
// console.log(app);
// Define server port
const port = process.env.PORT;
// Create a default route.
app.get('/', (req, res) => {
    res.send('express+ts server');
});
//Start listening to the requests nt the defined port
app.listen(port);
