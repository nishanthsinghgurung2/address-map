import { Router } from 'express';
import { findHousePurchaseDatesController } from '../controller/fetchHousePurchaseDates.controller';

const router = Router();

router.get('/', findHousePurchaseDatesController);

export default router;
