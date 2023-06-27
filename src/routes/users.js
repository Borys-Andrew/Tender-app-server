import express from 'express';
import * as userController from '../controllers/users.js';
import { setRolesMiddleware } from '../middlewares/rolesPermision.js';

export const router = express.Router();

router.get(
  '/',
  setRolesMiddleware(['superAdmin', 'admin', 'leader']),
  userController.getAll,
);

router.get(
  '/leaders',
  setRolesMiddleware(['superAdmin', 'admin', 'leader']),
  userController.getLeaders,
);

router.post(
  '/',
  setRolesMiddleware(['superAdmin', 'admin']),
  userController.add,
);

router.get(
  '/:userId',
  setRolesMiddleware(['superAdmin', 'admin']),
  userController.getById,
);

router.delete(
  '/:userId',
  setRolesMiddleware(['superAdmin', 'admin']),
  userController.remove,
);

router.put(
  '/:userId',
  setRolesMiddleware(['superAdmin', 'admin']),
  userController.update,
);

// const roles = ['superAdmin', 'admin', 'leader', 'manager', 'member'];
