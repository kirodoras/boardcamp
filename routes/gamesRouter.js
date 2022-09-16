import express from "express";
import { listGames, insertGame } from "../controllers/gamesController.js";
import {
  validateGame,
  checkGameExists,
} from "../middlewares/gamesMiddleware.js";

const gamesRouter = express.Router();

gamesRouter.get("/games", listGames);
gamesRouter.post("/games", validateGame, checkGameExists, insertGame);

export default gamesRouter;
