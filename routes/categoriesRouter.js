import express from 'express';
import { listCategories } from '../controllers/categoriesController.js';

const categoriesRouter = express.Router();

categoriesRouter.get("/categories", listCategories);

export default categoriesRouter;