import express from 'express';
import * as tenderController from '../controllers/tenders.js';
import { setRolesMiddleware } from '../middlewares/rolesPermision.js';

export const router = express.Router();

router.get(
  '/',
  setRolesMiddleware(['superAdmin', 'admin']),
  tenderController.getAll,
);

router.post(
  '/',
  setRolesMiddleware(['superAdmin', 'admin']),
  tenderController.add,
);

router.get(
  '/:tenderId',
  setRolesMiddleware(['superAdmin', 'admin']),
  tenderController.getById,
);

router.delete(
  '/:tenderId',
  setRolesMiddleware(['superAdmin', 'admin']),
  tenderController.remove,
);

router.put(
  '/:tenderId',
  setRolesMiddleware(['superAdmin', 'admin', 'leader']),
  tenderController.update,
);
