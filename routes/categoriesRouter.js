import express from "express";
import {
  listCategories,
  insertCategory,
} from "../controllers/categoriesController.js";
import {
  validateCategory,
  checkCategoryExists,
} from "../middlewares/categoriesMiddleware.js";

const categoriesRouter = express.Router();

categoriesRouter.get("/categories", listCategories);
categoriesRouter.post(
  "/categories",
  validateCategory,
  checkCategoryExists,
  insertCategory
);

export default categoriesRouter;
