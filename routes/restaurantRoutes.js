import express from 'express';
import * as ctrl from '../controllers/restaurantController.js';

const router = express.Router();

router.get('/', ctrl.getAll);
router.get('/cuisines', ctrl.getAllCuisines);
router.get('/:id', ctrl.getById);
router.get('/:id/cuisines', ctrl.getCuisines);

export default router;