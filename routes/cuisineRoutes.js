import express from 'express';
import * as cuisineController from '../controllers/cuisineController.js'; 

const router = express.Router();

router.get('/:cuisineId/restaurants', cuisineController.getRestaurantsByCuisine);
router.get('/', cuisineController.getAllCuisines);

export default router;