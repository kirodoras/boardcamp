import connection from "../databases/postgres.js";

export async function listCategories(req, res) {
  try {
    const { rows: categories } = await connection.query(
      "SELECT * FROM categories"
    );
    res.send(categories);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}

export async function insertCategory(req, res) { 
    try {
      const { name } = req.body;
      await connection.query(
        "INSERT INTO categories (name) VALUES ($1)",
        [name]
      );
      res.sendStatus(201);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
      return;
    }
}