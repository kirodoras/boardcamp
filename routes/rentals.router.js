import express from "express";
import { listRentals } from "../controllers/rentals.controller.js";

const rentalsRouter = express.Router();

rentalsRouter.get("/rentals", listRentals);

export default rentalsRouter;