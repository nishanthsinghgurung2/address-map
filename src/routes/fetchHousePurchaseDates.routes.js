import { Router } from 'express';
import { findAll } from '../controller/fetchHousePurchaseDates.controller';

const router = Router();

router.get('/', findAll);

export default router;
