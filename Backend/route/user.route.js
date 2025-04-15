import express from "express";
import { signup, login } from "../controller/user.controller.js";
import cors from "cors";
const router = express.Router();
const app = express();
app.use(cors())
app.use(express.json()) 
router.post("/signup", signup);
router.post("/login", login);

export default router;