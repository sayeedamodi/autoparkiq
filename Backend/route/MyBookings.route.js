// MyBookings.route.js
import express from "express";
import { getBookingsByEmail } from "../controller/MyBookings.controller.js";

const router = express.Router();

router.get("/mybookings/:email", getBookingsByEmail);

export default router;
