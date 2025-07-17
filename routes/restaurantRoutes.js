import express from 'express';
import * as ctrl from '../controllers/restaurantController.js';

const router = express.Router();

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);


export default router;