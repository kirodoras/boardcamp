import express from "express";
import {
  listRentals,
  insertRental,
} from "../controllers/rentals.controller.js";

import { validateRental } from "../middlewares/rental.middleware.js";

const rentalsRouter = express.Router();

rentalsRouter.get("/rentals", listRentals);
rentalsRouter.post("/rentals", validateRental, insertRental);
export default rentalsRouter;
