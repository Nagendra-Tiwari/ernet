import express from 'express';
const router = express.Router();
import {
  getSliders,
  getSliderById,
  createSlider,
  updateSlider,
  deleteSlider,
 
} from '../controllers/sliderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getSliders).post(protect, admin, createSlider);

router
  .route('/:id')
  .get(checkObjectId, getSliderById)
  .put(protect, admin, checkObjectId, updateSlider)
  .delete(protect, admin, checkObjectId, deleteSlider);

export default router;
