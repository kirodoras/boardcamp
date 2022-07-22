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
