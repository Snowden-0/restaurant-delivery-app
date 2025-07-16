import express from 'express';
import * as ctrl from '../controllers/restaurantController.js';

const router = express.Router();

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.get('/:id/menu', ctrl.getMenu);


export default router;