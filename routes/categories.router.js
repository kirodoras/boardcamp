import express from "express";
import {
  listCategories,
  insertCategory,
} from "../controllers/categories.controller.js";
import {
  validateCategory,
  checkCategoryExists,
} from "../middlewares/categories.middleware.js";

const categoriesRouter = express.Router();

categoriesRouter.get("/categories", listCategories);
categoriesRouter.post(
  "/categories",
  validateCategory,
  checkCategoryExists,
  insertCategory
);

export default categoriesRouter;
