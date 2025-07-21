import express from 'express';
import * as ctrl from '../controllers/restaurantController.js';

const router = express.Router();

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById); // Fetch restaurant by ID and include menu items
router.get('/:id/cuisines', ctrl.getCuisines);


export default router;