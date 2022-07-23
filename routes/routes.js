import express from "express";
import categoriesRouter from "./categories.router.js";
import customersRouter from "./customers.router.js";
import gamesRouter from "./games.router.js";

const router = express.Router();
router.use(categoriesRouter);
router.use(gamesRouter);
router.use(customersRouter);

export default router;