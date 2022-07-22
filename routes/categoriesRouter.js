import express from 'express';
import { listCategories } from '../controllers/categoriesController.js';

const categoriesRouter = express.Router();

categoriesRouter.get("/categories", listCategories);
// categoriesRouter.post("/categories", insertCategory);

export default categoriesRouter;