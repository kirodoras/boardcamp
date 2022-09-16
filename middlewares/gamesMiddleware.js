import connection from "../databases/postgres.js";
import { gameSchema } from "../schemas/gamesSchema.js";

export async function validateGame(req, res, next) {
  const { error } = gameSchema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  next();
}

export async function checkGameExists(req, res, next) {
  try {
    const { name } = req.body;
    const { rows: game } = await connection.query(
      "SELECT * FROM games WHERE name = $1",
      [name]
    );
    if (game.length) {
      res.status(409).send("Game already exists");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}