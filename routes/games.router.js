import express from "express";
import { listGames, insertGame } from "../controllers/games.controller.js";
import {
  validateGame,
  checkGameExists,
} from "../middlewares/games.middleware.js";

const gamesRouter = express.Router();

gamesRouter.get("/games", listGames);
gamesRouter.post("/games", validateGame, checkGameExists, insertGame);

export default gamesRouter;
