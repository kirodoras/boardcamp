import connection from "../databases/postgres.js";
import { categorySchema } from "../schemas/categories.schema.js";

export async function validateCategory(req, res, next) {
  const { error } = categorySchema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  next();
}

export async function checkCategoryExists(req, res, next) {
  try {
    const { name } = req.body;
    const { rows: category } = await connection.query(
      "SELECT * FROM categories WHERE name = $1",
      [name]
    );
    if (category.length) {
      res.status(409).send("Category already exists");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}
