import express from 'express';
import { listGames } from '../controllers/games.controller.js';

const gamesRouter = express.Router();

gamesRouter.get("/games", listGames);

export default gamesRouter;